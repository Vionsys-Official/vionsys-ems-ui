import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useResetPassword from "../features/authentication/useResetPassword";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword, isPending } = useResetPassword();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const form = { password, passwordConfirm, token };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 via-orange-50 to-gray-200 flex justify-center items-center">
      <div className="bg-white shadow-2xl w-full max-w-md p-8 rounded-lg">
        <div className="flex justify-center mb-6">
          <img src="/assets/logo.png" className="w-2/3" alt="vionsys" />
        </div>
        <h2 className="text-center font-medium text-black text-xl border-t p-3">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword} className="p-4 border rounded-lg">
          <div className="flex flex-col mb-5 relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black mb-1"
            >
              New Password
            </label>
            <input
              id="password"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="new-password"
              placeholder="Enter your new password"
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
          <div className="flex flex-col mb-5 relative">
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-black mb-1"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              type={showPasswordConfirm ? "text" : "password"}
              value={passwordConfirm}
              autoComplete="new-password"
              placeholder="Confirm your new password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordConfirmVisibility}
              className="absolute right-3 top-[45px] h-[62%] transform -translate-y-1/2"
            >
              {showPasswordConfirm ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full rounded-md bg-blue-700 hover:bg-blue-800 text-white p-2 transition duration-300"
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
