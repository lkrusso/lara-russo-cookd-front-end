import { Route, Routes, BrowserRouter } from "react-router-dom";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import Cookbook from "./components/Cookbook/Cookbook";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/recipes" element={<RecipeCard />} />
          <Route path="/cookbooks" element={<Cookbook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
