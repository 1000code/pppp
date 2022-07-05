import axios from "axios";

export const getLocation = async () => {
  return await axios.get(
    "https://api.ipgeolocation.io/ipgeo?apiKey=a6814b9e5ab4487abd61bc0a07302103"
  );
};
