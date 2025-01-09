import { FaLocationDot } from "react-icons/fa6";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer footer-center rounded-t-xl bg-primary text-primary-content p-10">
      <aside>
        <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="inline-block fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
        <p className="font-bold">Rone Purified Drinking Water</p>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>

      <nav>
        <p className="text-xl font-medium">Contact Us</p>
        <div className="grid grid-cols-1 gap-4 text-md font-extrabold mt-4">
          <a className="flex gap-4 items-center underline hover:text-secondary" href="https://www.google.com/maps?q=9-G+Parinas+St.+Road+20+Project+8+Qc" target="_blank" rel="noopener noreferrer" >
            <FaLocationDot className="w-7 h-7" /> 9-G Parinas St. Road 20 Project 8 Qc
          </a>
          <a href="tel:7954-6823" className="flex gap-4 items-center underline hover:text-secondary"> <TbDeviceLandlinePhone className="w-7 h-7" /> 7954-6823 </a>
          <div className="flex gap-2">
            <a href="tel:0915-975-0849" className="flex gap-4 items-center underline hover:text-secondary"> <IoCall className="w-7 h-7" /> 0915-975-0849 </a> 
            <p>or</p>
            <a href="tel:0928-433-4978" className="flex gap-4 items-center underline hover:text-secondary"> 0928-433-4978 </a>
          </div>
          <a className="flex gap-4 items-center text-lg underline hover:text-blue-600" href="https://www.facebook.com/RONEWATERPURIFIED?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" >
            <FaFacebookSquare className="w-7 h-7" />
            Follow us on Facebook
          </a>
        </div>
      </nav>
    </footer>
  );
}