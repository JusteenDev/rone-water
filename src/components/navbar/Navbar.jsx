import { useNavigate } from "react-router-dom";
import { FiAlignLeft } from "react-icons/fi";

export default function Navbar() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dv8p1hpew/image/upload/v1736126740/g9k8a80vqpvra0njogvi.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">
              Rone Purified Drinking Water
            </h1>
            <p className="mb-5 text-white">
              Experience the purest and freshest drinking water. Clean, safe,
              and perfect for your family’s needs. Stay hydrated, stay healthy!
            </p>
            <div className="flex flex-row items-center place-content-center gap-2">
              <button className="btn btn-primary">About Us</button>
              <button className="btn btn-primary">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
