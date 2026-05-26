import { User } from "../types/user.type";
import { apiGet } from "./client";
import { URL as url } from "./constant";
/**
 * 
 * @param {User} user 
 */
export async function validateLogin(user) {
    return await apiGet(`?userEmail=${user.email}&password=${user.password}`)
}

export async function getById(id) {
    return await apiGet(`/${id}`)
}