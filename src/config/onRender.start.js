import axios from "axios";

const serverURL = "https://server-n991.onrender.com";

const checkServerAwake = async () => {
  let isAwake = false;
  console.log("Checking if server is awake...");

  while (!isAwake) {
    try {
      const response = await axios.get(serverURL);
      if (response.status === 200) {
        console.log("Server is awake!");
        isAwake = true;
      }
    } catch (error) {
      console.log("Server is still sleeping, retrying in 10 seconds...");
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds before retrying
    }
  }

  return isAwake;
};

const sendDataToAwakeRoute = async (data) => {
  try {
    const response = await axios.get(`${serverURL}/awake/${data}`);
    if (response.status === 200) {
      console.log(`[CLIENT] Data sent successfully: ${data}`);
    }
  } catch (error) {
    console.error(`[CLIENT] Error sending data: ${error.message}`);
  }
};

(async () => {
  try {
    await checkServerAwake();
    console.log("Now you can use the server.");
    sendDataToAwakeRoute("HelloServer");
  } catch (error) {
    console.error("Error while connecting to the server:", error.message);
  }
})();