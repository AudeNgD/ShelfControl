// import axios from "axios";
// const googleBooksLink = axios.create({baseURL:"https://www.googleapis.com/books/v1/volumes?q="})

// export const fetchBook =(params)=>{
//     return googleBooksLink.get(`isbn:${params}`).then(({data})=>{
//         console.log(data.kind)
//         return data
//     })
// }

//https://www.googleapis.com/books/v1/volumes?q=isbn:9781398518209

import axios from 'axios';
const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

export const fetchBook = async (isbn) => {
  const configurationObject = {
    method: 'get',
    url: `${baseUrl}isbn:${isbn}`,
  };
  const response = await axios(configurationObject);
//   console.log("Response ->> ", {response})
  return response.data;
};