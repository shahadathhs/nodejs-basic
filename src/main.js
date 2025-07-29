import http from 'http';

function main() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Node.js Basic!  This is root endpoint.\n');
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`);
  });
}

main();
