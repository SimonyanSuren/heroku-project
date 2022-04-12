import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import "./DropDown.css";

import useOutsideClick from "../../../hooks/useOutsideClick";

const DropDown: FunctionComponent<any> = ({
  open,
  children,
  toggleDropDown,
  className,
  width,
}) => {
  const dropdownRef: MutableRefObject<null | HTMLDivElement> = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useOutsideClick(false, dropdownRef);

  useEffect(() => {
    open = dropdownOpen;
    toggleDropDown && toggleDropDown();
  }, [dropdownOpen]);

  return (
    <aside
      className={`acc-view ${className} ` + (open ? "" : "d-none")}
      ref={dropdownRef}
    >
      {children}
    </aside>
  );
};

export default DropDown;
