const https = require('https');
const url = require('url');

const PA_URL = 'https://defaultf52250b4f2fd4e40a014903b16965a.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/3f6e28df745c4f27a9110a9527b51e44/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UZ3gL87rROsY2fYDVej5QjpV98Gb-0Th0ieA7ns66Rs';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const parsed = url.parse(PA_URL);
  const body = event.body || '{}';

  return new Promise((resolve) => {
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: { 'Content-Type': 'application/json' },
          body: data || '{}'
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      });
    });

    req.write(body);
    req.end();
  });
};
