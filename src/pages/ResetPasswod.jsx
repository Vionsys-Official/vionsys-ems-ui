import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useResetPassword from "../features/authentication/useResetPassword";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword, isPending } = useResetPassword();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const form = { password, passwordConfirm, token };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password || !passwordConfirm || password !== passwordConfirm) {
      toast.error("Please enter matching passwords");
      return;
    }
    resetPassword(form, {
      onSettled: () => {
        setPassword("");
        setPasswordConfirm("");
      },
      onSuccess: () => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-gray-400 flex justify-center items-center">
      <div className="bg-white shadow-2xl w-full max-w-md p-10 rounded-lg">
        <div className="flex justify-center mb-8">
          <img src="/assets/logo.png" className="w-2/3" alt="vionsys" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword}>
          <div className="flex flex-col mb-5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              New Password
            </label>
            <input
              id="password"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              type="password"
              value={password}
              autoComplete="new-password"
              placeholder="Enter your new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              type="password"
              value={passwordConfirm}
              autoComplete="new-password"
              placeholder="Confirm your new password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white p-3 mb-6 transition duration-300"
          >
            {isPending ? "Loading..." : "Reset Password"}
          </button>
        </form>
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline transition duration-150"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
