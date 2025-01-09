import { useNavigate } from "react-router-dom";
import { FiAlignLeft } from "react-icons/fi";
import { FaAngleDoubleDown } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <div
        className="hero min-h-screen sm:bg-no-repeat sm:bg-cover" style={{
          backgroundImage: "url(https://res.cloudinary.com/dv8p1hpew/image/upload/v1736351233/lzwrmagoh2udtn7lna0q.png)",
        }}>
        <div className="hero-overlay bg-opacity-0 "></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md mt-56 items-center text-center place-content-center flex flex-col">
          </div>
        </div>
      </div>
    </>
  );
}
