import UserContext from './UserContext';
import UserProfile from './components/UserProfile';

function App() {
  const userData = { name: "Zakaria Zamoum", email: "zakaria@example.com" };

  return (
    <UserContext.Provider value={userData}>
      <UserProfile />
    </UserContext.Provider>
  );
}

export default App;