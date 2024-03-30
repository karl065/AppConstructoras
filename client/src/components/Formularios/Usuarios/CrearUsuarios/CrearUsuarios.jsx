/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {alertSuccess} from '../../../../helpers/Alertas';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import {useEffect, useState} from 'react';
import VisorImagen from '../../../VisorIMG/VisorIMG';
import SelectPersonalizado from '../../../DropDown/Dropdown';
import {agregarUsuario} from '../../../../redux/Actions/ActionsUsuarios/ActionsUsuarios';

const CrearUsuarios = ({setModalCrearUsuario}) => {
  const [verContraseña, setVerContraseña] = useState(false);
  const [verRepetirContraseña, setVerRepetirContraseña] = useState(false);
  const [rol, setRol] = useState('');
  const roles = useSelector((state) => state.usuarios.roles);

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Nombre requerido'),
    email: Yup.string()
      .email('Formato de correo electrónico inválido')
      .required('Correo electrónico requerido'),
    password: Yup.string()
      .min(8, 'La password debe tener al menos 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/,
        'Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
      )
      .required('Contraseña requerida'),
    repetirContraseña: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las passwords deben coincidir')
      .required('Repetir password requerida')
      .test(
        'repetir-password',
        'Las passwords deben coincidir',
        function (value) {
          return value === this.parent.password;
        }
      ),
    foto: Yup.string().required('Debe cargar una imagen'),
    rol: Yup.string().required('Debe seleccionar un rol'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password: '',
      repetirContraseña: '',
      telefono: '',
      foto: '',
      rol: rol,
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      agregarUsuario(values);
      alertSuccess('Usuario creado con Exito');
      setModalCrearUsuario(false);
      resetForm();
    },
  });

  const handleImageChange = (imagen) => {
    formik.setFieldValue('foto', imagen);
  };

  const opcionesDrop = [];

  roles.map((rol) => {
    return opcionesDrop.push({
      _id: rol,
      nombre: rol,
    });
  });

  const handleVerContraseña = () => {
    setVerContraseña(!verContraseña);
  };
  const handleVerRepetirContraseña = () => {
    setVerRepetirContraseña(!verRepetirContraseña);
  };

  useEffect(() => {
    formik.setFieldValue('rol', rol);
  }, [rol]);

  return (
    <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo text-sm">
      <form className="space-y-2 " onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2">
          <div className="relative">
            <input
              type="text"
              name="nombre"
              id="nombre"
              className={`p-2 bg-secondary-1000 rounded-lg focus:border focus:border-secondary-button text-colors ${
                formik.touched.nombre && formik.errors.nombre
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="Nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
            />
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                formik.touched.nombre && formik.errors.nombre
                  ? 'visible'
                  : 'hidden'
              }`}
            >
              {formik.errors.nombre}
            </div>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              className={`p-2 bg-secondary-1000 rounded-lg focus:border focus:border-secondary-button text-colors ${
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
          <div className="relative">
            <input
              type="text"
              name="telefono"
              id="telefono"
              className={`p-2 bg-secondary-1000 rounded-lg focus:border focus:border-secondary-button text-colors ${
                formik.touched.telefono && formik.errors.telefono
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="Telefono"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telefono}
            />
            <div
              className={`text-xs bg-black rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                formik.touched.telefono && formik.errors.telefono
                  ? 'visible'
                  : 'hidden'
              }`}
            >
              {formik.errors.telefono}
            </div>
          </div>
          <div className="relative">
            <input
              type={verContraseña ? 'text' : 'password'}
              name="password"
              id="password"
              className={`p-2 bg-secondary-1000 rounded-lg focus:border focus:border-secondary-button text-colors ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="Contraseña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
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
          <div className="relative">
            <input
              type={verRepetirContraseña ? 'text' : 'password'}
              name="repetirContraseña"
              id="repetirContraseña"
              className={`p-2 bg-secondary-1000 rounded-lg focus:border focus:border-secondary-button text-colors ${
                formik.touched.repetirContraseña &&
                formik.errors.repetirContraseña
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="Repetir Contraseña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repetirContraseña}
            />
            <button
              type="button"
              onClick={handleVerRepetirContraseña}
              className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
            >
              {verRepetirContraseña ? (
                <AiFillEyeInvisible className="text-gray-400" />
              ) : (
                <AiFillEye className="text-gray-400" />
              )}
            </button>
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                formik.touched.repetirContraseña &&
                formik.errors.repetirContraseña
                  ? 'visible'
                  : 'hidden'
              }`}
            >
              {formik.errors.repetirContraseña}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full space-y-2">
          <div className="relative">
            <SelectPersonalizado
              encabezado={'Seleccione un rol'}
              opciones={opcionesDrop}
              funcion={setRol}
            />
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                formik.touched.rol && formik.errors.rol ? 'visible' : 'hidden'
              }`}
            >
              {formik.errors.rol}
            </div>
          </div>
          <div className="relative">
            <VisorImagen onImageChange={handleImageChange} />
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                formik.touched.foto && formik.errors.foto ? 'visible' : 'hidden'
              }`}
            >
              {formik.errors.foto}
            </div>
          </div>
          <div className="flex items-end justify-center">
            <button
              type="submit"
              className="p-2 font-bold uppercase transition-colors rounded-lg bg-secondary-button hover:text-gray-100"
            >
              Crear Usuario
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrearUsuarios;
