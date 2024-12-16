export const Alerta = ({alerta}) => {
    return (
      // <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} 
      //     bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}>
      //     {alerta.msg}
      // </div>
      <div className={`${alerta.error ? 'from-red-200 to-red-400 text-red-900' : 'from-sky-400 to-sky-600 text-white'} 
          bg-gradient-to-br text-center p-2 rounded-md uppercase font-bold text-md mb-5 `}>
          {alerta.msg}
      </div>
    )
}