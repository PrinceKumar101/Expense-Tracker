import app from "./app";

const port = process.env.port || 3000;
Bun.serve({
  port: port,
  fetch:app.fetch
});

