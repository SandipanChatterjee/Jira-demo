import logo from "./logo.svg";
import "./App.css";
import { RootRoutes } from "./routes/Index";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <RootRoutes />
    </div>
  );
}

export default App;
