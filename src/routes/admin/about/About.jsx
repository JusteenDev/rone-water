import { useEffect, useState } from "react";
import { getDatabase, ref, set, remove, onValue, off } from "firebase/database";

export default function About() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aboutData, setAboutData] = useState(null);
  const [selectedAbout, setSelectedAbout] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
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
      return result.data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const handleAboutSubmit = async () => {
    if (!title || !description) {
      alert("Please provide a title and description.");
      return;
    }

    let photoUrl = null;

    if (photo) {
      photoUrl = await uploadImage(photo);
      if (!photoUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    const timestamp = Date.now();
    const db = getDatabase();
    const aboutRef = ref(db, "ABOUT/" + timestamp);

    await set(aboutRef, {
      PHOTO_URL: photoUrl,
      TITLE: title,
      DESCRIPTION: description,
      POST_ID: timestamp,
    });

    alert("About section added/updated successfully!");
    setTitle("");
    setDescription("");
    setPhoto(null);
  };

  useEffect(() => {
    const fetchAboutData = () => {
      const db = getDatabase();
      const aboutRef = ref(db, "ABOUT/");
      onValue(aboutRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const aboutList = Object.keys(data).map((id) => ({
            id,
            ...data[id],
          }));
          setAboutData(aboutList);
        } else {
          setAboutData([]);
          console.log("No about data found.");
        }
      });
    };

    fetchAboutData();
    return () => {
      const db = getDatabase();
      const aboutRef = ref(db, "ABOUT/");
      off(aboutRef);
    };
  }, []);

  const handleEditClick = (about) => {
    setSelectedAbout(about);
    setTitle(about.TITLE);
    setDescription(about.DESCRIPTION);
    document.getElementById("my_modal_4").showModal();
  };

  const deleteAbout = async (aboutId, photoUrl) => {
    const db = getDatabase();
    const aboutRef = ref(db, "ABOUT/" + aboutId);
    try {
      await remove(aboutRef);
      if (photoUrl) {
        const deleteImage = await fetch(
          "https://server-n991.onrender.com/delete-image",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: photoUrl }),
          }
        );
        if (!deleteImage.ok) {
          throw new Error("Error deleting image");
        }
      }
      alert("About section deleted successfully!");
    } catch (error) {
      console.error("Error deleting about section:", error);
    }
  };

  const saveAboutChanges = async () => {
    if (!selectedAbout) return;
    const updatedAbout = {
      PHOTO_URL: selectedAbout.PHOTO_URL,
      TITLE: title,
      DESCRIPTION: description,
    };
    const db = getDatabase();
    const aboutRef = ref(db, "ABOUT/" + selectedAbout.id);
    try {
      await set(aboutRef, updatedAbout);
      alert("About section updated successfully!");
      setSelectedAbout(null);
    } catch (error) {
      console.error("Error updating about section:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-center place-content-center">
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-full max-w-2xl p-4">
          <p className="text-2xl font-semibold text-center">Edit About Section</p>
          <div className="mt-4">
            <input
              type="text"
              className="input input-sm bg-base-200 w-full mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="textarea textarea-sm bg-base-200 w-full mb-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-action flex justify-between">
            <button
              onClick={saveAboutChanges}
              className="btn btn-sm btn-primary"
            >
              Save
            </button>
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="flex flex-col gap-1 sm:w-80">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-sm bg-base-200 "
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-sm bg-base-200"
        />
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleFileChange}
          className="file-input file-input-sm bg-base-200  "
        />
        <button onClick={handleAboutSubmit} className="btn btn-primary mt-1">
          Add About Section
        </button>
      </div>

      <div className="sm:w-80 mt-8  items-center place-content-center">
        <div className="flex flex-col sm:flex-col gap-1 mt-4">
          {aboutData && aboutData.length > 0 ? (
            aboutData.map((about) => (
              <div
                key={about.id}
                className="card bg-base-100 shadow-lg p-4 flex flex-col justify-between rounded-lg"
              >
                {about.PHOTO_URL && (
                  <img
                    src={about.PHOTO_URL}
                    alt="About section"
                    className="w-full object-cover rounded-md mb-4"
                  />
                )}
                <h4 className="font-semibold text-lg">{about.TITLE}</h4>
                <p className="text-sm text-justify">{about.DESCRIPTION}</p>
                <div className="flex gap-2 mt-4 items-center place-content-center">
                  <button
                    onClick={() => deleteAbout(about.id, about.PHOTO_URL)}
                    className="btn btn-sm btn-error w-24"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(about)}
                    className="btn btn-sm btn-info w-24"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No about sections available.</p>
          )}
        </div>
      </div>
    </div>
  );
}