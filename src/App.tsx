import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route exact path="/login" element={<Login />} /> */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
