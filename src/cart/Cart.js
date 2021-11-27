import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TravelApi from "../api/api";
import CartItem from "./CartItem"
import UserContext from "../auth/UserContext";
import DropIn from "braintree-web-drop-in-react";
import BookingForms from "./BookingForms";
import Alert from "../common/Alert";



function Cart(){
    const history = useHistory();
    const {currentUser, cart, setCart} = useContext(UserContext);
    const [orderInfo, setOrderInfo] = useState('')
    const [values, setValues] = useState({clientToken:null,
                                          instance:''
    })
    const [formErrors, setFormErrors] = useState();
    
    
    
    
    useEffect(function getCartItemsOnMount(){
        search();
        getToken();

    }, [currentUser]);

    const {clientToken, instance}= values

    async function getToken() {
        let token = await TravelApi.getBrainToken()
        setValues({...values, clientToken:token.data})
    }

    

    async function search() {
        if(currentUser){
        let curUserCart = await TravelApi.getCartForUser(currentUser.username);
        setCart(curUserCart);
        }
    }

    async function deleteBooking(id) {
        let booking = await TravelApi.deleteBooking(id)
        search();
    }

    async function clearCart(evt){
        if(currentUser && cart){
        let bookingIds = cart.map(b=> b.booking_id);  
        let clearCart = await TravelApi.clearCart(bookingIds)
        search()
        }
    }

    function getTotal(){
        if (cart) {
          let  total = 0
          let  totalcount = cart.map(b => {
              total = total + (b.price_per_person*b.num_of_people)
          })
          
          return total
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setOrderInfo(value)
        if (orderInfo && orderInfo.length) {
            setFormErrors([])
        }
    }

    const onPurchase=()=> {
        if (orderInfo){
            console.log(orderInfo)
            instance.requestPaymentMethod().then(data=>{
                let total = getTotal()
                let transaction_id = ""
                let nonce=data.nonce;
                let paymentData={
                    payment_method_nonce:nonce,
                    amount:total
                }
                
                if (total>0){
                TravelApi.makePayment(paymentData).then(response=>{
                    if(response.data.success){
                    console.log("first part")    
                    transaction_id= response.data.transaction.id
                    let bookingsIds = cart.map(b=> b.booking_id);
                    let data = {
                        username:currentUser.username,
                        transaction_id: transaction_id,
                        bookingsIds: bookingsIds,
                        orderInfo: orderInfo
                    }
                    console.log(data)
                    TravelApi.processPayment(data).then(response=>{
                    console.log(response)
                    search()
                    history.push("/success");
                    })
                    
                    
                    }
                })
            } 
          })
        }else {
            setFormErrors(['Please enter travelers names'])
        }
        
    }


    if (!clientToken) return "Loading..."
    if (!cart || !cart.length) return "CART IS EMPTY"
    return (
        <div>
            <h1>Here will be cart <button className="btn btn-danger" onClick={clearCart}>Clear cart</button></h1>


            
                   <h2>Orders:</h2>
                   <table className="table table-dark">
                   <thead>
                        <tr>
                        
                        <th scope="col">Destination</th>
                        <th scope="col">Price per person</th>
                        <th scope="col">Number of people</th>
                        <th scope="col">Delete</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    {cart.map(b => (
                 <CartItem
                    key={b.booking_id}
                    booking_id={b.booking_id}
                    cart_id={b.cart_id}
                    trip_id={b.trip_id}
                    destination={b.destination}
                    price_per_person={b.price_per_person}
                    num_of_people = {b.num_of_people}
                    deleteBooking={deleteBooking}
                 />
             ))}
                     </tbody>
                  </table>
             
             <br/>
             <h2 className="text-center">Tolal: {getTotal()}$ </h2>
             
            <div className="container">
                <form className="was-validated">
                <div className="form-group">
                    <label>Enter every traveler first and last name</label>
                    <textarea className="form-control is-invalid" id="validationTextarea" placeholder="1. First name Last name..." onChange={handleChange} required></textarea>
                  </div>
                </form>
                </div> 
            <br/>
            <hr/>
            {formErrors && formErrors.length
                      ? <Alert type="danger" messages={formErrors} />
                      : null}
            <div className="container">
            <DropIn
            options={{authorization:clientToken}}
            onInstance= {(instance)=>setValues({...values, instance:instance})}
            />

            <button onClick={()=>{onPurchase()}}>Buy</button>
            </div>
        </div>
    )
}

export default Cart;