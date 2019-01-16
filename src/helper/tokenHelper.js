import Axios from "axios";

export const getToken = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

export const getClubId = () => {
    return  localStorage.getItem("clubId");
};

// const makeRequest = ({method, url, body}) => 
// Axios({
//     method,
//     headers:
// })