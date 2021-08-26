import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Demo from "./Demo";
import { RootRoutes } from "./routes/Index";

function App() {
  return (
    <div className="App">
      <Navbar />
      <RootRoutes />
      {/* <Demo /> */}
    </div>
  );
}

export default App;
