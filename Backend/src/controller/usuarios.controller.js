import { log } from "console";
import {
    getAllUsers,
    getUserById,
    createUser as createUserService,
    updateUser as updateUserService,
    deleteUser as deleteUserService
} from "../services/usuarios.services.js";


/**
 * GET - Obtener todos los personajes
 *
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 *
 * @returns {Promise<Object>} Respuesta JSON con la lista de personajes
 */
const getUsers = async (req, res) => {

    try {
        
        const users = await getAllUsers();

        return res.status(200).json({
            success: true,
            body: users
        });

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * GET por ID - Obtener un personaje específico
 *
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros enviados en la URL
 * @param {string} req.params.id - ID del personaje
 * @param {Object} res - Objeto de respuesta de Express
 *
 * @returns {Promise<Object>} Respuesta JSON con el personaje encontrado
 */
const getUser = async (req, res) => {

    try {

        const { id } = req.params;

        const task = await getUserById(id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Personaje no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            body: task
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * POST - Crear personaje
 *
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.body - Datos del personaje enviados en el body
 * @param {Object} res - Objeto de respuesta de Express
 *
 * @returns {Promise<Object>} Respuesta JSON con el personaje creado
 */
const createUser = async (req, res) => {

    try {
        const newUser = await createUserService(req.body);
        
        return res.status(201).json({
            success: true,
            body: newUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * PUT - Actualizar personaje
 *
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros enviados en la URL
 * @param {string} req.params.id - ID del personaje a actualizar
 * @param {Object} req.body - Datos actualizados del personaje
 * @param {Object} res - Objeto de respuesta de Express
 *
 * @returns {Promise<Object>} Respuesta JSON con el personaje actualizado
 */
const updateUser = async (req, res) => {

    try {

        const updatedUser = await updateUserService(
            req.params.id,
            req.body
        );

        if (!updatedUser) {

            return res.status(404).json({
                success: false,
                message: "Personaje no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            body: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * DELETE - Eliminar personaje
 *
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} req.params - Parámetros enviados en la URL
 * @param {string} req.params.id - ID del personaje a eliminar
 * @param {Object} res - Objeto de respuesta de Express
 *
 * @returns {Promise<Object>} Respuesta JSON confirmando la eliminación
 */
const deleteUser = async (req, res) => {

    try {

        const deletedUser = await deleteUserService(
            req.params.id
        );

        if (!deletedUser) {

            return res.status(404).json({
                success: false,
                message: "Personaje no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Personaje eliminado",
            body: deletedUser
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};