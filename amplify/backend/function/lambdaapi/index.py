import requests
import os
import json
from datetime import datetime, timedelta

def lambda_handler(event, context):
    try:
        # Extract parameters from the query string
        params = event.get('queryStringParameters', {})

        # Define the base Petfinder API URL
        petfinder_api_url = 'https://api.petfinder.com/v2/animals'

        # Check if 'location' parameter is present and construct the URL accordingly
        if 'location' in params:
            # For 'location', use the latitude and longitude values separately
            latitude, longitude = params['location'].split(',')
            petfinder_api_url += f'?location={latitude},{longitude}'
        else:
            petfinder_api_url += '?'  # If 'location' is not provided, add a question mark to start the query string

        # Add all other parameters to the API URL using the 'params' parameter of requests.get
        params.pop('location', None)  # Remove 'location' from the params dictionary
        headers = {
            'Authorization': f'Bearer {get_petfinder_access_token()}',
            'x-api-key': os.environ['PETFINDER_API_KEY'],
        }

        # Make request to Petfinder API
        response = requests.get(petfinder_api_url, headers=headers, params=params)

        if response.status_code == 200:
            # Parse the Petfinder API response
            petfinder_data = response.json()
            
            # Check if 'animals' key is present in the API response
            animals = petfinder_data.get('animals')
            
            if animals is not None:
                # 'animals' key is present, proceed with constructing the response
                return {
                    'statusCode': 200,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-Type': 'application/json',
                    },
                    'body': json.dumps({"animals": animals}),
                }
            else:
                # 'animals' key is not present in the API response
                return {
                    'statusCode': 500,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-Type': 'application/json',
                    },
                    'body': json.dumps({'error': 'Petfinder API response does not contain the "animals" key'}),
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
        print('Response:', err.response.text)  # Add this line for detailed error response
        return None




# make sure you're in the virtual env
# amplify shell 
# zip -r lambda_function.zip .    (zips all files)
