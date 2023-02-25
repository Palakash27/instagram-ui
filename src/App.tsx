import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProtectedRoute from "./routing/ProtectedRoute";

function App() {
    return (
        <Router>
            <Header />
            <main className="container content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/user-profile" element={<Profile />} />
                    </Route>
                </Routes>
            </main>
        </Router>
    );
}
export default App;
