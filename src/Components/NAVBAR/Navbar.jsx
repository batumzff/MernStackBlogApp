import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo-2.png";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import SideBar from "../SIDEBAR/SideBar";
import { useSelector } from "react-redux";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import NavbarStyle from "./Navbar.module.scss";

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { logout, login } = useAuthCalls();
  const [sidebar, setSidebar] = useState(false);
  const sideRef = useRef();
  const avatarRef = useRef(null);
  //   console.log(sidebar);
  // console.log(user);

  const handleSidebar = (e) => {
    setSidebar((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideRef.current &&
        !sideRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setSidebar(false);
      }
    };

    if (sidebar) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  return (
    <header className={NavbarStyle.header}>
      <nav className={NavbarStyle.nav}>
        <section className={NavbarStyle.logo}>
          <Link to="/">
            <img src={logo} alt="logo" width="150px" />
          </Link>
          <span>Illuminate Your Thoughts</span>
        </section>
        <section>
          <main className={NavbarStyle.links}>
            <Link to="/blogs">Blogs</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            {/* <Link to=""></Link> */}
          </main>
        </section>
        <section className={NavbarStyle.avatar}>
          <div onClick={handleSidebar} ref={avatarRef} data-test="avatar">
            <Avatar
              size="50"
              src={
                (Array.isArray(user?.image) && user?.image[0]) ||
                "https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_640.png"
              }
              round=".8rem"
            />
          </div>
        </section>
      </nav>
      {sidebar && (
        <div className={NavbarStyle.sidebar} ref={sideRef}>
          <SideBar onClose={setSidebar} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
