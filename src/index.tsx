import React from "react";
import ReactDOM from "react-dom/client";
import { FirebaseProvider } from "./context/FirebaseContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./assets/design/reset.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <FirebaseProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </FirebaseProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
