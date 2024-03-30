/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useEffect, useRef, useState} from 'react';

// Hook para manejar cuando se hace clic fuera del dropdown para cerrarlo
let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};

// Componente principal del select
const SelectPersonalizado = ({encabezado, opciones, funcion, valor}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  let domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  useEffect(() => {
    if (valor === '') {
      setSeleccionado(null);
    }
  }, [valor]);

  const fontSizeClass =
    encabezado.length > 10 || seleccionado?.length > 10
      ? 'text-xs'
      : (encabezado.length >= 5 && encabezado.length <= 10) ||
        (seleccionado?.length >= 5 && seleccionado?.length <= 10)
      ? 'text-sm'
      : 'text-base';

  return (
    <div className="uppercase">
      {/* Sección de dropdown */}
      <section className="inline-block p-2 font-bold uppercase rounded-lg  bg-secondary-button">
        <div className="container">
          <div className="flex flex-wrap">
            {/* Contenedor del select */}
            <div ref={domNode}>
              <div className="text-center ">
                <div className="relative inline-block text-left ">
                  {/* Botón del select */}
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex uppercase transition-colors hover:text-gray-100 ${fontSizeClass}`}
                  >
                    {seleccionado ? seleccionado : encabezado}
                    <span className="pl-4">
                      {/* Icono de flecha abajo */}
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current"
                      >
                        <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
                      </svg>
                    </span>
                  </button>
                  {/* Contenido del dropdown */}
                  <div
                    className={`border-2 absolute p-2 z-40 mt-3 bg-secondary-fondo rounded-md  transition-all ${
                      dropdownOpen
                        ? 'opacity-100 visible'
                        : 'invisible opacity-0'
                    } max-h-48 overflow-y-auto`}
                  >
                    <div className="flex flex-col p-2 space-y-2 border rounded-lg ">
                      {/* Elementos del dropdown */}
                      {opciones?.map((opcion, index) => (
                        <DropdownItem
                          label={opcion.nombre}
                          key={index}
                          id={opcion._id}
                          funcion={funcion}
                          setDropdownOpen={setDropdownOpen}
                          setSeleccionado={setSeleccionado}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Fin del contenedor del select */}
          </div>
        </div>
      </section>
      {/* Fin de la sección de dropdown */}
    </div>
  );
};

// Componente para cada elemento del dropdown
const DropdownItem = ({
  label,
  id,
  funcion,
  setDropdownOpen,
  setSeleccionado,
}) => {
  const handleItemClick = (id) => {
    funcion(id);
    setSeleccionado(label);
    setDropdownOpen(false);
  };

  const fontSizeClass =
    label.length > 10
      ? 'text-xs'
      : label.length >= 5 && label.length <= 10
      ? 'text-sm'
      : 'text-base';

  return (
    <button
      type="button"
      onClick={() => handleItemClick(id)}
      className={`p-2 font-bold text-center uppercase transition-colors rounded-lg bg-secondary-button hover:text-gray-100 ${fontSizeClass}`}
    >
      {label}
    </button>
  );
};

export default SelectPersonalizado;
