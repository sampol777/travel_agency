import React, { useEffect, useState, useContext } from "react";
import TravelApi from "../api/api";
import UserContext from "../auth/UserContext";
import DestinationCard from "../destinations/DestinationCard";
import OrderItem from "./OrderItem";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";


function Profile () {
    const history = useHistory();
    const {currentUser, logout} = useContext(UserContext)
    const [orders, setOrders] = useState(null)
    const [trips, setTrips] = useState(null)
    useEffect(()=> {
        async function getOrdersOnMount(){
        if(currentUser && currentUser.role === "user"){
            let userOrders = await TravelApi.getOrdersUser(currentUser.username);
            setOrders(userOrders);
        }else if(currentUser && currentUser.role === "partner"){
          const partnerOrders = await TravelApi.getOrdersPartner(currentUser.username)
          const partnerTrips = await TravelApi.getPartnerTrips(currentUser.username)
          setOrders(partnerOrders);
          setTrips(partnerTrips)
        }
    }
    getOrdersOnMount()
},[currentUser]);


async function search() {
    if(currentUser){
    let curUserCart = await TravelApi.getPartnerTrips(currentUser.username);
    setTrips(curUserCart);
    }
}

async function removeUser(evt){
    if(currentUser) {
    console.log(currentUser.username)    
    let remove = await TravelApi.removeCurrentUser(currentUser.username)
    logout()
    history.push("/");
    }
}

if (!currentUser) return "Loading..."
    return (
        <div>
            <h1 className="text-center">Here's profile: {currentUser.username}  
                <button onClick={removeUser} className="btn btn-danger ml-2">Delete profile</button>
            </h1>
            {!orders || !orders.length
               ? <h2>No orders</h2>
               : <div>
                   <h2>Orders:</h2>
                   <table className="table table-dark">
                   <thead>
                        <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Destination</th>
                        {currentUser.role==="user"
                        ?<th scope="col">Partnername</th>
                        :<th scope="col">Username</th>}
                        </tr>
                    </thead>
                    <tbody>
                       {orders.map((o,index)=>(
                    <OrderItem
                      key={index}
                      orderId={o.order_id}
                      destination={o.destination}
                      username={o.o_username}
                      partnername={o.partnername}
                      role={currentUser.role}
                    />
                     ))}
                     </tbody>
                  </table>
            </div>}
            <br/>
            <hr/>
            <br/>
            {currentUser.role==="partner"
            
            ?<div>
                
                <h2 className="text-center">Trips  <Link className="btn btn-primary font-weight-bold ml-5"
                          to="/new-trip-form">
                      Add new trip
                </Link></h2>
                {trips && trips.length
            ? (
                <div className="destinations-list d-flex justify-content-around  flex-wrap p-5 mt-3">
                  {trips.map((c , index) => (
                        
                      <DestinationCard
                          key={index}
                          id={c.id}
                          name={c.destination}
                          partnername= {c.partnername}
                          imageUrl={c.image_url}
                          pricePP={c.pricePP}
                          numberOfNights={c.numOfNights}
                          checkIn={c.check_in}
                          checkOut={c.check_out}
                          setTrips={search}
                      />
                      
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
            
            </div>
            : ""}
        </div>

    )
}

export default Profile;