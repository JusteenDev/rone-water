import { useState, useEffect } from "react";
import { getDatabase, ref, set, get, child } from "firebase/database"; // Import Firebase Database SDK

export default function Home() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [moto, setMoto] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const maxTitleLength = 50;
  const maxMotoLength = 200;

  const db = getDatabase(); // Initialize the Firebase Database

  useEffect(() => {
    // Fetch existing data from Firebase on component load
    const fetchData = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "home"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setImage(data.coverUrl || null);
          setTitle(data.title || "");
          setMoto(data.moto || "");
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [db]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result); // Set the image preview
      };

      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    if (value.length <= maxTitleLength) {
      setTitle(value);
    }
  };

  const handleMotoChange = (event) => {
    const value = event.target.value;
    if (value.length <= maxMotoLength) {
      setMoto(value);
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = async () => {
    if (!image || !title || !moto) {
      alert("Please provide all fields before saving.");
      return;
    }

    try {
      // Upload image to the server
      const response = await fetch("https://server-n991.onrender.com/upload", {
        method: "POST",
        body: JSON.stringify({ file: image }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const { url: imageUrl } = await response.json(); // Assuming API returns { url: "uploaded_image_url" }

      // Save data to Firebase Realtime Database
      const userData = {
        coverUrl: imageUrl,
        title,
        moto,
      };

      await set(ref(db, "home"), userData); // Save to /home path in Firebase
      alert("Data saved successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-8 lg:px-16">
      {image ? (
        <div className="mt-5 w-full md:w-3/4 lg:w-1/2 h-[300px] md:h-[400px] bg-base-100 rounded-lg shadow-lg flex items-center justify-center">
          <img
            src={image}
            alt="Selected Cover"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="mt-5 w-full md:w-3/4 lg:w-1/2 h-[300px] md:h-[400px] bg-base-100 rounded-lg shadow-lg flex items-center justify-center"></div>
      )}

      <div className="flex flex-col md:flex-row md:gap-5 mt-5 items-center w-full md:w-3/4 lg:w-1/2">
        <p className="text-lg mb-2 md:mb-0">Change Cover</p>
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          className="file-input w-full md:w-auto max-w-xs bg-base-200"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 items-center mt-5 gap-4">
        <div className="w-full">
          <p className="text-center mb-2">Change Title</p>
          <textarea
            className="textarea textarea-primary w-full"
            placeholder={`Max ${maxTitleLength} characters`}
            value={title}
            onChange={handleTitleChange}
            disabled={!isEditable}
          />
          <p className="text-sm text-right">
            {maxTitleLength - title.length} characters remaining
          </p>
        </div>

        <div className="w-full">
          <p className="text-center mb-2">Change Moto</p>
          <textarea
            className="textarea textarea-primary w-full"
            placeholder={`Max ${maxMotoLength} characters`}
            value={moto}
            onChange={handleMotoChange}
            disabled={!isEditable}
          />
          <p className="text-sm text-right">
            {maxMotoLength - moto.length} characters remaining
          </p>
        </div>

        <div className="flex flex-row gap-4 w-full justify-center">
          <button
            className="btn btn-md btn-neutral w-[120px] md:w-[150px]"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="btn btn-md btn-neutral w-[120px] md:w-[150px]"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

