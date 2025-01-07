import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import ProductCard from "./components/product/ProductCard.jsx";
import Footer from "./components/footer/Footer.jsx";
import { getDatabase, ref, onValue } from "firebase/database";

function App() {
  const [products, setProducts] = useState([]);
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const productsRef = ref(db, "PRODUCTS/");
    const aboutRef = ref(db, "ABOUT/");

    const fetchProducts = () => {
      setLoading(true);
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

    const fetchAboutData = () => {
      onValue(aboutRef, (snapshot) => {
        if (snapshot.exists()) {
          const aboutData = snapshot.val();
          const aboutList = Object.keys(aboutData).map((id) => ({
            id,
            ...aboutData[id],
          }));
          setAboutData(aboutList);
        } else {
          setAboutData([]);
        }
        setLoading(false);
      });
    };

    fetchProducts();
    fetchAboutData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-300">
        <p className="text-3xl font-medium text-center sm:text-left p-4">Products</p>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
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
        )}

        <div className="w-full h-fit mt-8">
          <p className="text-3xl font-medium text-center sm:text-left p-4">About Us</p>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {aboutData.length > 0 ? (
                aboutData.map((about) => (
                  <div key={about.id} className="card bg-base-100 shadow-lg p-4">
                    <img src={about.PHOTO_URL} alt={about.TITLE} className="h-32 w-full object-cover rounded-md mb-4" />
                    <h4 className="font-semibold text-lg">{about.TITLE}</h4>
                    <p className="text-sm">{about.DESCRIPTION}</p>
                  </div>
                ))
              ) : (
                <p>No About sections available.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;