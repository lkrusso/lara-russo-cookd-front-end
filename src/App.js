import { Route, Routes, BrowserRouter } from "react-router-dom";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import Cookbook from "./components/Cookbook/Cookbook";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import AddCookbook from "./components/AddCookbook/AddCookbook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipes" element={<RecipeCard />} />
          <Route path="/recipes/add" element={<AddRecipe />} />
          <Route path="/cookbooks" element={<Cookbook />} />
          <Route path="/cookbooks/add" element={<AddCookbook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
