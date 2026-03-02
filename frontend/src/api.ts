import axois from "axios";

//Create an instance of axios with the base URL of the backend API
const api = axois.create({
  baseURL: "http://localhost:8080"
});

//Export the axois instance
export default api;

