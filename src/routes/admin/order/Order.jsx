import { useState, useEffect } from "react";
import { ref, onValue, remove, getDatabase } from "@firebase/database";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const database = getDatabase();

  // Fetch orders from Firebase
  useEffect(() => {
    const ordersRef = ref(database, "ORDERS/");
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedOrders = Object.entries(data).map(([id, order]) => ({
          id,
          ...order,
        }));
        setOrders(formattedOrders);
      } else {
        setOrders([]);
      }
    });
  }, [database]);

  // Delete an order
  const deleteOrder = (id) => {
    remove(ref(database, `ORDERS/${id}`))
      .then(() => {})
      .catch((error) => console.error("Error deleting order:", error));
  };

  // Calculate totals
  const totalQuantity = orders.reduce((sum, order) => sum + (order.QUANTITY || 0), 0);
  const totalEarnings = orders.reduce(
    (sum, order) => sum + (order.QUANTITY || 0) * (order.PRODUCT_PRICE || 0),
    0
  );

  return (
    <>
      {/* Summary */}
      <div className="bg-base-300 ml-2 w-[300px] sm:w-full  h-[50px] flex justify-between items-center px-2 text-sm sm-text-md">
        <p>Total Orders: {orders.length}</p>
        <p>Total Quantity Sold: {totalQuantity}</p>
        <p>Total Money Earned: ₱{totalEarnings}</p>
      </div>

      {/* List of Orders */}
      <div className="p-2 sm:p-4">
        <h2 className="text-lg font-bold mb-2">Customer Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="hidden md:block">
            {/* Table for larger screens */}
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-primary text-black">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Address</th>
                  <th className="border px-4 py-2">Product</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.NAME}</td>
                    <td className="border px-4 py-2">{order.ADDRESS}</td>
                    <td className="border px-4 py-2">{order.PRODUCT_NAME}</td>
                    <td className="border px-4 py-2">{order.QUANTITY}</td>
                    <td className="border px-4 py-2">₱{order.PRODUCT_PRICE}</td>
                    <td className="border px-4 py-2">₱{order.QUANTITY * order.PRODUCT_PRICE}</td>
                    <td className="border px-4 py-2">
                      <button className="btn btn-sm btn-error" onClick={() => deleteOrder(order.id)} > Delete </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile view */}
        <div className="md:hidden">
          {orders.map((order) => (
            <div key={order.id} className="bg-base-200 p-2 mb-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-left">{order.PRODUCT_NAME}</h3>
              <p className="text-left text-sm"><strong>Name:</strong> {order.NAME}</p>
              <p className="text-left text-sm"><strong>Address:</strong> {order.ADDRESS}</p>
              <p className="text-left text-sm"><strong>Quantity:</strong> {order.QUANTITY}</p>
              <p className="text-left text-sm"><strong>Price:</strong> ₱{order.PRODUCT_PRICE}</p>
              <p className="text-left text-sm"><strong>Total:</strong> ₱{order.QUANTITY * order.PRODUCT_PRICE}</p>
              <button className="btn btn-sm btn-primary mt-2 shadow-xl" onClick={() => deleteOrder(order.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}