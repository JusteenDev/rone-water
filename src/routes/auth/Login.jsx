import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/admin"); // If logged in, redirect to admin page
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/admin');
        alert(`Login successful! Welcome, ${user.displayName || "User"}.`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Show error message in an alert
        alert(`Login failed: ${errorMessage}`);
      });
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <div className="items-center place-content-center w-full max-w-sm p-4 bg-base-100 sm:bg-base-300 flex flex-col gap-2 text-center text-blue-600">
        <p className="text-2xl font-extrabold">Admin Login</p>
        <input
          type="email"
          className="input input-md sm:input-md w-[300px] sm:w-full bg-base-300 sm:bg-base-100"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input input-nd sm:input-md w-[300px] sm:w-full bg-base-300 sm:bg-base-100"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary btn-md w-[300px] sm:w-full " onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}