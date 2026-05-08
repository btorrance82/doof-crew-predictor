// netlify/functions/football.js
// Replace YOUR_API_KEY with your football-data.org API token
const API_KEY = '75402709cdb640ff9c7a5b8604a9e9d9';
const API_HOST = 'api.football-data.org';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { endpoint } = JSON.parse(event.body);
    const url = `https://${API_HOST}${endpoint}`;
    
    const response = await fetch(url, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
