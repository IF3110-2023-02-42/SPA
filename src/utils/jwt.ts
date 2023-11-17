import { jwtDecode } from "jwt-decode";

type jwtPayload = {
    ID_Pengguna: string,
    email: string,
    exp: number,
    iat: number,
    nama_belakang: string,
    nama_depan: string,
    profile_pict: string,
    role: string,
    username: string,
}

export function getDecodedJwt() {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
        return false
    }
    const decoded = jwtDecode(token);
    return decoded as jwtPayload;

}