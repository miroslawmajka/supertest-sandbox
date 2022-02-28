const server = require('./src/server');

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(
    `GraphQL Playgroun running at http://localhost:${PORT}/playground`
  );
});
