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
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./layouts/HostLayout";

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
                    <Route index element={<Home />} />
                    <Route path="/host" element={<HostLayout />}>
                        {/*
                            Index routes are used to display elements in the outlet of the Layout component
                            which is the same route where the layout is defined at

                            Basically, they're the  default component that fills up the <Outlet> componet in the layout
                            when the route matches "/host"

                            NOTE:
                            The reason why we can't use path="/" is because React Router views it as an absolute path
                        */}
                        <Route index element={<Dashboard />} />
                        {/*
                            NOTE:
                            If we have a slash at the beginning of the path, React Router treats it as an absolute path
                            It should really but used for and dedicated to the home page
                            
                            If we don't have a slash in the beginning of the path, React Router treats it as a relative path
                            which is RELATIVE to the parent route - it appends the relative path on to the parent route
                        */}
                        <Route path="income" element={<Income />} />
                        <Route path="reviews" element={<Reviews />} />
                    </Route>
                    <Route path="/about" element={<About />} />
                    {/*
                        NOTE:
                        we shouldn't nest the routes for "/vans" like this:

                        <Route path="/vans">
                            <Route index element={<Vans />} />
                            <Route path=":vanId" element={<VanDetail />} />
                        </Route>

                        This is because none of these pages are sharing ui elements, there isn't necessarily a reason to
                        nest a route for just the ":vanId" portion inside a nested route for vans

                        Doing so would create a route with a path but no element, because as soon as we put an element in
                        a parent route which needs to include an <Outlet> and because they're not sharing any UI, that
                        parent component would be a layout route that only has <Outlet> and we end up with a whole extra
                        component that isn't doing anything
                    */}
                    <Route path="vans" element={<Vans />} />
                    <Route path="vans/:vanId" element={<VanDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
