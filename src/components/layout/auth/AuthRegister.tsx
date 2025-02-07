"use client";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useAuthRegisterForm } from "@/hooks/auth/useAuthRegisterForm";

// import styles from "./Auth.module.css";
import { AuthMessage } from "./AuthMessage";
import { useAuth } from "@/hooks/auth/useAuth";
import styles from "./Auth.module.css";

export function AuthRegister() {
  const { onSubmit, form, isPending } = useAuthRegisterForm();
  const { message } = useAuth();

  return (
    <>
      {message && <AuthMessage message={message} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className={styles.formItem}>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
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
            name="username"
            render={({ field }) => (
              <FormItem className={styles.formItem}>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className={styles.formItem}>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending}>Register</Button>
        </form>
      </Form>
    </>
  );
}
