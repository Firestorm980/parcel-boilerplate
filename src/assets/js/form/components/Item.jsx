import { h } from 'preact'

/**
 * The component.
 *
 * @returns {Object} JSX
 */
const Item = ({ item: { label, value, selected }, name, type }) => {
  const id = `${name}-${value}`
  return (
    <div>
      <label htmlFor={id}>
        <input id={id} type={type} name={name} value={value} checked={selected} />
        &nbsp;
        {label}
      </label>
    </div>
  )
}

export default Item
