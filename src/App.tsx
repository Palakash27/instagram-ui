import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProtectedRoute from "./routing/ProtectedRoute";
import Footer from "./components/Footer";
import { useAppSelector } from "./app/hook";

function App() {
    const { userToken } = useAppSelector((state) => state.auth);

    return (
        <Router>
            {userToken && <Header />}
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/user-profile" element={<Profile />} />
                    </Route>
                </Routes>
            </main>
            {userToken && <Footer />}
        </Router>
    );
}
export default App;
