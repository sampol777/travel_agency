import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";


function TravelerForm({ addTravelerInfo,destination }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
    });
    const [formErrors, setFormErrors] = useState([]);
  
  
    /** Handle form submit*/
  
    async function handleSubmit(evt) {
      evt.preventDefault();
      console.log(evt)

    //   if (result.success) {
    //     history.push("/companies");
    //   } else {
    //     setFormErrors(result.errors);
    //   }
    }
  
    /** Update form data field */
    function handleChange(evt) {
      const { name, value } = evt.target;
      setFormData(l => ({ ...l, [name]: value }));
    }
  
    return (
        <div className="travelerForm">
          
            <h3 className="mb-3">{destination}</h3>
  
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>First name</label>
                    <input
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="first-name"
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last name</label>
                    <input
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="last-name"
                        required
                    />
                  </div>
  
                  {formErrors.length
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
    );
  }
  
  export default TravelerForm;