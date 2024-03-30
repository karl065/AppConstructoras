import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from 'react-redux';
import store from './redux/store.jsx';
import {BrowserRouter} from 'react-router-dom';
import TokenCaducidad from './components/TokenCaducidad/TokenCaducidad.jsx';
import ManejadorSocket from './components/ManejadorSocket/ManejadorSocket.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <TokenCaducidad />
      <ManejadorSocket />
      <App />
    </BrowserRouter>
  </Provider>
);
