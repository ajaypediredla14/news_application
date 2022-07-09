import axios from "axios";

//service to fetch all the news sources
export const getNewsSources = () => {
  return axios
    .get(
      "https://newsapi.org/v2/top-headlines/sources?apiKey=f708018422154ae98fab42e76687309b"
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

//service to fetch a particular news sources based on the add user clicked
export const getSingleSource = (data) => {
  return axios
    .get(
      `https://newsapi.org/v2/top-headlines?sources=${data}&apiKey=f708018422154ae98fab42e76687309b`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
