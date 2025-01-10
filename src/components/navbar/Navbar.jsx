import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

export default function Navbar() {
  const [profileData, setProfileData] = useState({
    title: "",
    description: "",
    coverImage: "",
  });

  useEffect(() => {
    const db = getDatabase();
    const profileRef = ref(db, "profile/userProfile");

    const unsubscribe = onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfileData({
          title: data.TITLE || "", // Set to empty string if no title
          description: data.DESCRIPTION || "", // Set to empty string if no description
          coverImage: data.URL || "", // Set to empty string if no cover image URL
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Mobile View */}
      <div
        className="hero min-h-screen sm:hidden bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(https://res.cloudinary.com/dv8p1hpew/image/upload/v1736488955/ycivqhqkvdwxqpm3bvyt.png)` }}
      >
        <div className="hero-overlay bg-opacity-0"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md mt-56 items-center text-center place-content-center flex flex-col">
            {profileData.title && <p className="">{profileData.title}</p>}
            {profileData.description && <p className="">{profileData.description}</p>}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div
        className="hero min-h-screen hidden sm:block bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${profileData.coverImage})` }}
      >
        <div className="hero-overlay bg-opacity-0"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md mt-56 items-center text-center place-content-center flex flex-col">
            {profileData.title && <p className="">{profileData.title}</p>}
            {profileData.description && <p className="">{profileData.description}</p>}
          </div>
        </div>
      </div>
    </>
  );
}