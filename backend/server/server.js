import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

app.use(cors());

// API credentials and endpoint
const apiKey = 'Cnw2cz4Mx9Vcs8GNUcXmnX0Q4nl1Q5Q8BEVjVukFoFHojNAloy';
const apiSecret = 'TnFYeXeE51lVoXGjJX9buU3BOFgeb8TPoLGNohKX';
const petfinderEndpoint = 'https://api.petfinder.com/v2/animals';
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDbncyY3o0TXg5VmNzOEdOVWNYbW5YMFE0bmwxUTVROEJFVmpWdWtGb0ZIb2pOQWxveSIsImp0aSI6Ijc3ZTc4ZjRkYzhkZjY1NmE2ZjJjZjcwYjk2MmYyOTRhYzBiM2Y0N2RiYTdlNTkyMGQ2YzNhNTgxZDEyOGI2ZWE5NjhjMDk3YWQwYTRhNDRhIiwiaWF0IjoxNjk0MTkyMTUyLCJuYmYiOjE2OTQxOTIxNTIsImV4cCI6MTY5NDE5NTc1Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.FLviCjRyxnxj3ZukThYnXzurNv1l0C5OUqwtzhJF3lSkwPWYHLLw-ccvSjf2cYD1sPS-xF0dRBfrYflzLLAveZoINvG0Z5bYV_DOrmIAjLDTeRj_20y5IZw_YcwqLp7BGi0ImXqbAvINZ0kWTGZnXi-HlaHxMDV9z6eujRFv3u-7JaSoDgAzi_uqOBzyLBp34Qrg8s9DUmqd-rvuyeTtEtVrfPTg99K-JmzM2_n4J3YCFeJ6-Lc-yoVuD6etamCeunP3i3VwfBjjL1pxisuNSsJix6MWGBamQPvBEY5Eijin_FeAMscp5LihXu74N_cy4i2ufa2E5drWIIBDZDDTWQ';

app.get('/api/petfinder', async (req, res) => {
  const queryParams = new URLSearchParams(req.query);

  try {
    const response = await fetch(`${petfinderEndpoint}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
