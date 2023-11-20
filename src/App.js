import { Route, Routes, BrowserRouter } from "react-router-dom";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import Cookbook from "./components/Cookbook/Cookbook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecipeCard />} />
          <Route path="/cookbooks" element={<Cookbook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
