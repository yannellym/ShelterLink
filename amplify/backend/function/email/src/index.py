import json
import boto3

def lambda_handler(event, context):
    try:
        # Extract email data from the request body
        email_data = json.loads(event['body'])
        to = email_data.get('to')
        subject = email_data.get('subject')
        text = email_data.get('text')

        # Create SES client
        ses = boto3.client('ses')

        # Create the email parameters
        params = {
            'Destination': {
                'ToAddresses': [to],
            },
            'Message': {
                'Body': {
                    'Text': {
                        'Data': text,
                    },
                },
                'Subject': {
                    'Data': subject,
                },
            },
            'Source': 'your-sender-email@example.com',  # Replace with your SES verified email address
        }

        # Send the email
        ses.send_email(**params)

        # Your existing response logic...
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            },
            'body': json.dumps({'message': 'Email sent successfully'}),
        }
    except Exception as e:
        print('Error handling request:', e)
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            },
            'body': json.dumps({'error': 'Internal Server Error'}),
        }
