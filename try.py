import requests
import json
from datetime import datetime, timedelta

# Make a request to the NOAA National Weather Server API
url = "api_url"
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the JSON response
    weather_data = json.loads(response.text)
    # Extract information from the "properties" dictionary
    properties = weather_data.get("properties", {})
    periods = properties.get("periods", [])
    # Initialize an empty string to store the result
    result_string = ""
    # Extract information from the first and second closest forecasts
    for i in range(min(2, len(periods))):
        period = periods[i]
        time_period_name = period.get("name", "")
        temperature = period.get("temperature", "")
        # Use the "startTime" property for date information
        start_time_str = period.get("startTime", "")
        # Parse the startTime string to a datetime object
        start_time = datetime.fromisoformat(start_time_str[:-6])
        # Format the datetime object as (MM/DD/YYYY)
        formatted_date = start_time.strftime("(%m/%d/%Y)")
        # Append the information to the result string
        result_string += f"{time_period_name} ({formatted_date}) the expected temperature is {temperature}F and "

    # Remove the trailing " and " from the result string
    result_string = result_string.rstrip(" and ")

    # Print string 
    print(result_string)

else:
    # Print an error message if the request was not successful
    print(f"Error: {response.status_code}")
