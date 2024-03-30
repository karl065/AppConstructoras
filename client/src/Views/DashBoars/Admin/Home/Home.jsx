//import { LineChars } from "../../componentes/LineChars"

import Estudio from '../../../../components/Estudio/Estudio';

const HomeAdmin = () => {
  return (
    <div className="w-full h-full p-2">
      <div className="bg-secondary-fondo rounded-lg p-3 x-2 items-center">
        <h1 className="mb-2 border-gray-100 text-gray-100">Análisis</h1>
        <hr className="mb-2"></hr>
        <Estudio />
      </div>
    </div>
  );
};

export default HomeAdmin;
