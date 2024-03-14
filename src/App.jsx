import Header from "./components/Header/Header";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  return (
    <div className="container">
      <Header />
    </div>
  );
}

export default App;
