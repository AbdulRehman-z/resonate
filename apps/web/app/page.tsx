"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <Authenticated>
        <div className="flex flex-col items-center justify-center gap-4 max-w-sm">
          <h1 className="text-2xl font-bold">Hello World/web</h1>
          <UserButton />
          <Button size="sm" onClick={() => addUser()}>
            Add user
          </Button>
          <p>{JSON.stringify(users, null, 2)}</p>
        </div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </div>
  );
}
