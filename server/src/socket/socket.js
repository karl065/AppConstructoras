const {
  getControllersDocumentos,
} = require('../controllers/controllersDocumentos/GetControllersDocumentos');
const {
  getControllerTareas,
} = require('../controllers/controllersTareas/GetControllerTareas');
const {
  getControllerUsers,
} = require('../controllers/controllersUsuarios/GetControllerUsuarios');
const {
  putControllerUsuarios,
} = require('../controllers/controllersUsuarios/PutControllerUsuarios');
const {
  getControllerProyectos,
} = require('../controllers/controllersProyectos/GetControllersProyectos');
const {
  getControllerEvidencias,
} = require('../controllers/controllersEvidencias/GetControllerEvidencias');
const {
  getControllerMensajerias,
} = require('../controllers/controllersMensajerias/GetControllerMensajerias');

const socket = (io) => {
  io.on('connection', async (socket) => {
    console.log(`Un cliente se ha conectado. ID: ${socket.id}`);

    socket.on('joinRoom', async (room) => {
      // Unirse a la sala correspondiente
      socket.join(room);
      console.log(
        `El cliente ${socket.nombre} se ha conectado a la sala ${room}. `
      );
    });

    socket.on('login', async (usuario) => {
      socket.nombre = usuario;
      console.log(`El usuario ${socket.nombre} se ha conectado`);
      const usuarios = await getControllerUsers();
      io.emit('login', usuarios);
    });

    socket.on('cargarUsuarios', async () => {
      const usuarios = await getControllerUsers();
      io.emit('cargarUsuarios', usuarios);
    });

    socket.on('cargarDocumentos', async () => {
      const documentos = await getControllersDocumentos();
      io.emit('cargarDocumentos', documentos);
    });

    socket.on('cargarTareas', async () => {
      const tareas = await getControllerTareas();

      io.emit('cargarTareas', tareas);
    });

    socket.on('cargarProyectos', async () => {
      const proyectos = await getControllerProyectos();
      io.emit('cargarProyectos', proyectos);
    });

    socket.on('mensajeUsuario', (data) => {
      io.to(data.usuario).emit('mensajeUsuario', data.mensaje);
    });

    socket.on('mensajeProyecto', (data) => {
      io.to(data.proyecto).emit('mensajeProyecto', data.mensaje);
    });

    socket.on('logoutUsuario', async (id) => {
      await putControllerUsuarios({estado: false}, id);
      // Realizar la actualización de usuarios aquí
      const usuarios = await getControllerUsers();
      // Emitir el evento 'cargarUsuario' después de actualizar
      io.emit('logoutUsuario', usuarios);
    });

    socket.on('cargarEvidencias', async () => {
      const evidencias = await getControllerEvidencias();
      io.emit('cargarEvidencias', evidencias);
    });

    socket.on('cargarMensajerias', async () => {
      const mensajerias = await getControllerMensajerias();
      io.emit('cargarMensajerias', mensajerias);
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
      console.log(`El cliente ${socket.id} se ha desconectado.`);
    });
  });
};

module.exports = {socket};
