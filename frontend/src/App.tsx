import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

const fetchTotalSpent = async () => {
  const res = await fetch("/api-v1/expenses/total-spent");
  const data = await res.json();
  return data;
};
function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    fetchTotalSpent().then((data) => setTotalSpent(data.totalSpent));
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col m-auto w-full max-w-2xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>Expense Tracker</CardTitle>
            <CardDescription>Track your expenses efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View and manage your expenses</p>
          </CardContent>
          <CardFooter>
            <p className="mr-auto">Total Spent: ${totalSpent.toFixed(2)}</p>
            <CardAction>Add Expense</CardAction>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default App;
