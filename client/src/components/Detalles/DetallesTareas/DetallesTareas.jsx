/* eslint-disable react/prop-types */
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import {useState} from 'react';
import Tabla from '../../Tabla/Tabla';

const DetallesTareas = ({tarea}) => {
  const [verEvidencias, setVerEvidencias] = useState(false);
  const [verObservaciones, setVerObservaciones] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);

  const columnasObservaciones = [
    {Header: 'ITEM', accessor: 'item'},
    {Header: 'OBSERVACION', accessor: 'observacion'},
  ];

  const mostrarSiguienteImagen = () => {
    if (imagenActual < tarea.evidencias.length - 1) {
      setImagenActual(imagenActual + 1);
    }
  };

  const mostrarImagenAnterior = () => {
    if (imagenActual > 0) {
      setImagenActual(imagenActual - 1);
    }
  };

  const dataObservaciones = tarea.observaciones.map((observacion, index) => {
    return {
      item: index + 1,
      observacion: observacion.observacion,
    };
  });

  return (
    <div className="items-center p-2 space-y-1 rounded-lg bg-secondary-fondo text-sm">
      <div className="border rounded-lg p-1 flex space-x-2">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold">Descripcion: </h1>
            <p className="bg-white border-2 border-secondary-button rounded-lg p-1">
              {tarea.descripcion}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <h1 className="font-bold">Estado: </h1>
              <div
                className={`border-secondary-button w-[103px] border-2 rounded-lg ${
                  tarea.estado <= 30
                    ? 'bg-red-700'
                    : tarea.estado === 100
                    ? 'bg-green-400'
                    : 'bg-secondary-buttonH'
                }`}
              >
                <div
                  className={`h-6 rounded-md flex items-center p-1 ${
                    tarea.estado > 0
                      ? 'bg-green-400 border-secondary-button border-2'
                      : 'bg-none'
                  } transition-all duration-300 ease-in-out`}
                  style={{width: tarea.estado}}
                >
                  {tarea.estado}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold">Fecha Inicio: </h1>
            <p className="bg-white border-2 border-secondary-button rounded-lg p-1">
              {tarea.fechaInicio}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold">Fecha Final: </h1>
            <p className="bg-white border-2 border-secondary-button rounded-lg p-1">
              {tarea.fechaVencimiento}
            </p>
          </div>
        </div>
      </div>
      <div className="border rounded-lg p-2 space-y-2">
        <div className="flex items-center space-x-1">
          <button
            className="bg-secondary-button rounded-full"
            onClick={() => setVerEvidencias(!verEvidencias)}
          >
            {verEvidencias ? (
              <RiArrowDropDownLine size={24} />
            ) : (
              <RiArrowDropUpLine size={24} />
            )}
          </button>
          <h1
            className="uppercase font-bold text-white cursor-pointer"
            onClick={() => setVerEvidencias(!verEvidencias)}
          >
            Evidencias
          </h1>
        </div>
        {verEvidencias && (
          <div className="border rounded-lg p-2 space-x-2 flex justify-center">
            {tarea.evidencia?.length > 4 && (
              <button
                className="bg-secondary-button rounded-full"
                onClick={mostrarImagenAnterior}
                disabled={imagenActual === 0}
              >
                <RiArrowLeftSLine size={24} />
              </button>
            )}
            {tarea.evidencias
              .slice(imagenActual, imagenActual + 4)
              .map((evidencia) => (
                <div
                  key={evidencia._id}
                  className="w-20 h-20 flex items-center justify-center"
                >
                  <img
                    className="rounded-lg"
                    src={evidencia.foto}
                    alt={evidencia._id}
                  />
                </div>
              ))}

            {tarea.evidencia?.length > 4 && (
              <button
                className="bg-secondary-button rounded-full"
                onClick={mostrarSiguienteImagen}
                disabled={imagenActual + 4 >= tarea.evidencias.length}
              >
                <RiArrowRightSLine size={24} />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="border rounded-lg p-2 space-y-2">
        <div className="flex items-center space-x-1">
          <button
            className="bg-secondary-button rounded-full"
            onClick={() => setVerObservaciones(!verObservaciones)}
          >
            {verObservaciones ? (
              <RiArrowDropDownLine size={24} />
            ) : (
              <RiArrowDropUpLine size={24} />
            )}
          </button>
          <h1
            className="uppercase font-bold text-white cursor-pointer"
            onClick={() => setVerObservaciones(!verObservaciones)}
          >
            Observaciones
          </h1>
        </div>
        {verObservaciones && (
          <div className="border rounded-lg p-2 h-[200px] overflow-auto ">
            <Tabla columns={columnasObservaciones} data={dataObservaciones} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetallesTareas;
