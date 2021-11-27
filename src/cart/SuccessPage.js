import React from "react";
import { useHistory } from "react-router-dom";

function  SuccessPage() {
  const history = useHistory();

  function redirect(){
    history.push("/mainpage");
  } 

  return (
      <div className="jumbotron container">
          <h1 className="text-center">Congratulations, purchase complete! Happy travelling! </h1>
          <h2 className="text-center mt-4">Back to shopping <button className="btn btn-primary" onClick={redirect}>Let's GO!</button></h2>
      </div>
  )    
}

export default SuccessPage;