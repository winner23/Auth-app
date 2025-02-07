import { IAuthLoginForm } from "@/shared/types/auth";
import { useParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "./useAuth";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function useAuthLoginForm() {
  const params = useParams<{ username: string }>();
  const { onLogin } = useAuth();

  const form = useForm<IAuthLoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: params.username || "",
      password: "",
    },
  });

  const [isPending, setIsPending] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IAuthLoginForm> = async (data) => {
    setIsPending(true);
    await onLogin(data);
    setIsPending(false);
  };

  return { onSubmit, form, isPending };
}
