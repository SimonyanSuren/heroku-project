import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import { SignUp } from "./pages/SignUp/SignUp";
import { Login } from "./pages/Login/Login";
import MyPosts from "./pages/MyPosts/MyPosts";
import Author from "./pages/Author/Author";
import Favorites from "./pages/Favorites/Favorites";
import UserAccount from "./pages/UserAccount/UserAccount";
import useFetch from "./hooks/useFetch";
import getData from "./services/api/getData.api";
import currentUserSlice from "./store/currentUser";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch()
  const { setUser } = currentUserSlice.actions;
  const [users] = useFetch("http://localhost:8000/api/v1/user/getAll");
  if (localStorage.getItem("token")) {
    getData("http://localhost:8000/api/v1/user/get").then((data) => {
      dispatch(setUser(data));
    });
  }

  return (
    <Router>
      <div className="main-container">
        <main className="main">
          <Routes>
            <Route path="/" element={<Home users={users} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myposts" element={<MyPosts users={users} />} />
            <Route path="/author" element={<Author users={users} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/:id" element={<UserAccount />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
