import { Route, Routes, BrowserRouter } from "react-router-dom";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import Cookbook from "./components/Cookbook/Cookbook";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import AddCookbook from "./components/AddCookbook/AddCookbook";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import NavBar from "./components/NavBar/NavBar";
import "./App.scss";
import CookbookPage from "./pages/CookbookPage/CookbookPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/user/:userID" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipes/:id" element={<RecipeCard />} />
          <Route
            path="/user/:userID/recipes/:id/edit"
            element={<EditRecipe />}
          />
          <Route path="/user/:userID/recipes/add" element={<AddRecipe />} />
          <Route path="/cookbooks/:id" element={<CookbookPage />} />
          <Route path="/user/:userID/cookbooks/add" element={<AddCookbook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
