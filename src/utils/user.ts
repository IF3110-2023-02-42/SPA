import api from "./api";
import { headers } from "./api";

export async function getUserStatus(ID_Pengguna: string | null){
    const response = await api.get(`/user/userStatus/${ID_Pengguna}`, {
        headers: headers,});

    if (response.data.message=="OK"){
        console.log(response.data.data)
        return (response.data.data.verificationStatus === "accepted");
    } else{
        console.log(response.data);
        return null;
    }
}