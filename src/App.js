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

  /*const renderAuth = () => {
    if (!previouslyStoredToken) {
      if (!token) {
        return <span>Authenticating...</span>;
      }
    }
  };*/

  const renderRootRoutes = () => {
    return (
      <div>
        {!previouslyStoredToken ? (
          !token ? (
            // <span>Authenticating...</span>
            <span>
              <Loader />{" "}
            </span>
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
