import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="p-2">
      <h1>Create Expense</h1>
      <form
        className=" flex flex-col p-5 m-w-xl gap-5 m-auto"
        onSubmit={handleSubmit}
      >
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Title is required"
                : value.length < 3
                  ? "Title must be at least 3 characters"
                  : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return value.includes("error") && 'No "error" allowed in title';
            },
          }}
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Title:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            );
          }}
        ></form.Field>
        <Label>Amount:</Label>
        <Input type="number" />
        <Button className="w-fit" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}
