import { axiosClassic, axiosWithAuth } from "@/lib/api";
import { API_URL } from "@/lib/api.conf";
import {
  IAuthLoginForm,
  AuthRegisterRequest,
  IAuthResponse,
  IUser,
} from "@/shared/types/auth";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

class AuthService {
  async register(data: AuthRegisterRequest) {
    const response = await axiosClassic({
      url: API_URL.auth("/register"),
      method: "POST",
      data,
    });

    return response;
  }

  async login(data: IAuthLoginForm) {
    const responseWithToken = await axiosClassic<IAuthResponse>({
      url: API_URL.auth("/login"),
      method: "POST",
      data,
    });
    console.log(responseWithToken);

    if (responseWithToken.data.accessToken) {
      saveTokenStorage(responseWithToken.data.accessToken);

      const responseWithUser = await axiosWithAuth<IUser>({
        url: API_URL.auth("/me"),
        method: "GET",
      });

      return responseWithUser;
    }

    throw new Error("jwt must be provided");
  }

  async logout() {
    removeFromStorage();
  }
}

export const authService = new AuthService();
