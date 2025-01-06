import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { getDatabase, ref, set, remove, onValue, off } from "firebase/database";

export default function Product() {
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://server-n991.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const result = await response.json();
      return {
        URL: result.data.secure_url,
        PRODUCT_KEY: result.data.display_name,
      };
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const addProduct = async () => {
    if (!ProductName || !ProductPrice || !file) {
      alert("Please provide a product name, price, and image.");
      return;
    }

    const getProductData = await uploadImage(file);

    if (getProductData) {
      const timestamp = Date.now();

      const db = getDatabase();
      const productRef = ref(db, "PRODUCTS/" + timestamp);
      await set(productRef, {
        PRODUCT_NAME: ProductName,
        PRODUCT_TIME_UPLOADED: timestamp,
        PRODUCT_PRICE: ProductPrice,
        IMAGE_URL: getProductData.URL,
        PRODUCT_KEY: getProductData.PRODUCT_KEY,
      });

      alert("Product added successfully!");
      setProductName("");
      setProductPrice("");
      setFile(null);
    }
  };

  const deleteProduct = async (productId, imageUrl) => {
    const db = getDatabase();
    const productRef = ref(db, "PRODUCTS/" + productId);

    try {
      await remove(productRef);

      const deleteImage = await fetch("https://server-n991.onrender.com/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!deleteImage.ok) {
        throw new Error("Error deleting image");
      }

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    document.getElementById("my_modal_4").showModal();
  };

  const saveProductChanges = async () => {
    if (!selectedProduct) return;

    const db = getDatabase();
    const productRef = ref(db, "PRODUCTS/" + selectedProduct.id);

    try {
      await set(productRef, selectedProduct);
      alert("Product updated successfully!");
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = () => {
      const db = getDatabase();
      const productsRef = ref(db, "PRODUCTS/");

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
          console.log("No products found.");
        }
      });
    };

    fetchProducts();

    return () => {
      const db = getDatabase();
      const productsRef = ref(db, "PRODUCTS/");
      off(productsRef);
    };
  }, []);

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center w-full bg-base-100 p-2">
   
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <p className="p-2 text-2xl font-medium ">Edit</p>
            <div className="flex gap-5 mt-5 items-center place-content-center">
              <input type="text" className="input input-sm bg-base-200" placeholder="Product ID" value={selectedProduct?.id || ""} disabled />
              <input type="text" className="input input-sm bg-base-200" placeholder="Product Name"value={selectedProduct?.PRODUCT_NAME || ""} onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    PRODUCT_NAME: e.target.value,
                  }))
                }
              />

              <input type="text" className="input input-sm bg-base-200" placeholder="Price" value={selectedProduct?.PRODUCT_PRICE || ""} onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    PRODUCT_PRICE: e.target.value,
                  }))
                }
              />
            </div>

            <div className="modal-action">
              <button onClick={saveProductChanges} className="btn btn-sm btn-primary" >
                Save
              </button>
              <form method="dialog">
                <button className="btn btn-sm">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        <div className="flex flex-col gap-2 sm:flex-row w-full">

          
          <input type="text" placeholder="Product Name" value={ProductName} onChange={(e) => setProductName(e.target.value)} className="w-[300px] input input-sm bg-base-200 w-full sm:w-56" />
          <input type="number" placeholder="Product Price" value={ProductPrice} onChange={(e) => setProductPrice(e.target.value)} className="w-[100px] input input-sm w-full sm:w-36 bg-base-200" />
          <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleFileChange} className="input input-sm bg-base-200" />
          <button onClick={addProduct} className="btn btn-primary btn-sm">
            Add Product
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Products List</h3>
        <div className="flex flex-col">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="flex flex-col  sm:flex-row w-full  pl-2  pr-2 gap-2 items-center justify-between bg-base-200  my-1 rounded-md" >
                <span className="w-full sm:w-[200px] text-left ">ID: {product.id}</span>
                <span className="w-full sm:w-[200px] text-left">NAME:  {product.PRODUCT_NAME} </span>
                <span className="w-full sm:w-[200px] text-left">PRICE:  {product.PRODUCT_PRICE} </span>
                <span className="w-full sm:w-[200px] text-left">DATE ADDED: {new Date(product.PRODUCT_TIME_UPLOADED).toLocaleString()} </span>

                <div className="flex gap-1">
                  <button onClick={() => deleteProduct(product.id, product.IMAGE_URL)} className="btn btn-sm btn-error" >
                    Delete
                  </button>
                  <button onClick={() => handleEditClick(product)} className="btn btn-sm btn-info ml-5" >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
