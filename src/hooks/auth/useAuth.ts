import { IMessage } from "@/components/layout/auth";
import { PUBLIC_URL } from "@/lib/navigation.conf";
import { authService } from "@/services/auth/auth.service";
import { IAuthLoginForm, IAuthRegisterForm } from "@/shared/types/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const [message, setMessage] = useState<IMessage | null>(null);

  const onLogin = async (formData: IAuthLoginForm) => {
    try {
      const response = await authService.login(formData);
      if (response.status == 200) {
        login(response.data);
        router.replace(PUBLIC_URL.home());
      }
    } catch (error: AxiosError | unknown) {
      if (
        error instanceof AxiosError &&
        error.status &&
        (error.status >= 400 || error.status < 500)
      ) {
        setMessage({
          message: "Username or password is incorrect",
          type: "error",
        });
      } else {
        console.error(error);
      }
    }
  };

  const onRegister = async (formData: IAuthRegisterForm) => {
    try {
      await authService.register({
        name: formData.name,
        username: formData.username,
        password: formData.password,
      });
      router.replace(PUBLIC_URL.auth(formData.username));
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setMessage({
          message: error.response.data.message,
          type: "error",
        });
      }
    }
  };

  const onLogout = () => {
    authService.logout();
    logout();
    router.replace(PUBLIC_URL.auth());
  };

  return { onLogin, onRegister, onLogout, message };
}
