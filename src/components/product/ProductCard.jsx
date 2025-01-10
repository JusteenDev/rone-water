import { useState } from "react";
import { IoIosWater } from "react-icons/io";
import { ref, push, getDatabase } from "@firebase/database";

export default function ProductCard({ url, productName, productPrice }) {
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const database = getDatabase();

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const isOrderDisabled =
    quantity === 0 || name.trim() === "" || address.trim() === "";

  const handleOrder = () => {
    const orderData = {
      NAME: name,
      TIME: new Date().toISOString(),
      ADDRESS: address,
      QUANTITY: quantity,
      PRODUCT_NAME: productName,
      PRODUCT_PRICE: productPrice,
    };

    // Push order to Firebase
    push(ref(database, "ORDERS/"), orderData)
      .then(() => {
        alert("Order sent successfully!");
        setQuantity(0);
        setName("");
        setAddress("");
        document.getElementById("my_modal_5").close();
      })
      .catch((error) => {
        console.error("Error sending order:", error);
        alert("Failed to send order. Please try again.");
      });
  };

  return (
    <>
      <div className="products">
        <div className="card p-2 bg-base-200 rounded-none shadow-xl w-screen h-96 sm:w-72">
          <figure className="px-10 pt-2 pb-5">
            <img src={url} alt={productName} className="rounded-xl shadow-xl h-36 w-36" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{productName}</h2>
            <p>₱ {productPrice}</p>
            <div className="card-actions">
              <button className="btn btn-md btn-primary" onClick={() => document.getElementById("my_modal_5").showModal()} > Order Now <IoIosWater className="w-6 h-6" /> </button>
              
              <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col items-center justify-center">
                  <div className="flex flex-col items-start justify-center w-full">
                    <p className="text-3xl font-extrabold">{productName}</p>
                    <p className="text-xl font-medium mb-4">₱ {productPrice}</p>

                    {/* Quantity Increaser */}
                    <div className="flex items-center gap-2 mb-4">
                      <button className="btn btn-sm btn-primary" onClick={decrementQuantity} disabled={quantity === 0} > - </button>
                      <p className="text-lg font-bold">{quantity}</p>
                      <button className="btn btn-sm btn-primary" onClick={incrementQuantity}> + </button>
                    </div>

                    {/* Input fields */}
                    <input type="text" className="input input-md mb-1 w-full bg-base-200" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled={quantity === 0} />
                    <input type="text" className="input input-md mb-1 w-full bg-base-200" placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} disabled={quantity === 0} />
                  </div>

                  <div className="modal-action flex gap-2">
                    <form method="dialog">
                      <a href="tel:0928-433-4978" className="btn btn-md btn-primay bg-primary text-white w-24" > Call us </a>
                    </form>
                    <form method="dialog">
                      <button className="btn btn-md btn-primay bg-primary text-white w-24" onClick={handleOrder} disabled={isOrderDisabled} > Order </button>
                    </form>
                    <form method="dialog">
                      <button className="btn btn-md btn-primay bg-primary text-white w-24"> Cancel </button>
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
