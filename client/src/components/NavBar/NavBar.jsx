/* eslint-disable react-hooks/exhaustive-deps */
import {Link} from 'react-router-dom';
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import {
  RiArrowDownSLine,
  RiLogoutBoxRLine,
  RiNotification3Line,
  RiSettings3Line,
} from 'react-icons/ri';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

const NavBar = () => {
  const login = useSelector((state) => state.usuarios.login);
  const notificaciones = useSelector(
    (state) => state.notificaciones.notificaciones
  );
  const [conteoNotificaciones, setConteoNotificaciones] = useState(0);

  useEffect(() => {
    notificaciones.some((notificacion) => {
      if (!notificacion.leidoPor.includes(login._id)) {
        setConteoNotificaciones(conteoNotificaciones + 1);
      }
    });
  }, [notificaciones]);

  if (!login) {
    return null; // O podrías renderizar un componente de carga, un mensaje de error, etc.
  }

  return (
    <div className="border-gray-400 bg-secondary-fondo flex items-center justify-end">
      <nav className="flex items-center gap-x-2">
        <Menu
          menuButton={
            <MenuButton className="relative p-2 transition-colors rounded-lg hover:bg-secondary-1000">
              <RiNotification3Line className="text-secondary-button" />
              <span
                className="absolute -top-0.5 -right-0  py-0.5 px-[5px] box-content 
                           text-black rounded-full text-[8px] font-bold "
              >
                {conteoNotificaciones}
              </span>
            </MenuButton>
          }
          transition
          menuClassName="bg-secondary-fondo p-4"
        >
          <h1 className="font-medium text-center text-gray-300">
            Notificaciones
          </h1>
          <hr className="my-1 border-gray-500"></hr>
          {notificaciones.map((notificacion) => (
            <div key={notificacion._id}>
              <MenuItem className="P-0 hover:bg-transparent ">
                <Link
                  to="/notificaciones"
                  className="flex items-center flex-1 px-2 py-2 text-gray-300 transition-colors rounded-lg gap-x-2 hover:bg-secondary-1000 "
                >
                  <div className="flex flex-col text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`text-[8px] ${
                          notificacion.leidoPor?.includes(login._id)
                            ? 'text-white'
                            : 'text-white font-bold'
                        } `}
                      >
                        {new Date(notificacion.timestamp)
                          .toISOString()
                          .slice(0, 10)}
                      </span>
                    </div>
                    <p
                      className={`text-xs 
                      ${
                        notificacion.leidoPor?.includes(login._id)
                          ? 'text-white'
                          : 'text-white font-bold'
                      } 
                      `}
                    >
                      {notificacion.mensajes}
                    </p>
                  </div>
                </Link>
              </MenuItem>
            </div>
          ))}
          <hr className="my-1 border-gray-500"></hr>
          <MenuItem className="flex justify-center rounded-full hover:bg-secondary-1000">
            <Link
              to="/"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Todas las notificaciones
            </Link>
          </MenuItem>
        </Menu>

        <Menu
          menuButton={
            <MenuButton
              className={
                'flex items-center gap-x-2  hover:bg-secondary-1000 py-2  px-4 rounded-lg transition-colors'
              }
            >
              <img
                src={login.foto}
                className="object-cover w-6 h-6 rounded-full"
              />
              <span className="text-gray-300">{login?.nombre}</span>
              <RiArrowDownSLine />
            </MenuButton>
          }
          transition
          menuClassName="bg-secondary-fondo p-4"
        >
          <MenuItem className="text-gray-300 transition-colors rounded-lg hover:bg-secondary-1000">
            <Link to="/registro" className="flex items-center gap-x-4">
              <img
                src={login.foto}
                className="object-cover w-8 h-8 rounded-full"
              />
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-sm">{login.nombre}</span>
                <span className="text-[10px] text-gray-400">{login.email}</span>
              </div>
            </Link>
          </MenuItem>
          <hr className="my-3 border-gray-500"></hr>
          <MenuItem className="text-gray-300 transition-colors rounded-lg hover:bg-secondary-1000">
            <Link to="/configuracion" className="flex items-center gap-x-4">
              <RiSettings3Line className="rounded-full " />
              Configuración
            </Link>
          </MenuItem>
          <MenuItem className="text-gray-300 transition-colors rounded-lg hover:bg-secondary-1000">
            <Link to="/" className="flex items-center gap-x-4">
              <RiLogoutBoxRLine className="" />
              {/**<Logout />*/}
            </Link>
          </MenuItem>
        </Menu>
      </nav>
    </div>
  );
};

export default NavBar;
