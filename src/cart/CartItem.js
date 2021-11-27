import React from "react";


function CartItem({cart_id, booking_id, destination, trip_id, price_per_person,num_of_people, deleteBooking}) {

    async function handleDelete(evt) {
        deleteBooking(booking_id)
    }

    return (

    <tr>  
      <td>{destination}</td>
      <td>{price_per_person}$</td>
      <td>{num_of_people}</td>
      <td><button onClick={handleDelete}>Delete</button></td>
    </tr>
     
    )
}

export default CartItem;