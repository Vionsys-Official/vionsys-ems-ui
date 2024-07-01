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
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-gray-400 flex justify-center items-center">
      <div className="bg-white shadow-2xl w-full max-w-md p-10 rounded-lg">
        <div className="flex justify-center mb-8">
          <img src="/public/assets/logo.png" className="w-2/3" alt="vionsys" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col mb-5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              type="email"
              value={email}
              autoComplete="current-email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
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
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white p-3 mb-6 transition duration-300"
          >
            {isPending ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="text-center">
          <Link
            to="/ForgotPassword"
            className="text-sm text-blue-600 hover:underline transition duration-150"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
