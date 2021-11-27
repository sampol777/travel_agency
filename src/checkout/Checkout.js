import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TravelApi from "../api/api";
import UserContext from "../auth/UserContext";
import DropIn from "braintree-web-drop-in-react";


function Checkout(){
    const history = useHistory();
    const {currentUser, cart} = useContext(UserContext);
    const [values, setValues] = useState({clientToken:null,
                                          instance:''
    })

    useEffect(function getCartItemsOnMount(){
        getToken();
    }, [currentUser]);

    const {clientToken, instance}= values

    async function getToken() {
        let token = await TravelApi.getBrainToken()
        setValues({...values, clientToken:token.data})
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

    const onPurchase=()=> {
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
                      bookingsIds: bookingsIds
                  }
                  console.log(data)
                  TravelApi.processPayment(data).then(response=>{
                  console.log(response)
                  history.push("/success");
                  })
                  
                  
                  }
              })
          }
        })
    }
    
    if (!clientToken) return "Loading..."
    if (!cart || !cart.length) return "CART IS EMPTY"
    return (
        <div>
            <h2 className="text-center">Tolal: {getTotal()}$ </h2>
            <br/>
            <hr/>
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

export default Checkout;