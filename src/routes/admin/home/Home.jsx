import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [moto, setMoto] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const maxTitleLength = 50;
  const maxMotoLength = 200;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      // Read the file as a data URL (base64 string)
      reader.readAsDataURL(file);
    }
  };

  // Handle input change for title
  const handleTitleChange = (event) => {
    const value = event.target.value;
    if (value.length <= maxTitleLength) {
      setTitle(value); // Update the title if within limit
    }
  };

  // Handle input change for moto
  const handleMotoChange = (event) => {
    const value = event.target.value;
    if (value.length <= maxMotoLength) {
      setMoto(value); // Update the moto if within limit
    }
  };

  // Function to handle Edit button click
  const handleEditClick = () => {
    setIsEditable(true); // Enable the text areas for editing
  };

  // Function to handle Save button click
  const handleSaveClick = () => {
    setIsEditable(false); // Disable the text areas after saving
    // You can add any logic to save the data here (e.g., API call)
  };

  return (
    <>
      {image ? (
        <div className="mt-5 w-full h-[400px] items-center place-items-center bg-base-200">
          <img
            src={image}
            alt="Selected Cover"
            className="max-w-full h-auto rounded-lg shadow-lg h-full"
          />
        </div>
      ) : (
        <div className="mt-5 w-full h-[400px] items-center place-items-center bg-base-200"></div>
      )}
      <div className="cover flex flex-row p-5 gap-5 items-center place-content-center">
        <p className="text-lg">Change Cover</p>
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          className="file-input w-full max-w-xs bg-base-200"
          onChange={handleFileChange} // Trigger file change handler
        />
      </div>

      <div className="flex flex-col w-full place-content-center items-center gap-2 p-4">
        <p>Change Title</p>
        {!isEditable && (
          <div className="lg:tooltip lg:tooltip-right" data-tip="Click to Edit">
            <textarea
              className="textarea textarea-primary w-[300px]"
              placeholder={`Max ${maxTitleLength} characters`}
              value={title} // Controlled input
              onChange={handleTitleChange} // Trigger handleTitleChange on input
              disabled={!isEditable} // Disable textarea if not in edit mode
            />
          </div>
        )}
        {isEditable && (
          <textarea
            className="textarea textarea-primary w-[300px]"
            placeholder={`Max ${maxTitleLength} characters`}
            value={title} // Controlled input
            onChange={handleTitleChange} // Trigger handleTitleChange on input
            disabled={!isEditable} // Disable textarea if not in edit mode
          />
        )}
        <p className="text-sm">
          {maxTitleLength - title.length} characters remaining
        </p>{" "}
        {/* Dynamic character counter for title */}
        <p>Change Moto</p>
        {!isEditable && (
          <div className="lg:tooltip lg:tooltip-right" data-tip="Click to Edit">
            <textarea className="textarea textarea-primary w-[300px]" placeholder={`Max ${maxMotoLength} characters`} value={moto}  onChange={handleMotoChange} disabled={!isEditable} />
          </div>
        )}
        {isEditable && (
          <textarea className="textarea textarea-primary w-[300px]" placeholder={`Max ${maxMotoLength} characters`} value={moto} onChange={handleMotoChange}  disabled={!isEditable} />
        )}
        <p className="text-sm">
          {maxMotoLength - moto.length} characters remaining
        </p>{" "}
        {/* Dynamic character counter for moto */}
        <div className="flex flex-row gap-2">
          <button className="btn btn-md btn-neutral w-[100px]" onClick={handleEditClick} > Edit </button>
          <button className="btn btn-md btn-neutral w-[100px]" onClick={handleSaveClick} > Save </button>
        </div>
      </div>
    </>
  );
}
