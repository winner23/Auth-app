"use client";
import { Button } from "@/components/ui/Button";
import { useAuthLoginForm } from "@/hooks/auth/useAuthLoginForm";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { AuthMessage } from "./AuthMessage";
import { useAuth } from "@/hooks/auth/useAuth";
import styles from "./Auth.module.css";

export function AuthLogin() {
  const { onSubmit, form, isPending } = useAuthLoginForm();
  const { message } = useAuth();

  return (
    <>
      {message && <AuthMessage message={message} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className={styles.formItem}>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="User Name"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className={styles.formItem}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending}>Login</Button>
        </form>
      </Form>
    </>
  );
}
