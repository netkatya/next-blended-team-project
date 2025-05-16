import axios from "axios";

const API_KEY = "YOUR_API_KEY";
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

export const getPhotos = async (query) => {
  const response = await axios.get(`search?query=${query}`);

  return response.data.photos;
};
