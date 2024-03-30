const { Router } = require('express');
const usuarios = require('./routesUsuarios/routesUsuarios.js');
const tareas = require('./routesTareas/routesTareas.js');
const auth = require('./routesAuth/routesAuth.js');
const proyectos = require('./routesProyectos/routesProyectos.js');
const documentos = require('./routesDocumentos/routesDocumentos.js');
const soporteContable = require('./routesSoporteContable/routesSoporteContable.js');
const email = require('./routesEmail/routesEmail.js');
const observaciones = require('./routesObservaciones/routesObservaciones.js');
const evidencias = require('./routesEvidencias/routesEvidencias.js')
const mensajerias = require('./routesMensajerias/routesMensajerias.js')
const notificaciones = require('./routesNotificaciones/routesNotificaciones.js')

const router = Router();

router.use('/usuarios', usuarios);
router.use('/proyectos', proyectos);
router.use('/documentos', documentos);
router.use('/tareas', tareas);
router.use('/auth', auth);
router.use('/soporteContable', soporteContable);
router.use('/email', email);
router.use('/observaciones', observaciones);
router.use('/evidencias', evidencias)
router.use('/mensajerias', mensajerias)
router.use('/notificaciones', notificaciones)


module.exports = router;
