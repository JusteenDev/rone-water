import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";

export default function Profile() {
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imgId, setImgId] = useState("");
  const db = getDatabase();

  const handleFileChange = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (coverImage) {
      if (imgId) {
        await deleteImage(imgId);
      }

      const formData = new FormData();
      formData.append("file", coverImage);

      try {
        const response = await fetch("https://server-n991.onrender.com/upload", 
        { method: "POST", body: formData });
        const result = await response.json();
        const uploadedImageUrl = result.data.secure_url;
        const newImgId = result.data.public_id;
        
        
        await set(ref(db, "profile/userProfile"), { 
          URL: uploadedImageUrl, 
          TITLE: title || "", 
          DESCRIPTION: description || "",
          IMG_ID: newImgId
        });

        setImageUrl(uploadedImageUrl);
        setImgId(newImgId);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image.");
      }
    }
  };

  const deleteImage = async (publicId) => {
    try {
      const response = await fetch(`https://server-n991.onrender.com/delete/${publicId}`, 
      { method: "DELETE" });
      const result = await response.json();
      if (result.message === "Image deleted successfully") {
        console.log("Image deleted successfully");
        setImageUrl("");
        setImgId("");
      } else {
        console.error("Error deleting image:", result.error);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    const profileRef = ref(db, "profile/userProfile");
    const unsubscribe = onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.URL) {
        setImageUrl(data.URL);
        setImgId(data.IMG_ID);
      }
    });
    return () => unsubscribe();
  }, [db]);

  return (
    <div className="p-2 flex flex-col items-center place-content-center">
      {imageUrl && (
        <img src={imageUrl} alt="Cover" className="w-full max-w-[500px] h-[200px]" />
      )}
      <div className="w-full sm:w-[340px] bg-base-200 p-1 flex flex-col gap-2 items-center place-content-center">
        <label className="form-control w-full max-w-xs">
          <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} />
        </label>
        <input type="text" className="input input-bordered w-full max-w-xs text-sm" placeholder="Cover Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea cols="20" rows="5" className="textarea textarea-bordered h-20 w-full resize-none" placeholder="Cover Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="btn btn-md w-full btn-primary btn-sm" onClick={handleUpload}> {imgId ? "Change" : "Upload"} Image </button>
      </div>
    </div>
  );
}