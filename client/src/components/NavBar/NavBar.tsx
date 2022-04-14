import { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../constants/navbarItems.constant";
import * as icons from "../../assets/icon";

export default function NavBar() {
  const [selected, setSelected] = useState([false, false, false, false]);

  const handleSelected = (id: number) => () => {
    const items = selected.map((item, index) => {
      return index === id ? true : false;
    });
    setSelected(items);
  };

  return (
    <>
      {navItems.map((item, index) => (
        <li
          className={`main-nav__primary-item ${
            selected[index + 1] && "main-nav__primary-item--selected"
          }`}
        >
          <Link to={item.path} onClick={handleSelected(index + 1)}>
            <span className="header-icon">{icons[item.icon]()}</span>
            <span>{item.description}</span>
          </Link>
        </li>
      ))}
    </>
  );
}
