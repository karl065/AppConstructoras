import {Outlet} from 'react-router-dom';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import NavBar from '../../../../components/NavBar/NavBar';

const LayoutAdmin = () => {
  return (
    <div className="grid grid-cols-[auto,1fr] m-0 max-h-screen ">
      <Sidebar />
      <div className="flex flex-col ">
        <NavBar />
        <div className="w-full h-full flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
