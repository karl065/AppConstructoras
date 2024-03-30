const {
    postControllerNotificaciones,
} = require('../../controllers/controllersNotificaciones/PostControllerNotificaciones');

const PostHandlersNotificaciones = async (req, res) => {
    try {
        const notificaciones = req.body;
        const notificacionCreada = await postControllerNotificaciones(notificaciones);
        return res.status(200).json(notificacionCreada);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { PostHandlersNotificaciones };