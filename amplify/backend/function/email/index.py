import json
import boto3

def process_user_email(user_email, shelter_email, subject, text):
    # Simulate processing the user's email
    print(f"Processing user's email:\nSubject: {subject}\nText: {text}\nFrom:{user_email}\nTo: {shelter_email}")

def lambda_handler(event, context):
    try:
        # Extract email data from the request body
        email_data = json.loads(event['body'])
        user_email = email_data.get('from')
        shelter_email = 'mercadoyannelly@gmail.com'
        subject = email_data.get('subject', 'pet inquiry') 
        text = email_data.get('text', 'No Text')  # Provide default text if not present

        # Process the user's email
        process_user_email(user_email, shelter_email, subject, text)

        # Send email to the shelter using Amazon SES
        ses = boto3.client('ses', region_name='us-east-1') 
        params = {
            'Destination': {
                'ToAddresses': [shelter_email],
            },
            'Message': {
                'Body': {
                    'Text': {
                        'Data': text,
                    },
                },
                'Subject': {
                    'Data': str(subject),
                },
            },
            'Source': user_email,  # Use the user's email as the sender
        }

        ses.send_email(**params)

        # Your existing response logic...
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            },
            'body': json.dumps({'message': 'Emails sent successfully'}),
        }
    except Exception as e:
        print('Error handling request:', e)

        # Include error details in the response
        error_message = f'Internal Server Error: {str(e)}'
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            },
            'body': json.dumps({'error': error_message}),
        }