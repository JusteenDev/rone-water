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
      .then(() => alert("Order deleted successfully"))
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
      <div className="bg-base-300 w-full h-[50px] flex justify-between items-center px-4">
        <p>Total Orders: {orders.length}</p>
        <p>Total Quantity Sold: {totalQuantity}</p>
        <p>Total Money Earned: ₱{totalEarnings}</p>
      </div>

      {/* List of Orders */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Customer Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
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
                <tr key={order.id} className="">
                  <td className="border px-4 py-2">{order.NAME}</td>
                  <td className="border px-4 py-2">{order.ADDRESS}</td>
                  <td className="border px-4 py-2">{order.PRODUCT_NAME}</td>
                  <td className="border px-4 py-2">{order.QUANTITY}</td>
                  <td className="border px-4 py-2">₱{order.PRODUCT_PRICE}</td>
                  <td className="border px-4 py-2">₱{order.QUANTITY * order.PRODUCT_PRICE}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
