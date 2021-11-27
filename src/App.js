import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage.js";
import UserContext from "./auth/UserContext";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import jwt from "jsonwebtoken";
import TravelApi from "./api/api";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [cart, setCart] = useState(null)
  
  useEffect(function loadUserInfo(){
    async function getCurrentUser() {
      if (token) {
        try {
          let {username} = jwt.decode(token);
          
          TravelApi.token = token;
          let currentUser = await TravelApi.getCurrentUser(username);
          if (currentUser.role === "user"){
          let curUserCart = await TravelApi.getCartForUser(username);
          console.log(curUserCart)
          setCart(curUserCart);
          }
          setCurrentUser(currentUser);
          
          
          
          console.log(currentUser)
        } catch (err) {
          console.error("app loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }

    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Signup */

  async function signup(signupData) {
    try {
      let token = await TravelApi.signup(signupData);
      setToken(token);
      return {success:true};
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** LogIn */

  async function login(loginData) {
    try {
      let token = await TravelApi.login(loginData);
      setToken(token);
      return {success:true};
    }catch(errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  

  
  

  return (
    <BrowserRouter>
    <UserContext.Provider
        value={{ currentUser,setCurrentUser, cart, setCart, logout}}>
   <div className="App">
     <Navigation  logout={logout}/>
     <Routes login={login} signup={signup} cart={cart}/>
   </div>
   </UserContext.Provider>
   </BrowserRouter>
  );
}

export default App;
