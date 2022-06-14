import axios from "axios";
import md5 from "md5";

const date = Date.now();

const fetcher = (url, params) => {
  return axios
    .get(url, {
      params: {
        apikey: process.env.REACT_APP_MARVEL_PUBLIC_KEY,
        ts: date,
        hash: md5(
          `${date}${process.env.REACT_APP_MARVEL_PRIVATE_KEY}${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`
        ),
        ...params,
      },
    })
    .then((res) => res.data);
}
export default fetcher;
