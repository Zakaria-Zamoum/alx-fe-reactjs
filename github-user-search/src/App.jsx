import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import { fetchUser } from "./services/githubApi";

function App() {
  const [user, setUser] = useState(null);

  const handleSearch = async (username) => {
    const data = await fetchUser(username);
    setUser(data);
  };

  return (
    <div>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      <UserCard user={user} />
    </div>
  );
}

export default App;