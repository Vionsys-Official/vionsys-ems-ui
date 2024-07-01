import { useState } from "react";
import useLogin from "../features/authentication/useLogin";
import { HiCheck } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();
  const queryClient = useQueryClient();

  const handleLogin = (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
        onSuccess: (data) => {
          const decodedToken = jwtDecode(data.token);
          localStorage.setItem("user", JSON.stringify(decodedToken));
          toast.success(`Log in successfully.`, {

            icon: <HiCheck color="green" />,
          });
          queryClient.invalidateQueries({
            queryKey: ["user"],
          });
        },
      }
    );
  };

  return (
    <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
      <div className="bg-white w-96 p-6 rounded-md">
        <div className="bg-white flex justify-center mb-3">
          <img
            src="https://www.vionsys.com/public/assets/img/logo_3.png"
            className="p-2 w-4/6"
            alt="vionsys"
          />
        </div>
        <h2 className="text-2xl">Login to your account</h2>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col my-2">
            <label htmlFor="">Email</label>
            <input
              className="p-2 rounded-md border-[1px] border-slate-400"
              type="text"
              value={email}
              autoComplete="current-email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="">Password</label>
            <input
              className="p-2 rounded-md border-[1px] border-slate-400"
              type="password"
              value={password}
              autoComplete="current-password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full rounded-md bg-blue-600 text-slate-100 p-2 mt-2"
          >
            {isPending ? "Loading...." : "Login"}
          </button>
        </form>
        <div>
          <Link to={'/ForgotPassword'}>Forgot Password ?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
