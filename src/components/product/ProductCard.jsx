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
            <p>₱ {productPrice}</p>
            <div className="card-actions">
              {/* Open the modal using document.getElementById('ID').showModal() method */}

              <button className="btn btn-md btn-primary" onClick={() => document.getElementById('my_modal_5').showModal()}>
                Order Now <IoIosWater className="w-6 h-6" />
              </button>

              <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col items-center justify-center">

                  <div className="flex flex-col items-start justify-center w-full">
                    <p className="text-3xl font-extrabold">{productName}</p>
                    <p className="text-xl font-medium mb-4">₱ {productPrice}</p>
                    <input type="text" className="input input-md mb-1 w-full bg-base-200" placeholder="Name"/>
                    <input type="text" className="input input-md mb-1 w-full bg-base-200" placeholder="Full Address"/>
                  </div>

                  <div className="modal-action flex gap-2">
                    <form method="dialog">
                        <a href="tel:0928-433-4978" className="btn btn-md btn-primay bg-primary text-white w-36">Call to Order</a>
                    </form>
                    <form method="dialog">
                        <button className="btn btn-md btn-primay bg-primary text-white w-36">Order</button>
                    </form>
                  </div>
                </div>
              </dialog>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}
