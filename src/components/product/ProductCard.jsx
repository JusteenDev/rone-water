import { IoIosWater } from "react-icons/io";

export default function ProductCard({ url, productName, productPrice }) {
  return (
    <>
      <div className="products">
        <div className="card bg-base-200 rounded-none shadow-xl w-screen h-96 sm:w-72 ">
          <figure className="px-10 pt-5">
            <img src={url} alt={productName} className="rounded-none h-48 w-48" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{productName}</h2>
            <p>{productPrice} PHP </p>
            <div className="card-actions">
              <button className="btn btn-primary text-black">
                Order Now <IoIosWater className="text-blue-800 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
