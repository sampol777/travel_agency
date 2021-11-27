import React, { useEffect, useState } from "react";
import "./Mainpage.css";
import DestinationCard from "../destinations/DestinationCard";
import TravelApi from "../api/api";




function Mainpage(){
     const [destinations, setDestinations] = useState(null);

     useEffect(function getDestinationsOnMount(){
         search();
     }, []);

     async function search(name) {
         let destinations = await TravelApi.getDestinations(name);
         console.log (destinations)
         setDestinations(destinations);
     }

     if (!destinations) return "Not yet"
    return (
    
    <div>
     {destinations.length
            ? (
                <div className="destinations-list d-flex justify-content-around  flex-wrap p-5 mt-3">
                  {destinations.map(c => (
                      <DestinationCard
                          key={c.id}
                          id={c.id}
                          name={c.destination}
                          partnername= {c.partnername}
                          imageUrl={c.image_url}
                          pricePP={c.pricePP}
                          numberOfNights={c.numOfNights}
                          checkIn={c.check_in}
                          checkOut={c.check_out}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
    </div>
    
    
    )
}

export default Mainpage;