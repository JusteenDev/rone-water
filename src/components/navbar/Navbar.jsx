import { useNavigate } from "react-router-dom";
import { FiAlignLeft } from "react-icons/fi";

export default function Navbar() {
  return (
    <>
      <div
        className="hero min-h-screen bg-cover"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dv8p1hpew/image/upload/v1736310604/cgy9mvt4jpxmolgkbysy.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-20 "></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl sm:text-6xl font-bold text-white">
              Rone Purified Drinking Water
            </h1>
            <p className="mb-5 w-full text-3xl sm:text-4xl text-white">
              Experience the purest and freshest drinking water. Clean, safe,
              and perfect for your family’s needs. Stay hydrated, stay healthy!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
