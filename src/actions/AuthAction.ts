import axiosClient from ".";

type AuthActionType = {
  login: (data: {
    username: string;
    password: string;
  }) => Promise<{ token: string }>;
};

const AuthAction: AuthActionType = {
  login: async (data) => {
    const result = await axiosClient.post("/login", data);
    return result.data as {token:string};
  },
};

export default AuthAction;
