const Alert = ({alert}) => {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600'} text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 bg-gradient-to-br`}>
        {alert.msg}
    </div>
  )
}

export default Alert