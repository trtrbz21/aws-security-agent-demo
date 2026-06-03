import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.get("/", (_req, res) => {
  res.send("Hello Security Agent");
});

app.get("/health", (_req, res) => {
  res.send("OK");
});

const server = app.listen(port, () => {
  console.log(`started on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
