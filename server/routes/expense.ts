import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expensesSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expensesSchema>;

const expenseSchema = expensesSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Car Insurance",
    amount: 294.67,
  },
  {
    id: 2,
    title: "Rent",
    amount: 1000.0,
  },
  {
    id: 3,
    title: "Groceries",
    amount: 200.0,
  },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json(fakeExpenses);
  })
  .post("/", zValidator("json", expenseSchema), (c) => {
    const expense = c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    console.log(expense);
    c.status(201);
    return c.json({});
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) return c.notFound();
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) return c.notFound();
    const deletedExpense = fakeExpenses.splice(expense.id - 1, 1)[0];
    return c.json({ expense: deletedExpense });
  })
  .delete("/", (c) => {
    fakeExpenses.splice(0, fakeExpenses.length);
    return c.json({ message: "All expenses deleted" });
  });
