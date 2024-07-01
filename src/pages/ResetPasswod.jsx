import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useResetPassword from "../features/authentication/useResetPassword";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswod = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetpasword, isPending } = useResetPassword();
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");

  const form = { password, passwordConfirm, token };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleresetpassword = (e) => {
    e.preventDefault();
    if (!password || (!passwordConfirm && password === passwordConfirm)) {
      toast.error("please enter correct password");
      return null;
    }
    resetpasword(form, {
      onSettled: () => {
        setpassword("");
        setpasswordConfirm("");
      },
      onSuccess: () => {
        setTimeout(() => {
          navigate("/login");
        }, 2 * 1000);
      },
    });
  };

  return (
    <main className="h-screen w-screen bg-slate-300  flex justify-center items-center">
      <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
        <div className="bg-white w-96 p-6 rounded-md">
          <div className="bg-white flex justify-center mb-3">
            <img
              src="https://www.vionsys.com/public/assets/img/logo_3.png"
              className="p-2 w-4/6"
              alt="vionsys"
            />
          </div>
          <h2 className="text-2xl">Enter the password and confirm password</h2>
          <form onSubmit={handleresetpassword}>
            <div className="flex flex-col my-2">
              <label htmlFor="">password</label>
              <input
                className="p-2 rounded-md border-[1px] border-slate-400"
                type="text"
                value={password}
                autoComplete="current-password"
                placeholder="Enter your password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="">confirm password</label>
              <input
                className="p-2 rounded-md border-[1px] border-slate-400"
                type="text"
                value={passwordConfirm}
                autoComplete="current-confirm-password"
                placeholder="Enter your confirm passwod"
                onChange={(e) => setpasswordConfirm(e.target.value)}
              />
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="w-full rounded-md bg-blue-600 text-slate-100 p-2 mt-2"
            >
              {isPending ? "Loading...." : "reset password"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswod;
