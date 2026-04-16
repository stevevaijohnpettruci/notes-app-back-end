import server from './server/index.js';

const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
