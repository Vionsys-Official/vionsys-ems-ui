import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import verificationOfMail from "../features/authentication/useVerify";

const VerifyMail = () => {
  const { token } = useParams();
  const { verify, isPending, isError, isSuccess } = verificationOfMail();
  useEffect(() => {
    verify(token);
  }, [token]);

  return (
    <main>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-4xl font-bold text-indigo-600">
            {isSuccess && 200}
            {isPending && "verifying..."}
            {isError && 400}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl capitalize">
            {isSuccess && "Email Verification completed successfully."}
            {isPending && "Email Verification is under progress."}
            {isError && "Email Verification Failed"}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 capitalize">
            {isError && "Sorry, there is Error while verifying your Email."}
            {isPending && "Wait, we are verifying your Email ."}
            {isSuccess && "Great, your Email is verified."}
          </p>
        </div>
      </main>
    </main>
  );
};

export default VerifyMail;
