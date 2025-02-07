"use client";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/hooks/auth/useAuth";
import { useAuthStore } from "@/store/useAuthStore";

export function User() {
  const user = useAuthStore((state) => state.user);
  const { onLogout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        <Card className="w-[400px] ">
          <CardHeader>User data</CardHeader>
          <CardContent>
            <p className="text-sm">{`id: ${user?.id}`}</p>
            <p>{`Username: ${user?.username}`}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => onLogout()}>Logout</Button>
          </CardFooter>
        </Card>
      ) : (
        <Skeleton className="w-[400px] h-[200px] rounded-xl" />
      )}
    </div>
  );
}
