// netlify/functions/football.js
// This backend function handles API calls securely
// Your API key stays hidden here, never exposed to the browser

const API_KEY = 'd3a081d743msh1f779a585fda40dp136988jen123de8cb35bf';
const API_HOST = 'api-football-v1.p.rapidapi.com';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { endpoint, params } = JSON.parse(event.body);
    
    const url = `https://${API_HOST}${endpoint}${params}`;
    
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    });
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
