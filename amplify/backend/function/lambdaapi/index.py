import requests
import os

def lambda_handler(event, context):
    petfinder_api_url = 'https://api.petfinder.com/v2/animals'
    petfinder_api_key = os.environ.get('PET_FINDER_API_KEY')
    petfinder_api_secret = os.environ.get('PET_FINDER_API_SECRET')

    # Obtain access token
    access_token = get_petfinder_access_token(petfinder_api_key, petfinder_api_secret)

    headers = {
        'Authorization': f'Bearer {access_token}',
    }

    # Make request to Petfinder API
    response = requests.get(petfinder_api_url, headers=headers)

    if response.status_code == 200:
        return {
            'statusCode': 200,
            'body': response.json()
        }
    else:
        return {
            'statusCode': response.status_code,
            'body': {'error': 'An error occurred while fetching data from Petfinder API'}
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
