import express from "express";
import initSqlJs, { type Database } from "sql.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

const database = createDatabase();

async function createDatabase(): Promise<Database> {
  const SQL = await initSqlJs({
    locateFile: (file) => `node_modules/sql.js/dist/${file}`,
  });
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );

    INSERT INTO users (username, password, role) VALUES
      ('admin', 'super-secret-password', 'admin'),
      ('taro', 'taro-password', 'user'),
      ('hanako', 'hanako-password', 'user');
  `);

  return db;
}

function queryRows(db: Database, sql: string): Record<string, unknown>[] {
  const result = db.exec(sql);

  if (result.length === 0) {
    return [];
  }

  const [firstResult] = result;

  return firstResult.values.map((row) =>
    Object.fromEntries(firstResult.columns.map((column, index) => [column, row[index]])),
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderSqlDemo(title: string, sql: string, rows: Record<string, unknown>[]): string {
  return `
    <!doctype html>
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <pre>${escapeHtml(sql)}</pre>
        <pre>${escapeHtml(JSON.stringify(rows, null, 2))}</pre>
      </body>
    </html>
  `;
}

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

app.get("/users", async (req, res) => {
  const name = String(req.query.name ?? "taro");
  const db = await database;
  const sql = `SELECT id, username, role FROM users WHERE username = '${name}';`;

  try {
    const rows = queryRows(db, sql);
    res.type("html").send(renderSqlDemo("ユーザー検索", sql, rows));
  } catch (error) {
    res.status(500).json({
      sql,
      error: error instanceof Error ? error.message : "Unknown SQL error",
    });
  }
});

app.get("/login", async (req, res) => {
  const username = String(req.query.username ?? "admin");
  const password = String(req.query.password ?? "wrong-password");
  const db = await database;
  const sql = `
    SELECT id, username, role
    FROM users
    WHERE username = '${username}' AND password = '${password}'
    LIMIT 1;
  `;

  try {
    const rows = queryRows(db, sql);
    res.type("html").send(renderSqlDemo("ログイン結果", sql, rows));
  } catch (error) {
    res.status(500).json({
      sql,
      error: error instanceof Error ? error.message : "Unknown SQL error",
    });
  }
});

const server = app.listen(port, () => {
  console.log(`started on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
