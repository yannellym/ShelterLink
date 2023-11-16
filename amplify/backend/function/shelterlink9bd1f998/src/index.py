import json
import requests
import os

pet_finder_api_key = os.getenv('PET_FINDER_API_KEY')
pet_finder_api_secret = os.getenv('PET_FINDER_API_SECRET')
access_token = ''

def fetch_petfinder_data(event, context):
    global access_token

    # Request a new access token
    token_url = 'https://api.petfinder.com/v2/oauth2/token'
    token_data = {
        'grant_type': 'client_credentials',
        'client_id': pet_finder_api_key,
        'client_secret': pet_finder_api_secret
    }

    try:
        token_response = requests.post(token_url, data=token_data)
        token_json = token_response.json()
        access_token = token_json.get('access_token')

        # Use the new access_token in API requests
        api_url = 'https://api.petfinder.com/v2/animals'
        query_parameters = event['queryStringParameters']
        api_response = requests.get(f'{api_url}?{query_parameters}', headers={'Authorization': f'Bearer {access_token}'})

        if api_response.status_code == 200:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(api_response.json())
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'error': 'An error occurred while fetching data'})
            }

    except Exception as e:
        print('Error:', str(e))
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'error': 'An error occurred while fetching data'})
        }
