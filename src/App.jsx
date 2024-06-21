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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans";
import VanDetail from "./pages/VanDetail";
import Layout from "./layouts/Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*
                    When we have a layout that we're passing in as a route defintion, React Router
                    provides us with a special tool that can render the layout and also tell it
                    exactly where to render which ever route that currently matches the URL

                    React Router notices that this route doesn't have a path, so it will always
                    match with whatever URL we're currently at and render the <Layout> component

                    But when it renders the <Layout> component, if we don't have someway to tell it
                    to put the rest of the matching child routes, it doesn't know where it should go
                    with respect ot the <Layout> component

                    Therefore, in the <Layout> component, we add the <Outlet> component to tell
                    React Router where to put the child route elements with respect to the <Layout>
                    component
                */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/vans" element={<Vans />} />
                    <Route path="/vans/:vanId" element={<VanDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
