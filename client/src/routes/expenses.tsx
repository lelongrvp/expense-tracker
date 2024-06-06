import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

const getAllExpenses = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Failed to get expenses");
  }
  const data = await res.json();
  return data;
};

function Expenses() {
  const { data, error, isPending } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of your expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium animate-pulse">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell className="animate-pulse">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell className="animate-pulse">
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
