import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { RootRoutes } from "./routes/Index";
import { authenticate } from "./actions/guestAccount";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "./components/shared/loader/Loader";
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authenticateReducer.token);
  const previouslyStoredToken = localStorage.getItem("token");

  useEffect(() => {
    if (!previouslyStoredToken) {
      dispatch(authenticate());
    }
  }, []);

  const renderRootRoutes = () => {
    return (
      <div>
        {!previouslyStoredToken ? (
          !token ? (
            // <span>Authenticating...</span>
            <div className="loaderContainer">
              <Loader />
            </div>
          ) : (
            <RootRoutes />
          )
        ) : (
          <RootRoutes />
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      {renderRootRoutes()}
    </div>
  );
}

export default App;
