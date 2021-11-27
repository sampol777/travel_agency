import React, {useState} from "react";
import { useHistory } from "react-router";
import Alert from "../common/Alert";

function SignupForm({ signup }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username:"",
        role:"",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    const [formErrors, setFormErrors] = useState([])


    async function handleSubmit(evt) {
        evt.preventDefault();
          let result = await signup(formData);
          if (result.success) {
            history.push("/mainpage");
          }else {
            setFormErrors(result.errors);
          }
          
        
      }

      function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
      }

      console.log(formData)
      return (
        <div className="SignupForm">
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h2 className="mb-3">Sign Up</h2>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                
                <div className="form-check">
                <input className="form-check-input" type="radio" name="role" id="user" value="user" onChange={handleChange}/>
                <label className="form-check-label" htmlFor="role">
                  User
                 </label>
                 </div>

                 <div className="form-check">
                <input className="form-check-input" type="radio" name="role" id="user" value="partner" onChange={handleChange}/>
                <label className="form-check-label" htmlFor="role">
                  Partner
                 </label>
                 </div>

                  <div className="form-group">
                    <label>Username</label>
                    <input
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                  </div>
  
                  <div className="form-group">
                    <label>First name</label>
                    <input
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last name</label>
                    <input
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                    />
                  </div>
  
                  {formErrors.length
                      ? <Alert type="danger" messages={formErrors} />
                      : null
                  }
  
                  <button
                      type="submit"
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
    );
}

export default SignupForm;