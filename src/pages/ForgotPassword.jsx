import React, { useState } from "react";
import useForgotPassword from "../features/authentication/useForgotPassword";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const { sendForgotMail, isPending } = useForgotPassword();
  const handleForgotpassword = (e) => {
    e.preventDefault();
    if(!email){
      toast.error("Please enter your Email !")
      return
    }
    sendForgotMail(email, {
      onSettled: () => setemail(""),
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
          <h2 className="text-2xl">Forgot Password ?</h2>
          <form onSubmit={handleForgotpassword}>
            <div className="flex flex-col my-2">
              <label htmlFor="">email</label>
              <input
                className="p-2 rounded-md border-[1px] border-slate-400"
                type="text"
                value={email}
                autoComplete="current-email"
                placeholder="Enter your email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="w-full rounded-md bg-blue-600 text-slate-100 p-2 mt-2"
            >
              {isPending ? "Loading...." : " send email"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
