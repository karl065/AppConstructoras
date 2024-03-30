/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  logout,
  reLogin,
} from '../../redux/Actions/ActionsUsuarios/ActionsUsuarios';
import {alertInfo} from '../../helpers/Alertas';

const TokenCaducidad = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [conteoRegresivo, setConteoRegresivo] = useState(0);

  const caducidadToken = useSelector((state) => state.usuarios.caducidadToken);
  const login = useSelector((state) => state.usuarios.login);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      reLogin(token, dispatch, navigate);
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (caducidadToken > 0) {
      const interval = setInterval(() => {
        setConteoRegresivo((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            alertInfo('Sesión expirada');
            logout(dispatch, navigate, login?._id);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [caducidadToken]);

  useEffect(() => {
    setConteoRegresivo(caducidadToken);
  }, [caducidadToken]);

  useEffect(() => {
    if (caducidadToken > 0 && conteoRegresivo > 0) {
      const minutesLeft = conteoRegresivo / 60;
      if (
        conteoRegresivo >= 300 &&
        conteoRegresivo <= 900 &&
        minutesLeft % 5 === 0
      ) {
        alertInfo(
          `Su sesión expirará en ${Math.ceil(
            minutesLeft
          )} minutos. Guarde su trabajo.`
        );
      } else if (conteoRegresivo <= 5 && conteoRegresivo > 0) {
        alertInfo(
          `Su sesión expirará en ${Math.ceil(
            conteoRegresivo
          )} segundo(s). Guarde su trabajo.`
        );
      }
    }
  }, [conteoRegresivo, caducidadToken]);

  return null;
};

export default TokenCaducidad;
