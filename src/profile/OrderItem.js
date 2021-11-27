import React from "react";

function OrderItem({orderId,destination,username,partnername,role}) {

return (
    <tr>
      <td>{orderId}</td>
      <td>{destination}</td>
      {role==="user"
      ?<td>{partnername}</td>
      
      :<td>{username}</td>
       }
    </tr>

)    
}

export default OrderItem;