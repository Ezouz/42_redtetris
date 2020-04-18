import axios from "axios";

export default axios.create({
  // baseURL: "https://" + process.env.REACT_APP_DOMAIN + ":" + process.env.REACT_APP_TETRIS_API_PORT + "/tetris-api/score/",
  baseURL: "http://" + process.env.REACT_APP_DOMAIN + ":" + process.env.REACT_APP_TETRIS_API_PORT + "/tetris-api/score/",
  responseType: "json"
});
