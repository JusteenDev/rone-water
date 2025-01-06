import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdRoundaboutRight } from "react-icons/md";
import { MdOutlineContactMail } from "react-icons/md";

import Home from "./home/Home.jsx";
import Product from "./product/Product.jsx";

export default function Admin() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <p className="text-2xl text-white font-medium">Admin</p>
        </div>
        <div className="navbar-end"></div>
      </div>

      <div className="outerlayout flex flex-row w-full text-center ">
        {/* Sidebar */}
        <div className="w-[50px] bg-base-100 flex flex-col gap-2">
          <div className="lg:tooltip lg:tooltip-right" data-tip="Home">
            <button onClick={() => setCurrentPage("home")} className="btn btn-primary w-full ml-1 mt-2" >
              <FiHome />
            </button>
          </div>
          <div className="lg:tooltip lg:tooltip-right" data-tip="Product">
            <button onClick={() => setCurrentPage("product")} className="btn btn-primary w-full ml-1 " >
              <MdOutlineProductionQuantityLimits />
            </button>
          </div>
          <div className="lg:tooltip lg:tooltip-right" data-tip="About">
            <button onClick={() => setCurrentPage("about")} className="btn btn-primary w-full ml-1" >
              <MdRoundaboutRight />
            </button>
          </div>
          <div className="lg:tooltip lg:tooltip-right" data-tip="Contact">
            <button onClick={() => setCurrentPage("contact")} className="btn btn-primary w-full ml-1" >
              <MdOutlineContactMail />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full h-full">
          {currentPage === "home" && <Home />}
          {currentPage === "product" && <Product/> }
          {currentPage === "about" && <div>About Page</div>}
          {currentPage === "contact" && <div>Contact Page</div>}
        </div>
      </div>
    </>
  );
}
