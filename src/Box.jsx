/* eslint-disable react/prop-types */

const Box = ({value, onClick, isFilled, id}) => {
  return (
    <div id={id} className="w-20 h-20 text-3xl font-mono text-white flex items-center justify-center rounded-lg bg-black" onClick={() => !isFilled && onClick(id) }>
       {value}
    </div>
  )
}

export default Box
