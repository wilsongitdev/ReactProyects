import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import GuardsMainView from "./components/GuardsMainView";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/guards" element={<GuardsMainView />} />
    </Routes>
  );
}

export default App;
