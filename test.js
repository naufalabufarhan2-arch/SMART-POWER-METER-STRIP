// We just need to hit the REST API directly to see if it's public.

// We just need to hit the REST API directly to see if it's public.
const https = require('https');

// The typical database URLs:
const urls = [
  'https://smart-power-meter-f72c9-default-rtdb.firebaseio.com/.json',
  'https://smart-power-meter-f72c9-default-rtdb.asia-southeast1.firebasedatabase.app/.json'
];

urls.forEach(url => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log(`URL: ${url}`);
      console.log(`Status: ${res.statusCode}`);
      console.log(`Data: ${data.substring(0, 200)}...`);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});
