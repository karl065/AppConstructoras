const Proyectos = require("../../models/Proyectos");
const Usuarios = require("../../models/Usuarios");

const postControllerProyectos = async (proyecto) => {
    try {
        const nuevoProyecto = await Proyectos.create(proyecto);

        if (proyecto.idUsuario) {
            await Usuarios.findByIdAndUpdate(
                proyecto.idUsuario,
                { $push: { proyectos: nuevoProyecto._id } },
                { new: true }
            );
        }

        return nuevoProyecto;
    } catch (error) {
        return error;
    }
};

module.exports = { postControllerProyectos };
