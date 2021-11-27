import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";


function Homepage() {
    const {currentUser} = useContext(UserContext);
    
    return ( 
        <div className="Homepage">
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">Travel agency</h1>
          <p className="lead">All best trips in one, convenient place.</p>
          {currentUser
              ? 
              <div><h2>
              Welcome Back, {currentUser.firstName || currentUser.username}!</h2>
                <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/mainpage">
                      Let's GOOOO!
                </Link>
              </div>
              

              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </div> 
    )
}

export default Homepage;