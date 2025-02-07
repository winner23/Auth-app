import { IAuthRegisterForm } from "@/shared/types/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "./useAuth";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
        message:
          "Password must contain at least one capital letter, one lowercase letter and one number.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const defaultValues = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export function useAuthRegisterForm() {
  const form = useForm<IAuthRegisterForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [isPending, setIsPending] = useState<boolean>(false);
  const { onRegister } = useAuth();

  const onSubmit: SubmitHandler<IAuthRegisterForm> = async (data) => {
    setIsPending(true);
    await onRegister(data);
    setIsPending(false);
  };

  return { onSubmit, form, isPending };
}
