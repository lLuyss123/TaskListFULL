import { URL as url } from "./constant";
export async function apiGet(endopoint) {
    
    
    const response =
        await fetch(`${url}${endopoint}`)

    if (!response.ok) throw new Error("An error ocurred during login");
    /**@type {User[]} */
    const data = await response.json()
    console.log(data);
    
    if (data.length === 0) throw new Error("Invalid credentials at login");
    return data
}