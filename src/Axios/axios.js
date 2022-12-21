import axios from "axios";

const instance = axios.create({
  baseURL: "https://microsoft-teams123.herokuapp.com",
});
export default instance;
