/*
  BrowserRouter
  What BrowserRouter does under the hood is that it's a ContextProvider!
  It provides context to all of its children components

  So in order to give our app the power of routing in its functionality, 
  we need to wrap everything inside of the App component inside of BrowserRouter

  Route
  A Route is part of your URL that specifies where you are on your website

  For example, example.com/ is your home page and its route is "/" and
  example.com/about is your about page and its route is "/about"
*/
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans";
import VanDetail from "./pages/VanDetail";

function App() {
    return (
        <BrowserRouter>
            <header>
                <NavLink className="site-logo" to="/">
                    #VanLife
                </NavLink>
                <nav>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/vans">Vans</NavLink>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/vans" element={<Vans />} />
                <Route path="/vans/:vanId" element={<VanDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
