import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProtectedRoute from "./routing/ProtectedRoute";
import Footer from "./components/Footer";
import { useAppSelector } from "./app/hook";
import Explore from "./pages/Explore";
import SearchBar from "./pages/SearchBar";

function App() {
    const { userToken } = useAppSelector((state) => state.auth);

    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/explore/search" element={<SearchBar />} />
                        <Route path="/:username" element={<Profile />} />
                    </Route>
                </Routes>
            </main>
            {userToken && <Footer />}
        </Router>
    );
}
export default App;
