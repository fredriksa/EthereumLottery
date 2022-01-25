import React from "react";

import "./App.css";

import PrimaryAppBarComponent from "./components/PrimaryAppBarComponent";
import FrontPage from "./pages/FrontPage";

function App() {
  return (
    <React.Fragment>
      <PrimaryAppBarComponent />
      <FrontPage />
    </React.Fragment>
  );
}

export default App;
