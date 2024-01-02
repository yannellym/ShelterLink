import requests
import os
import json

from datetime import datetime, timedelta

def lambda_handler(event, context):
    petfinder_api_url = 'https://api.petfinder.com/v2/animals'
    petfinder_api_key = os.environ.get('PET_FINDER_API_KEY')
    petfinder_api_secret = os.environ.get('PET_FINDER_API_SECRET')

    # Obtain access token
    access_token, expiration_time = get_petfinder_access_token(petfinder_api_key, petfinder_api_secret)

    # Check if the token is expired
    if datetime.utcnow() > expiration_time:
        # Refresh the token
        access_token, expiration_time = get_petfinder_access_token(petfinder_api_key, petfinder_api_secret)

    headers = {
        'Authorization': f'Bearer {access_token}',
    }

    # Make request to Petfinder API
    response = requests.get(petfinder_api_url, headers=headers)
    print('Response Text:', response.text)

    if response.status_code == 200:
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            },
            'body': json.dumps({"animals": []}),
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
        expires_in = token_json.get('expires_in')

        # Calculate expiration time
        expiration_time = datetime.utcnow() + timedelta(seconds=expires_in)

        # Print or log expiration time
        print('Token Expiration Time:', expiration_time)

        return access_token, expiration_time
    except Exception as e:
        print('Error obtaining Petfinder access token:', str(e))


# make sure you're in the virtual env
# amplify shell 
# zip -r lambda_function.zip .    (zips all files)
