import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  return (
    <div className="p-2">
      <h1>Create Expense</h1>
      <form className=" flex flex-col border border-white rounded-sm p-5 w-fit gap-5">
        <div className="flex justify-between gap-2">
          <label>Name:</label>
          <Input type="text" />
        </div>
        <div className="flex justify-between gap-2">
          <label>Amount:</label>
          <Input type="number" />
        </div>
        <Button className="w-fit m-auto" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
