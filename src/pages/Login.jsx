import { useState } from "react";
import useLogin from "../features/authentication/useLogin";
import { HiCheck } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 via-orange-50 to-gray-200 flex justify-center items-center">
      <div className="bg-white shadow-2xl w-full max-w-md p-8 rounded-lg">
        <div className="flex justify-center mb-6">
          <img src="/assets/logo.png" className="w-2/3" alt="vionsys" />
        </div>
        <h2 className="text-center font-medium text-black text-xl border-t p-3">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="p-4 border rounded-lg">
          <div className="flex flex-col mb-5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-black mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              type="email"
              value={email}
              autoComplete="current-email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6 relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black mb-1"
            >
              Password
            </label>
            <input
              id="password"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[45px] h-[62%] transform -translate-y-1/2"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full rounded-md bg-blue-700 hover:bg-blue-800 text-white p-2 mb-1 transition duration-300"
          >
            {isPending ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="text-center mb-2">
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
