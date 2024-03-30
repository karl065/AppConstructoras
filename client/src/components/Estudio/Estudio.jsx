import {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import {
  RiStackFill,
  RiClockwiseLine,
  RiCalendarCloseLine,
} from 'react-icons/ri';
import {useSelector} from 'react-redux';

const Estudio = () => {
  // Datos de ejemplo para las tarjetas
  const proyectos = useSelector((state) => state.proyectos.proyectos);
  const tareas = useSelector((state) => state.tareas.tareas);

  const [finalizados, setFinalizados] = useState(0);
  const [vencidos, setVencidos] = useState(0);
  const [porVencer, setPorVencer] = useState(0);

  const [totalTareas, setTotalTareas] = useState(0);
  const [tareasEnProgreso, setTareasEnProgreso] = useState(0);
  const [tareaPorVencer, setTareaPorVencer] = useState(0);
  const [tareasCompletadas, setTareasCompletadas] = useState(0);
  const [tareasVencidas, setTareasVencidas] = useState(0);

  const topCardsData = [
    {
      title: 'Proyectos Ejecutados',
      value: finalizados,
      icono: RiStackFill,
      color: 'bg-blue-600',
    },
    {
      title: 'Proyectos Por Vencerse',
      value: porVencer,
      icono: RiClockwiseLine,
      color: 'bg-orange-300',
    },
    {
      title: 'Proyectos Vencidos',
      value: vencidos,
      icono: RiCalendarCloseLine,
      color: 'bg-red-600',
    },
  ];

  const leftCardsData = [
    {title: 'Tareas Programadas', value: totalTareas},
    {title: 'Tareas en Progreso', value: tareasEnProgreso},
    {title: 'Tareas por vencer', value: tareaPorVencer},
    {title: 'Tareas Completadas', value: tareasCompletadas},
    {title: 'Tareas Vencidas', value: tareasVencidas},
  ];

  // Referencia para el elemento del gráfico
  const chartRef = useRef(null);
  // Referencia para el elemento del gráfico
  const chartRefT = useRef(null);

  // Función para inicializar el gráfico
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
    chartRef.current.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3'],
        datasets: [
          {
            label: 'Estudio Grupo - JM',
            data: [100, 200, 300],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)', // Rojo
              'rgba(54, 162, 235, 0.7)', // Azul
              'rgba(255, 206, 86, 0.7)', // Amarillo
            ],
            borderColor: [
              'rgba(255, 99, 132, 3)', // Rojo
              'rgba(54, 162, 235, 3)', // Azul
              'rgba(255, 206, 86, 3)', // Amarillo
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const ctxT = chartRefT.current.getContext('2d');
    if (chartRefT.current.chart) {
      chartRefT.current.chart.destroy();
    }
    chartRefT.current.chart = new Chart(ctxT, {
      type: 'pie',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3'],
        datasets: [
          {
            label: 'Estudio Grupo - JM',
            data: [100, 200, 300],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)', // Rojo
              'rgba(54, 162, 235, 0.7)', // Azul
              'rgba(255, 206, 86, 0.7)', // Amarillo
            ],
            borderColor: [
              'rgba(255, 99, 132, 3)', // Rojo
              'rgba(54, 162, 235, 3)', // Azul
              'rgba(255, 206, 86, 3)', // Amarillo
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    let conteoProyectos = 0;
    proyectos.map((proyecto) => {
      if (proyecto.finalizado) conteoProyectos++;
    });

    setFinalizados(conteoProyectos);

    let conteoVencidos = 0;
    const fechaActual = new Date();

    proyectos.forEach((proyecto) => {
      const fechaFinProyecto = new Date(proyecto.fechaFin);
      if (fechaFinProyecto < fechaActual) {
        conteoVencidos++;
      }
    });

    setVencidos(conteoVencidos);

    let conteoPorVencer = 0;

    proyectos.forEach((proyecto) => {
      const fechaFinProyecto = new Date(proyecto.fechaFin);
      const diferenciaDias = Math.ceil(
        (fechaFinProyecto - fechaActual) / (1000 * 60 * 60 * 24)
      );

      if (diferenciaDias <= 3 && diferenciaDias >= 0) {
        conteoPorVencer++;
      }
    });

    setPorVencer(conteoPorVencer);

    let conteoTareas = 0;
    let enProgreso = 0;
    let tareaPorVencer = 0;
    let tareasCompletadas = 0;
    let tareasVencidas = 0;

    tareas.map((tarea) => {
      const finTarea = new Date(tarea.fechaVencimiento);
      const diferenciaDias = Math.ceil(
        (finTarea - fechaActual) / (1000 * 60 * 60 * 24)
      );
      if (tarea.estado !== 100) conteoTareas++;
      if (tarea.estado > 0) enProgreso++;
      if (tarea.estado === 100) tareasCompletadas++;

      if (finTarea < fechaActual) tareasVencidas++;
      if (diferenciaDias <= 3 && diferenciaDias >= 0) {
        tareaPorVencer++;
      }
    });

    setTotalTareas(conteoTareas);
    setTareasEnProgreso(enProgreso);
    setTareaPorVencer(tareaPorVencer);
    setTareasCompletadas(tareasCompletadas);
    setTareasVencidas(tareasVencidas);
  }, [proyectos, tareas]);

  return (
    <div className="bg-white rounded-lg p-3">
      <div className="flex flex-col justify-between pl-5">
        <div className="md:w-full">
          <div className="grid grid-cols-3 gap-4">
            {topCardsData.map((card, index) => (
              <div
                key={index}
                className={`${card.color} p-4 rounded  grid grid-cols-2 justify-between items-center`}
              >
                {/* Aplicamos clases de tamaño para hacer el icono más grande */}

                <card.icono
                  className={`${card.color}-500 hover:rotate-45 h-12 w-12 text-white`}
                />
                <div className="flex flex-col items-center">
                  <p className="text-white font-bold  text-xl">{card.value}</p>
                  <h2 className="text-white text-xs p-2">{card.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 p-5 gap-3 h-auto justify-between">
        {' '}
        {/* Ajustar altura a automático */}
        <div className="h-40 w-full bg-gray-100 rounded-lg flex items-center justify-center">
          {' '}
          {/* Ajustar altura a 32 */}
          <canvas
            ref={chartRefT}
            style={{maxWidth: '100%', maxHeight: '100%'}}
          ></canvas>
        </div>
        <div className="h-40 w-full bg-gray-100 rounded-lg flex items-center justify-center">
          {' '}
          {/* Ajustar altura a 32 */}
          <canvas
            ref={chartRef}
            style={{maxWidth: '100%', maxHeight: '100%'}}
          ></canvas>
        </div>
      </div>
      <div className="flex items-center justify-center pl-5">
        <div className="grid grid-cols-5 gap-5">
          {leftCardsData.map((card, index) => (
            <div
              key={index}
              className={`${card.color} w-24 h-24 rounded-full bg-green-600  flex flex-col justify-center items-center shadow-lg`}
            >
              {/* Aplicamos clases de tamaño para hacer el icono más grande */}
              <div className="flex flex-col p-2 justify-center items-center ">
                <p className="text-white font-bold text-center text-xl">
                  {card.value}
                </p>
                <h2 className="text-white text-center text-xs">{card.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Estudio;
