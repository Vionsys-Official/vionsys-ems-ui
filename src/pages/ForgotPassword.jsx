import React, { useState } from "react";
import useForgotPassword from "../features/authentication/useForgotPassword";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { sendForgotMail, isPending } = useForgotPassword();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your Email!");
      return;
    }
    sendForgotMail(email, {
      onSettled: () => setEmail(""),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-gray-400 flex justify-center items-center">
      <div className="bg-white shadow-2xl w-full max-w-md p-10 rounded-lg">
        <div className="flex justify-center mb-8">
          <img src="/public/assets/logo.png" className="w-2/3" alt="vionsys" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot Password?
        </h2>
        <form onSubmit={handleForgotPassword}>
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
          <button
            disabled={isPending}
            type="submit"
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white p-3 mb-6 transition duration-300"
          >
            {isPending ? "Loading..." : "Send Email"}
          </button>
        </form>
        <div className="text-center">
          <Link
            to="/Login"
            className="text-sm text-blue-600 hover:underline transition duration-150"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
