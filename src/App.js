import { Route, Routes, BrowserRouter } from "react-router-dom";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import AddCookbook from "./components/AddCookbook/AddCookbook";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import NavBar from "./components/NavBar/NavBar";
import "./App.scss";
import CookbookPage from "./pages/CookbookPage/CookbookPage";
import NotFound from "./pages/NotFound/NotFound";
import EditCookbook from "./components/EditCookbook/EditCookbook";
import DevelopmentPage from "./pages/DevelopmentPage/DevelopmentPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/:userID" element={<Dashboard />} />
          <Route path="/recipes/:id" element={<RecipeCard />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route path="/user/:userID/recipes/add" element={<AddRecipe />} />
          <Route path="/cookbooks/:id" element={<CookbookPage />} />
          <Route path="/user/:userID/cookbooks/add" element={<AddCookbook />} />
          <Route path="/cookbooks/:id/edit" element={<EditCookbook />} />
          <Route path="/workinprogress" element={<DevelopmentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
