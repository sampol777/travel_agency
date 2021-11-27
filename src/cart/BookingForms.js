import React, { useState, useEffect } from "react";
import TravelerForm from "./TravelerForm";

function BookingForms({num_of_people, destination, addTravelerInfo, booking_id}) {
    const arr=[]
    function createArray() {
       let i=0
       while(i<num_of_people){
           arr.push(i)
           i++
       }
    }
    createArray();
    console.log(arr)
    if(!arr.length) return "noooooo"
    return (
        <div className="d-flex justify-content-start">
         
            
        {arr.map(b=>(
            <div>
            <h2 className="text-center">booking:{booking_id} {destination} traveler: {arr.indexOf(b)+1}</h2>
            <TravelerForm addTravelerInfo={addTravelerInfo}/>
            </div>
        ))}
        <button className="btn-primary">Continue</button>
        </div>
    )
}

export default BookingForms;