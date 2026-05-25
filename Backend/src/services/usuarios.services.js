
import { json } from "stream/consumers";
import Users from "../data/db.json" with {type:"json"};
import fs from "fs";
const rutaDB = '../Backend/src/data/db.json'


function escribirJson(){
    fs.writeFileSync(rutaDB,JSON.stringify(Users,null,4))
}

/**
 * Obtener todos los usuarios
 *
 * @returns {Promise<Array<Object>>}
 * Retorna un arreglo con todos los usuarios
 */
const getAllUsers = async () => {

    return Users;
};

/**
 * Obtener usuario por ID
 *
 * @param {number} id - ID del usuario a buscar
 *
 * @returns {Promise<Object|null>}
 * Retorna el usuario encontrado o null si no existe
 */
const getUserById = async (id) => {

    /**
     * Buscar usuario dentro del arreglo
     */
    const user = Users.find(
        user => user.id === parseInt(id)
    );

    return user;
};

/**
 * Crear usuario
 *
 * Genera un nuevo objeto combinando:
 * - Un ID automático
 * - Las propiedades recibidas desde newUser
 *
 * @param {Object} newUser - Datos del nuevo usuario
 *
 * @returns {Promise<Object>}
 * Retorna el usuario creado
 */
const createUser = async (newUser) => {

    const user = {

        id: Users.at(-1).id + 1,

        ...newUser
    };

    /**
     * Agregar usuario al arreglo
     */
    Users.push(user);
    escribirJson()
    
    return user;
};

/**
 * Actualizar usuario
 *
 * Busca un usuario por ID y reemplaza
 * únicamente las propiedades enviadas.
 *
 * @param {number} id - ID del usuario
 * @param {Object} data - Datos a actualizar
 *
 * @returns {Promise<Object|null>}
 * Retorna el usuario actualizado o null si no existe
 */
const updateUser = async (id, data) => {

    /**
     * Buscar índice del usuario
     */
    const index = Users.findIndex(
        user => user.id === parseInt(id)
    );

    /**
     * Validar si existe
     */
    if (index === -1) {
        return null;
    }

    /**
     * Combinar objeto actual
     * con los nuevos datos
     */
    Users[index] = {

        /**
         * Mantener propiedades actuales
         */
        ...Users[index],

        /**
         * Sobrescribir con nuevos valores
         */
        ...data
    };
    escribirJson()
    return Users[index];
};

/**
 * Eliminar usuario
 *
 * Busca un usuario por ID y lo elimina
 * del arreglo principal.
 *
 * @param {number} id - ID del usuario a eliminar
 *
 * @returns {Promise<Object|null>}
 * Retorna el usuario eliminado o null si no existe
 */
const deleteUser = async (id) => {

    /**
     * Buscar índice del usuario
     */
    const index = Users.findIndex(
        user => user.id === parseInt(id)
    );

    /**
     * Validar existencia
     */
    if (index === -1) {
        return null;
    }

    /**
     * Guardar usuario eliminado
     */
    const deletedUser = Users[index];

    /**
     * Eliminar usuario del arreglo
     */
    Users.splice(index, 1);
    escribirJson()
    return deletedUser;
};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
