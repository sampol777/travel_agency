import React, {useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./DestinationCard.css"
import UserContext from "../auth/UserContext";
import TravelApi from "../api/api";


function DestinationCard ({id, name, numberOfNights, imageUrl, pricePP, checkIn,checkOut, setTrips}) {
  const {currentUser, setCart} = useContext(UserContext)
  const [formData, setFormData] = useState({
    numberOfPeople:1
});
const history = useHistory();

function handleChange(evt) {
  const { value } = evt.target;
  setFormData(l => ({ ...l, ["numberOfPeople"]: Number(value) }));
}
  
  if (!currentUser) return ("wait")
  let cartID=currentUser['cart_id']
  
  const data = {
    trip_id:id,
    cart_id:cartID,
    num_of_people:formData.numberOfPeople
  }
  async function handleAddToCart(evt) {
      evt.preventDefault()
      await TravelApi.addToCart(data);
      setCart(await TravelApi.getCartForUser(currentUser.username))

  }

  function handleSelectNumOfPeople(evt) {
    return (<select onChange={handleChange}><option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
            </select>)
  }

  async function removeTrip(evt){
    evt.preventDefault()
    
    await TravelApi.removeTrip(data.trip_id)
    console.log(data.trip_id)
    setTrips()  
  }


    return (
        <div className="destinationCard card" to={`/destinations/${name}`}>
            
                              <img className="card-img-top card-image"    src={`${imageUrl}`} alt="Card"/>
                              <div className="card-body px-2">
                                <h6>{name}</h6>
                                <p className="card-text" >check-in:{checkIn}</p>
                                <p className="card-text" >check-out:{checkOut}</p>
                                <p className="card-text"><small className="text-muted">
                                   number of nights {numberOfNights}</small>
                                  <span className="d-block"></span>
                                  {window.location.href.indexOf("profile") > -1
                                  ?""
                                  :<span className="float-left"> Number of people:{handleSelectNumOfPeople()}
                                     </span>
                                  }   
                                  <span className="float-left"> Price per person:
                                    {pricePP}$ </span>

                                    {window.location.href.indexOf("profile") > -1 && currentUser.role === "partner"
                                    ?<button onClick={removeTrip}
                                    className="btn btn-danger font-weight-bold text-uppercase float-right"
                                    
                                    
                                >Delete</button>                            
                                    :""}
                                    {currentUser.role==="user"
                                     ?<button
                                     className="btn btn-danger font-weight-bold text-uppercase float-right"
                                     onClick={handleAddToCart}
                                     
                                 >Add to cart</button>
                                  :""}
                                  </p>
                              </div>
                            
        </div>
    )
}

export default DestinationCard;