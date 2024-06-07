export default function ToBtn({ onClick, children }) {
  return (
    <button className='register_btn' onClick={() => onClick()}>
      {children}
    </button>
  )
}
