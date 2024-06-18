import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import makeServer from "./mirage/server.js";

const environment = process.env.NODE_ENV;

/*
    Initialize MirageJS Mock Server

    NOTE:
    You shouldn't use this server in production, you should actually call from a database
    to update and retrieve data

    This is just for practice though, the if-statement without the "true" is the check you
    should make
*/
if (true || environment !== "production") {
    makeServer({ environment });
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
