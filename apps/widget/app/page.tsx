"use client";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { useMutation } from "convex/react";
import { useQuery } from "convex/react";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World/widget</h1>
        <Button size="sm" onClick={() => addUser()}>
          Add user
        </Button>
        <p>{JSON.stringify(users, null, 4)}</p>
      </div>
    </div>
  );
}
