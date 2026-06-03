import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.get("/", (_req, res) => {
  res.send("Hello Security Agent");
});

app.get("/health", (_req, res) => {
  res.send("OK");
});

app.get("/debug", (_req, res) => {
  res.json({
    service: "aws-security-agent-demo",
    environment: process.env.NODE_ENV ?? "development",
    internalApiUrl: "http://internal-api.local",
    featureFlags: {
      adminTools: true,
      verboseErrors: true,
    },
  });
});

app.get("/admin", (_req, res) => {
  res.json({
    message: "Admin dashboard",
    users: [
      { id: 1, name: "demo-admin", role: "admin" },
      { id: 2, name: "demo-user", role: "user" },
    ],
  });
});

app.get("/search", (req, res) => {
  const query = String(req.query.q ?? "");

  res.type("html").send(`
    <!doctype html>
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <title>Search</title>
      </head>
      <body>
        <h1>Search results</h1>
        <p>Query: ${query}</p>
      </body>
    </html>
  `);
});

const server = app.listen(port, () => {
  console.log(`started on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
