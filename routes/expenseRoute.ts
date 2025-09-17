import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

type ExpenseType = {
  id: number;
  title: string;
  amount: number;
};

const createPostSchema = z.object({
  title: z.string().min(3),
  amount: z.number(),
});

const fakeExpense: ExpenseType[] = [
  { id: 1, title: "Groceries", amount: 45.2 },
  { id: 2, title: "Electricity Bill", amount: 60.75 },
  { id: 3, title: "Internet", amount: 30.0 },
  { id: 4, title: "Coffee", amount: 5.5 },
  { id: 5, title: "Movie Tickets", amount: 25.0 },
  { id: 6, title: "Dinner", amount: 40.0 },
  { id: 7, title: "Taxi", amount: 12.8 },
  { id: 8, title: "Books", amount: 18.99 },
  { id: 9, title: "Gym Membership", amount: 55.0 },
  { id: 10, title: "Snacks", amount: 7.25 },
];
export const expenseRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpense });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpense.push({ id: fakeExpense.length + 1, ...expense });
    return c.json({ expenses: expense });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param("id"));
    const expense = fakeExpense.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param("id"));
    const expenseIndex = fakeExpense.findIndex((expense) => expense.id === id);
    if (expenseIndex === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpense.splice(expenseIndex, 1);
    return c.json({ expense: deletedExpense });
  })
  .get("/total-spent", async (c) => {
    const totalSpent = fakeExpense.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ totalSpent });
  });
