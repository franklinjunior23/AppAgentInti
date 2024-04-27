import PropTypes from 'prop-types'

function Input({ onChange, Value, Name, className, placeholder, type }) {
  return (
    <input
      type={type ?? 'text'}
      name={Name ?? ''}
      onChange={onChange}
      value={Value}
      className={`${className} bg-black/50 w-full mt-1 px-3 py-3 indent-1 rounded-md focus:outline-none text-sm`}
      placeholder={placeholder}
    />
  )
}

export default Input
Input.propTypes = {
  onChange: PropTypes.func,
  Value: PropTypes.string,
  Name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string
}
