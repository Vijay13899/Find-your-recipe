import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail";
import "./styles.css";
import Saved from "./components/Saved";
import Browse from "./components/Browse";
import Header from "./components/Header";
import { SavedRecipesProvider } from "./SavedRecipesContext";
import Home from "./components/Home";
import Footer from "./components/Footer";

export default function App() {
  return (
    <SavedRecipesProvider>
      <Header />
      <main className="home">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </main>
      <Footer />
    </SavedRecipesProvider>
  );
}
