import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import Homepage from "../homepage/Homepage";
import Mainpage from "../mainpage/Mainpage";
import Cart from "../cart/Cart";
import Profile from "../profile/Profile";
import NewTripForm from "../profile/NewTripForm";
import SuccessPage from "../cart/SuccessPage";
import Checkout from "../checkout/Checkout";


function Routes({login, signup, cart}) {
    return (
        <div className="pt-5">
           <Switch>

             <Route exact path="/">
                 <Homepage/>
             </Route> 

             <Route exact path="/mainpage">
                 <Mainpage/>
             </Route>

             <Route exact path="/cart">
                 <Cart cart={cart}/>
             </Route>

             <Route exact path="/profile">
                 <Profile/>
             </Route>

             <Route exact path="/login">
                 <LoginForm login={login}/>
             </Route>

             <Route exact path="/signup">
                <SignupForm signup={signup}/>
             </Route>

             <Route exact path="/new-trip-form">
                <NewTripForm/>
             </Route>

             <Route exact path="/checkout">
                <Checkout/>
             </Route>

             <Route exact path="/success">
                <SuccessPage/>
             </Route>

            </Switch> 
        </div> 
    )
}

export default Routes;