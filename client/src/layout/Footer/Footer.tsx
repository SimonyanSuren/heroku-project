import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { currentUserSel } from "../../store/currentUser";
import "./Footer.css"

export default function Footer() {
  const user = useSelector(currentUserSel.currentUserSelector);
  return <footer className="main-footer">{user && <NavBar />}</footer>;
}
