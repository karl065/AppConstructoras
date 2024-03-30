import { Link } from "react-router-dom"
import { RiMailFill } from "react-icons/ri"
export const RecuperarContrasena = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-secondary-fondo p-8 rounded-xl shadow-2xl w-auto lg:w-[450px">
        <h1 className="text-1xl text-center font-bold tracking-[5px] text-white mb-6">Recuperar Contraseña</h1>
        <form className="mb-3">
          <div className="relative mb-4">
            <RiMailFill className="absolute top-1/2 -translate-y-1/2 left-2 text-secundary-buton" />
            <input type="email"
              className="py-2 pl-8 pr-4 bg-secundary-1000 w-full outline-none rounded-lg focus:border focus:border-secundary-buton text-colors"
              placeholder="Correo electronico"
            />
          </div>
          <div>
            <button type="submit" className="bg-secundary-buton w-full py-2 px-4 rounded-lg hover:text-gray-100 transition-colors" >
              Enviar Instrucciones
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-4 items-center text-gray-100">
          <span className="flex items-center gap-2">
            ¿Ya tienes cuenta? <Link to="/login" className="text-secondary-button hover:text-gray-100 transition-colors">Ingresa</Link>
          </span>
          <span className="flex items-center gap-2">
            ¿No tienes cuenta? <Link to="/registro" className="text-secundary-button hover:text-gray-100 transition-colors">Registrate</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
