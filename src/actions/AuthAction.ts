import axiosClient from ".";

type AuthActionType = {
  login: (data: {
    username: string;
    password: string;
  }) => Promise<{ token: string }>;
  me: () => Promise<any>;
};

const AuthAction: AuthActionType = {
  login: async (data) => {
    const result = await axiosClient.post("/login", data);
    return result.data as { token: string };
  },
  me: async () => {
    const result = await axiosClient.get("/me");
    return result.data;
  },
};

export default AuthAction;
