import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdRoundaboutRight } from "react-icons/md";
import { MdOutlineContactMail } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";

import Order from "./order/Order.jsx";
import Product from "./product/Product.jsx";
import About from "./about/About.jsx"

export default function Admin() {
  const [currentPage, setCurrentPage] = useState("product");

  return (
    <>
      <div className="navbar bg-base-200">
      <div className="navbar-start"></div>
        <div className="navbar-center">
          <p className="text-2xl font-extrabold">Admin</p>
        </div>
        <div className="navbar-end"></div>
      </div>

      <div className="outerlayout flex flex-row w-full text-center ">
        {/* Sidebar */}
        <div className="w-[50px] bg-base-100 flex flex-col gap-2 sm:flex-col">
          <div className="lg:tooltip lg:tooltip-right" data-tip="Order">
            <button onClick={() => setCurrentPage("order")} className="btn btn-primary w-full ml-1 " > <MdOutlineLocalShipping className="w-7 h-7" /> </button>
          </div>
          
          <div className="lg:tooltip lg:tooltip-right" data-tip="Product">
            <button onClick={() => setCurrentPage("product")} className="btn btn-primary w-full ml-1 " > <MdOutlineProductionQuantityLimits className="w-7 h-7"  /> </button>
          </div>
          
          <div className="lg:tooltip lg:tooltip-right" data-tip="About">
            <button onClick={() => setCurrentPage("about")} className="btn btn-primary w-full ml-1" > <MdOutlineContactMail className="w-7 h-7"  /> </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full h-full">
          {currentPage === "order" && <Order/> }
          {currentPage === "product" && <Product/> }
          {currentPage === "about" && <About/>}
        </div>
      </div>
    </>
  );
}
