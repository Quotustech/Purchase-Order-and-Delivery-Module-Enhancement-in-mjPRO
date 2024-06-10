import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    "Track123-Api-Secret": process.env.TRACKING_API_TOKEN,
  },
});

export default axiosInstance;
