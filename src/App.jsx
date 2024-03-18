import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "./context/ThemeContext";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/footer/Footer";
import Article from "./pages/Article";
import AddArticle from "./pages/AddArticle";
import Dashboard from "./pages/Dashboard";
import EditArticle from "./pages/EditArticle";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Error from "./pages/Error";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme} `}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/edit-article/:id" element={<EditArticle />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
