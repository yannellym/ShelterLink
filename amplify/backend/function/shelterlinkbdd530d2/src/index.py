import requests

def handler(event, context):
    # Define the URL of your Flask app
    flask_app_url = 'http://127.0.0.1:3002'  

    # Extract relevant request data from the event
    http_method = event['httpMethod']
    path = event['path']
    body = event.get('body', None)
    headers = event.get('headers', {})

    # Define options for the request to your Flask app
    options = {
        'method': http_method,
        'url': f'{flask_app_url}{path}',
        'headers': headers,
        'data': body
    }

    try:
        # Forward the request to your Flask app
        response = requests.request(**options)

        # Create a response for the Lambda function
        lambda_response = {
            'statusCode': response.status_code,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': response.text
        }

        return lambda_response

    except Exception as e:
        # Handle errors and create a response
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'error': 'An error occurred while processing the request'})
        }
