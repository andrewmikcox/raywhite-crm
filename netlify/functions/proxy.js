exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const PA_URL = 'https://defaultf52250b4f2fd4e40a014903b16965a.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/3f6e28df745c4f27a9110a9527b51e44/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UZ3gL87rROsY2fYDVej5QjpV98Gb-0Th0ieA7ns66Rs';

  try {
    const response = await fetch(PA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.body
    });

    const text = await response.text();
    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json' },
      body: text || '{}'
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
