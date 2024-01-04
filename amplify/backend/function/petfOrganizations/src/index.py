# Import the necessary libraries
import json
import requests
from datetime import datetime, timedelta
import os

def lambda_handler(event, context):
    try:
        # Extract parameters from the query string
        params = event.get('queryStringParameters', {})

        # Define the base Petfinder API URL for organizations
        petfinder_api_url = 'https://api.petfinder.com/v2/organizations'

        # Check if 'location' parameter is present and construct the URL accordingly
        if 'location' in params:
            location = params['location']
            
            # Check if the location is a ZIP code
            if location.isdigit() and len(location) == 5:
                # Convert ZIP code to latitude and longitude using a geocoding service
                coordinates = get_coordinates_from_zipcode(location)
                if coordinates:
                    petfinder_api_url += f'?location={coordinates["latitude"]},{coordinates["longitude"]}'
                else:
                    return {
                        'statusCode': 500,
                        'headers': {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': 'true',
                            'Content-Type': 'application/json',
                        },
                        'body': json.dumps({'error': 'Failed to convert ZIP code to coordinates'}),
                    }
            else:
                # Use the provided location directly
                petfinder_api_url += f'?location={location}'
        else:
            petfinder_api_url += '?'  # If 'location' is not provided, add a question mark to start the query string

        # Add all other parameters to the API URL using the 'params' parameter of requests.get
        params.pop('location', None)  # Remove 'location' from the params dictionary
        headers = {
            'Authorization': f'Bearer {get_petfinder_access_token()}',
            'x-api-key': os.environ['PETFINDER_API_KEY'],
        }

        # Make request to Petfinder API for organizations
        response = requests.get(petfinder_api_url, headers=headers, params=params)

        if response.status_code == 200:
            # Parse the Petfinder API response
            petfinder_data = response.json()
            
            # Check if 'organizations' key is present in the API response
            organizations = petfinder_data.get('organizations')
            pagination = petfinder_data.get('pagination')
            
            if organizations is not None:
                # 'organizations' key is present, proceed with constructing the response
                response_data = {"organizations": organizations, "pagination": pagination}
                return {
                    'statusCode': 200,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-Type': 'application/json',
                    },
                    'body': json.dumps(response_data),
                }
            else:
                # 'organizations' key is not present in the API response
                return {
                    'statusCode': 500,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-Type': 'application/json',
                    },
                    'body': json.dumps({'error': 'Petfinder API response does not contain the "organizations" key'}),
                }
        else:
            return {
                'statusCode': response.status_code,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json',
                },
                'body': json.dumps({'error': f'An error occurred while fetching data from Petfinder API: {response.text}'}),
            }
    except Exception as e:
        error_message = f'Internal Server Error: {str(e)} - {repr(e)}'
        print(error_message)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            },
            'body': json.dumps({'error': error_message}),
        }


def get_petfinder_access_token():
    petfinder_api_key = os.environ['PETFINDER_API_KEY']
    petfinder_api_secret = os.environ['PETFINDER_API_SECRET']
    token_url = 'https://api.petfinder.com/v2/oauth2/token'

    # Check if a token is already present and not expired
    current_token = os.environ.get('PETFINDER_ACCESS_TOKEN')
    expiration_time_str = os.environ.get('PETFINDER_TOKEN_EXPIRATION_TIME')

    if current_token and expiration_time_str:
        expiration_time = datetime.fromisoformat(expiration_time_str)
        current_time = datetime.utcnow()

        # Check if the token is about to expire (e.g., within the next minute)
        if expiration_time - current_time > timedelta(minutes=1):
            return current_token

    # Request a new token
    token_data = {
        'grant_type': 'client_credentials',
        'client_id': petfinder_api_key,
        'client_secret': petfinder_api_secret
    }

    try:
        token_response = requests.post(token_url, data=token_data)
        token_response.raise_for_status()

        token_json = token_response.json()
        access_token = token_json.get('access_token')
        expires_in = token_json.get('expires_in')

        # Save the new token and its expiration time to environment variables
        os.environ['PETFINDER_ACCESS_TOKEN'] = access_token
        os.environ['PETFINDER_TOKEN_EXPIRATION_TIME'] = (datetime.utcnow() + timedelta(seconds=expires_in)).isoformat()

        return access_token
    except requests.exceptions.RequestException as err:
        print('Error obtaining Petfinder access token:', err)
        print('Response:', err.response.text)  
        return None

def get_coordinates_from_zipcode(zipcode):
    try:
        zip_key = os.environ.get('MAPS_ZIP_KEY')
        # Use a geocoding service to convert ZIP code to coordinates
        geocoding_endpoint = f'https://maps.googleapis.com/maps/api/geocode/json?address={zipcode}&key={zip_key}'
        geocoding_response = requests.get(geocoding_endpoint)

        if geocoding_response.status_code == 200:
            geocoding_data = geocoding_response.json()
            location = geocoding_data.get('results', [])[0].get('geometry', {}).get('location', {})
            return {'latitude': location.get('lat'), 'longitude': location.get('lng')}
        else:
            print('Geocoding request failed:', geocoding_response.text)
            return None
    except Exception as e:
        print('Error during geocoding:', str(e))
        return None


# make sure you're in the virtual env
# amplify shell 
# zip -r lambda_function.zip .    (zips all files)
