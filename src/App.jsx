import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import ProductCard from "./components/product/ProductCard.jsx";
import Footer from "./components/footer/Footer.jsx";
import { getDatabase, ref, onValue } from "firebase/database";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const productsRef = ref(db, "PRODUCTS/");

    const fetchProducts = () => {
      onValue(productsRef, (snapshot) => {
        if (snapshot.exists()) {
          const productData = snapshot.val();
          const productList = Object.keys(productData).map((id) => ({
            id,
            ...productData[id],
          }));
          setProducts(productList);
        } else {
          setProducts([]);
        }
      });
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-300">
        <p className="text-3xl font-medium text-center sm:text-left p-4">Products</p>
        <div className="overflow-x-auto flex flex-row gap-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              url={product.IMAGE_URL}
              productName={product.PRODUCT_NAME}
              productPrice={product.PRODUCT_PRICE}
            />
          ))}
        </div>

        <div className="w-full h-[600px]"></div>
      </div>

      <Footer />
    </>
  );
}

export default App;
