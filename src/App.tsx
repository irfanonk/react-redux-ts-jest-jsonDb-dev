import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Items from "./pages/Items/Items";

function App() {
  return (
    <div className="App">
      <Items />
    </div>
  );
}

export default App;
