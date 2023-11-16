import axios from "axios";
export const headers = {
    accessToken : sessionStorage.getItem("accessToken"),
}

export default axios.create({
    baseURL: import.meta.env.VITE_REST_BASEURL,
});
