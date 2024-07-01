import { Link } from "react-router-dom";
// import img from "../assets/401 Error Unauthorized-amico.svg";
import { HiArrowCircleLeft } from "react-icons/hi";

const Unauthorized = () => {
  return (
    <div className="flex justify-center gap-4 bg-white items-center w-full h-full">
      <img
        src="/ui/public/assets/illustration-businessman_53876-5856.jpg"
        alt="unauthorized"
        className="w-56"
      />
      <div className="flex-col gap-6 flex">
        <h2 className="text-red-400 text-xl">
          Your are not authorized to perform this operation.{" "}
        </h2>
        <Link
          className="text-blue-600 flex items-center text-xl border-b-2 w-fit hover:border-b-2 hover:border-blue-600"
          to="/"
        >
          <div className="flex items-center gap-2 text-2xl">
            <HiArrowCircleLeft />
            <h4>Home</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
