import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import ProductCard from "./components/product/ProductCard.jsx";
import Footer from "./components/footer/Footer.jsx";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [aboutData, setAboutData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingAbout, setLoadingAbout] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const productsRef = ref(db, "PRODUCTS/");
    const aboutRef = ref(db, "ABOUT/");

    const fetchProducts = () => {
      setLoadingProducts(true);
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
        setLoadingProducts(false);
      });
    };

    const fetchAboutData = () => {
      setLoadingAbout(true);
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
        setLoadingAbout(false);
      });
    };

    fetchProducts();
    fetchAboutData();
  }, []);

  const handleAdmin = () => {
    navigate("/admin");
  };

  const isLoading = loadingProducts || loadingAbout;

  return (
    <>
      <div className="min-h-screen bg-base-100">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner text-primary"> </span>
          </div>
        ) : (
          <>
            <div className="navbar bg-transparent fixed">
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li onClick={handleAdmin}>
                      <a>Admin</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="navbar-center"></div>
              <div className="navbar-end "></div>
            </div>

            <Navbar />
            <div>
              <p className="text-2xl font-extrabold text-center sm:text-left p-4">Products</p>
              <div className="overflow-x-auto flex flex-row gap-1 items-center place-content-center ">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      url={product.IMAGE_URL}
                      productName={product.PRODUCT_NAME}
                      productPrice={product.PRODUCT_PRICE}
                    />
                  ))
                ) : (
                  <p>No products available.</p>
                )}
              </div>
            </div>

            <div className="w-full mt-8 items-center place-content-center">
              <p className="text-2xl font-extrabold text-center sm:text-left p-2">About Us</p>
              <div className="flex flex-col w-full gap-4 p-2 items-center place-content-center">
                {aboutData.length > 0 ? (
                  aboutData.map((about) => (
                    <div key={about.id} className="card w-full sm:w-1/2 bg-base-200 shadow-lg p-2">
                      {about.PHOTO_URL && (
                        <img src={about.PHOTO_URL} alt={about.TITLE} className="h-full w-full rounded-md mb-4" />
                      )}
                      <h4 className="font-extrabold text-lg text-center">{about.TITLE}</h4>
                      <p className="text-md text-justify">{about.DESCRIPTION}</p>
                    </div>
                  ))
                ) : (
                  <p>No About sections available.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;