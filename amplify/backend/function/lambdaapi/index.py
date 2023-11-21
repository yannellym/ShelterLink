import requests
import os
import json

def lambda_handler(event, context):
    petfinder_api_url = 'https://api.petfinder.com/v2/animals'
    petfinder_api_key = 'Cnw2cz4Mx9Vcs8GNUcXmnX0Q4nl1Q5Q8BEVjVukFoFHojNAloy'
    petfinder_api_secret = '27HpoImtvPi1iPEDSgAlANwrSHdVYnX3BEWbTuxy'

    # Obtain access token
    access_token = get_petfinder_access_token(petfinder_api_key, petfinder_api_secret)

    headers = {
        'Authorization': f'Bearer {access_token}',
    }

    # Make request to Petfinder API
    response = requests.get(petfinder_api_url, headers=headers)
    print('Response Text:', response.text)

    if response.status_code == 200:
        # Parse the Petfinder API response
        petfinder_data = response.json()
        animals = petfinder_data.get('animals', [])

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            },
            'body': json.dumps({ "animals": animals }),
        }
    else:
        return {
            'statusCode': response.status_code,
            'headers': {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            },
            'body': json.dumps({'error': f'An error occurred while fetching data from Petfinder API: {response.text}'}),
        }

def get_petfinder_access_token(api_key, api_secret):
    token_url = 'https://api.petfinder.com/v2/oauth2/token'

    token_data = {
        'grant_type': 'client_credentials',
        'client_id': api_key,
        'client_secret': api_secret
    }

    try:
        token_response = requests.post(token_url, data=token_data)
        token_json = token_response.json()
        access_token = token_json.get('access_token')

        return access_token
    except Exception as e:
        print('Error obtaining Petfinder access token:', str(e))





# make sure you're in the virtual env
# amplify shell 
# zip -r lambda_function.zip .    (zips all files)
