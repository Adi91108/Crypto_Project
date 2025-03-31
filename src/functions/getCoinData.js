import axios from "axios";

export const getCoinData = (id) => {
  const myData = axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}`, {
      mode: "no-cors",
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log("error", error);
    });

  return myData;
};
