import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { RootRoutes } from "./routes/Index";

function App() {
  return (
    <div className="App">
      <Navbar />
      <RootRoutes />
    </div>
  );
}

export default App;
