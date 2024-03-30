import {Link, useNavigate} from 'react-router-dom';
import {
  RiBarChartGroupedFill,
  RiContactsBookLine,
  RiPassValidLine,
  RiToolsFill,
  RiLogoutBoxRLine,
  RiHeadphoneLine,
} from 'react-icons/ri';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/Actions/ActionsUsuarios/ActionsUsuarios';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.usuarios.login);

  const handleLogout = () => {
    logout(dispatch, navigate, login._id);
  };

  return (
    <div className="h-[100vh] bg-secondary-fondo p-2 flex flex-col justify-between">
      <div>
        <h1 className="text-center text-2xl font-bold text-white mb-10">
          Grupo JM
        </h1>
        <ul className="text-[14px]">
          <li>
            <Link
              to="/admin"
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-1000 transition-colors"
            >
              <RiBarChartGroupedFill className="text-secondary-button" />{' '}
              Estadísticas
            </Link>
          </li>
          <li>
            <Link
              to="/admin/proyectos"
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-1000 transition-colors"
            >
              <RiContactsBookLine className="text-secondary-button" /> Proyectos
            </Link>
          </li>
          <li>
            <Link
              to="/admin/tareas"
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-1000 transition-colors"
            >
              <RiPassValidLine className="text-secondary-button" /> Tareas
            </Link>
          </li>
          <li>
            <Link
              to="/admin/documentos"
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-1000 transition-colors"
            >
              <RiPassValidLine className="text-secondary-button" /> Documentos
            </Link>
          </li>

          <li>
            <Link
              to="/admin/usuarios"
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-1000 transition-colors"
            >
              <RiPassValidLine className="text-secondary-button" /> Usuarios
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-1000 transition-colors"
            >
              <RiToolsFill className="text-secondary-button" /> Configuración
            </Link>
          </li>
          <li>
            <Link
              to="/tikets"
              className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-1000 transition-colors"
            >
              <RiHeadphoneLine className="text-secondary-button" /> Soporte
            </Link>
          </li>
        </ul>
      </div>
      <nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-1000 transition-colors"
        >
          <RiLogoutBoxRLine className="text-secondary-button" /> Cerrar Sesión
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
