import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const NavBar = () => {
  return (
    <div className="p-2 flex gap-10">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/expenses" className="[&.active]:font-bold">
        Expenses
      </Link>
      <Link to="/create-expense" className="[&.active]:font-bold">
        Create Expense
      </Link>
    </div>
  );
};

const Root = () => {
  return (
    <>
      <NavBar />
      <hr />
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
