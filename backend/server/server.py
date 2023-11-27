from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()
CORS(app)


# API credentials
pet_finder_api_key = os.getenv('PET_FINDER_API_KEY')
pet_finder_api_secret = os.getenv('PET_FINDER_API_SECRET')
access_token = ''

print(pet_finder_api_key)
@app.route('/api/petfinder', methods=['GET'])
def fetch_petfinder_data():
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

        # Use the new access_token in your API requests
        api_url = ' '
        query_parameters = request.query_string.decode('utf-8')
        api_response = requests.get(f'{api_url}?{query_parameters}', headers={'Authorization': f'Bearer {access_token}'})

        if api_response.status_code == 200:
            return api_response.text, 200
        else:
            return jsonify({'error': 'An error occurred while fetching data'}), 500

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': 'An error occurred while fetching data'}), 500

if __name__ == '__main__':
    app.run(port=3002)