import React from "react";
import { Link ,useLocation ,useNavigate } from "react-router-dom";
 
const Navbar = () => {
  let nevigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem('token');
    nevigate("/login");
  }
      let location = useLocation();     
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">  
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            inotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active" : "" }`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"? "active" : "" }`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
              <Link className={`btn btn-outline-primary mx-2 ${location.pathname==="/login"? "active" : "" }`} to="/login">Login</Link>
              <Link className={`btn btn-outline-primary ${location.pathname==="/signup"? "active" : "" }`} to="/signup">Signup</Link>
              </form>: <button className="btn btn-outline-primary" onClick={handlelogout} >Logout</button>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
