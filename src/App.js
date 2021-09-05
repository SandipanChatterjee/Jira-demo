import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { RootRoutes } from "./routes/Index";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div>
        <RootRoutes />
      </div>
    </div>
  );
}

export default App;
