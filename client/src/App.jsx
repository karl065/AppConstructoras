/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {
  HomeAdmin,
  LayoutAdmin,
  Login,
  Tareas,
  Usuarios,
  Documentos,
  Proyectos,
} from './Views';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="proyectos" element={<Proyectos />} />
          <Route path="tareas" element={<Tareas />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="documentos" element={<Documentos />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
