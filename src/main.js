import http from 'http';
import { runEvents } from '#events/run-events.js';

function main() {
  const server = http.createServer((req, res) => {
    if (req.url === '/run-app' && req.method === 'GET') {
      runEvents(); // Run the app.js event logic
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Event logic from app.js executed!\n');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Welcome to Node.js Basic! This is the root endpoint.\n');
    }
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`);
  });
}

main();
