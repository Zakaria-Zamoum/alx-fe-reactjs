import { useState } from "react";

// Simple custom hook to simulate authentication
const useAuth = () => {
  // Change this to true to simulate a logged-in user
  const [isAuthenticated] = useState(false);

  return { isAuthenticated };
};

export default useAuth;