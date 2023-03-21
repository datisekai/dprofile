import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import AuthAction from "~/actions/AuthAction";
import Header from "~/components/Headers/Header";
import Meta from "~/components/Meta";
import TextInput from "~/components/TextInput";

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation(AuthAction.login, {
    onSuccess: (data) => {
      setCookie("token", data.token);
      Swal.fire("Success", "Login successfull", "success");
      router.push("/admin");
    },
    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: "Username or password incorrect",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleLogin = (data: FormValues) => {
    mutate(data);
  };

  return (
    <>
      <Meta title="Datisekai | Login" />
      <div className="bg-gradient-to-b from-neutral to-accent px-2">
        <div className="mx-auto max-w-[1200px]  px-2">
          <Header />
          <div className="flex h-full min-h-[calc(100vh-70px)] items-center justify-center">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="w-[90%] rounded-md bg-base-100 p-4 shadow-md md:w-[400px]">
                <h1 className="text-center text-xl">Login</h1>
                <div className="mt-4 space-y-2">
                  <div className="space-y-1">
                    <label htmlFor="username">Username</label>
                    <TextInput
                      control={control}
                      error={errors}
                      name="username"
                      placeholder="Type here"
                      rules={{ required: "Not be empty" }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="password">Password</label>
                    <TextInput
                      control={control}
                      error={errors}
                      name="password"
                      type="password"
                      placeholder="Type here"
                      rules={{ required: "Not be empty" }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn-primary btn text-base-100"
                  >
                    Login
                  </button>
                  <Link href={"/"}>
                    <button className="btn-ghost btn-active btn">Back</button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies["token"];

  if (token) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }

  return {
    props: {},
  };
};
