import {Link, useNavigate} from 'react-router-dom';
import {RiMailFill, RiLockFill} from 'react-icons/ri';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {login} from '../../redux/Actions/ActionsUsuarios/ActionsUsuarios';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import {useState} from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.usuarios.loading);
  const [verContraseña, setVerContraseña] = useState(false);

  const handleVerContraseña = () => {
    setVerContraseña(!verContraseña);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Formato de correo electrónico inválido')
      .required('Correo electrónico requerido'),
    password: Yup.string().required('Contraseña requerida'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values, dispatch, navigate);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary-1000">
      <div className="bg-secondary-fondo p-8 rounded-xl shadow-2xl w-auto lg:w-[450px">
        <h1 className="text-1xl text-center font-bold tracking-[5px] mb-6">
          Iniciar Sesión
        </h1>

        <form className="mb-3" onSubmit={formik.handleSubmit}>
          <div className="relative mb-4">
            <RiMailFill className="absolute -translate-y-1/2 top-1/2 left-2 text-secondary-button" />
            <input
              type="email"
              name="email"
              id="email"
              className={`py-2 pl-8 pr-4 bg-secondary-1000 w-full outline-none rounded-lg focus:border focus:border-secondary-button text-colors ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                formik.touched.email && formik.errors.email
                  ? 'visible'
                  : 'hidden'
              }`}
            >
              {formik.errors.email}
            </div>
          </div>
          <div className="relative mb-4">
            <RiLockFill className="absolute -translate-y-1/2 top-1/2 left-2 text-secondary-button" />
            <input
              type={verContraseña ? 'text' : 'password'}
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`py-2 pl-8 pr-4 bg-secondary-1000 w-full outline-none rounded-lg focus:border focus:border-secondary-button ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="Contraseña"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={handleVerContraseña}
              className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
            >
              {verContraseña ? (
                <AiFillEyeInvisible className="text-gray-400" />
              ) : (
                <AiFillEye className="text-gray-400" />
              )}
            </button>
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                formik.touched.password && formik.errors.password
                  ? 'visible'
                  : 'hidden'
              }`}
            >
              {formik.errors.password}
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full px-4 py-2 transition-colors rounded-lg bg-secondary-button hover:text-gray-100"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  <span className="ml-2">Iniciando Sesión...</span>
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center gap-4 text-gray-100">
          <Link
            to="/recuperar-password"
            className="transition-colors hover:text-secondary-button"
          >
            ¿Olvidaste tu password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
