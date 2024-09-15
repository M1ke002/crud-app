import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BlogPage from "./components/BlogPage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" index element={<HomePage />} />
            <Route path="/:id" element={<BlogPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
