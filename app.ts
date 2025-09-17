import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenseRoute";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("*", logger());

const isProduction = process.env.NODE_ENV === "production";
console.log("Is Production:", isProduction);

app.get("/test", (c) => c.text("Hello world"));

app.route("/api-v1/expenses", expenseRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
