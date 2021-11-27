import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import TravelApi from "../api/api";
import UserContext from "../auth/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function NewTripForm({partnername}) {
    const history = useHistory();
    const {currentUser} = useContext(UserContext);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [formData, setFormData] = useState({
        destination:"",
        allInclusive:"",
        pricePP:"",
        imageUrl:""
    });

    const [formErrors, setFormErrors] = useState([]);


    
    /**handle form submit */

    async function handleSubmit(evt) {
        evt.preventDefault();

        try {
          if(currentUser.username){
            formData.partnername = currentUser.username 
            formData.check_in= new Date(startDate).toLocaleDateString().slice(0, 14).split('/').join('-')  
            formData.check_out= new Date(endDate).toLocaleDateString().slice(0, 14).split('/').join('-')   
            let result = await TravelApi.CreateTrip(formData);
            history.push("/profile");
            return {success:true};  
          }
        } catch (error) {
          console.log(error)
          setFormErrors(["something went wrong, please try again"])
        } 
    }

    

    /** Update form data field */
    function handleChange(evt) {

        let { name, value } = evt.target;
        if(name === "allInclusive"){
            value = 'true' ? true : false;
        }else if(name === "numOfNights" || name === "pricePP"){
            value = Number(value)
        }
        
        setFormData(l => ({ ...l, [name]: value }));
      }
      if(!currentUser) return "loading"
      return (
        <div className="NewTripForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">New trip</h3>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Destination</label>
                  <input
                      name="destination"
                      className="form-control"
                      value={formData.destination}
                      onChange={handleChange}
                      autoComplete="destination"
                      required
                  />
                </div>

                <div className="form-check">
                <input className="form-check-input" type="radio" name="allInclusive"  value="true" onChange={handleChange} required/>
                <label className="form-check-label" htmlFor="allInclusive">
                  All inclusive
                 </label>
                 </div>

                 <div className="form-check">
                <input className="form-check-input" type="radio" name="allInclusive"  value="false" onChange={handleChange} required/>
                <label className="form-check-label" htmlFor="allInclusive">
                  Not all inclusive
                 </label>
                 </div>

                 <div className="form-group">
                  <label>Check-in</label>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} required/>
                </div>
                <div className="form-group">
                  <label>Check-out</label>
                  <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} required/>
                </div>

                 <input type="hidden" id="" name="custId" value={currentUser.username}/>


                <div className="form-group">
                  <label>Price per person</label>
                  <input
                      type="number"
                      name="pricePP"
                      className="form-control"
                      value={formData.pricePP}
                      onChange={handleChange}
                      autoComplete="price per person"
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                      name="imageUrl"
                      className="form-control"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      autoComplete="image URL"
                      required
                  />
                </div>
                

                {formErrors && formErrors.length 
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      )
}

export default NewTripForm;




