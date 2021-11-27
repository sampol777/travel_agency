import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API class
 * 
 * Static class tying together methods used to get/send to the API.
 * 
 */

class TravelApi {
    // token will be stored here
    static token;

    static async request(endpoint, data = {}, method = "get") {

        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${TravelApi.token}`};
        const params = (method === "get")
              ? data
              : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        }catch(err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Signup for site */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Get token for login  from username, password*/

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    // get current user

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // delete current user

  static async removeCurrentUser(username) {
      let res = await this.request(`users/${username}/delete`,{}, "patch")
      return res
  }

  // get cart for user

  static async getCartForUser(username) {
      let res = await this.request(`carts/${username}` );
      return res.cart;
  }

  // get all destinations

  static async getDestinations(name) {
      let res = await this.request("trips");
      return res.trips;
  }
   /** add booking to cart */
  static async addToCart(data){
      console.log(data)
      let res = await this.request(`carts/addtocart`, data, "post")
      return res
  }

  /** delete booking from cart */
  static async deleteBooking(id){
    let res = await this.request(`carts/bookings/${id}`,{}, "delete")
    return res
}
  
  /** clear cart */
  static async clearCart(ids){
      let res = await this.request(`carts/`, {ids}, "delete")
      return res
  }

  /** get client token for braintree */
  static async getBrainToken(){
      let res = await this.request("initializeBraintree")
      return res;
  }

  /** make payment */

  static async makePayment(data){
      let res = await this.request("makePayment", {data}, "post")
      return res;
  }

  /** process payment */

  static async processPayment(data) {
      console.log(data)
      let res = await this.request("orders", {data}, "post")
      
      return res;
  }

  /** get orders for user */

  static async getOrdersUser(username) {
      let res = await this.request(`orders/user/${username}`, {}, "get")
      return res;
  }

  /** get orders partner */

  static async getOrdersPartner(username) {
    let res = await this.request(`orders/partner/${username}`, {}, "get")
    return res;
}

/** get trips for partner */
 
static async getPartnerTrips(username) {
 const res = await this.request(`trips/partner/${username}`, {}, "get")
 return res;
}

/** create new trip */

static async CreateTrip(data) {
    console.log(data)
    let res = await this.request("trips", data, "post")
    return res;
}

/** remove trip */

static async removeTrip(id){
    console.log(id)
    let res = await this.request(`trips/${id}/delete`,{}, "patch")
    console.log(res);
    return res
  }

}

export default TravelApi;