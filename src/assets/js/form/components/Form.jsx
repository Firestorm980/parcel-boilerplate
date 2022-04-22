import { h } from 'preact'
import { useContext } from 'preact/hooks'
import Item from './Item'
import { MyContext } from '../context'

/**
 * The component.
 *
 * @returns {Object} JSX
 */
const Form = ({ context }) => {
  const { data, helpers, isLoading } = context
  const { facets } = data
  const { update } = helpers

  const onChange = (event) => {
    update()
  }

  return (
    <form onChange={onChange}>
      <div style={`display: ${(isLoading) ? 'block' : 'none'}; height: 1rem; width: 1rem; background: red;`}></div>
      {`${isLoading}`}
      {facets.map(({ label, items, type, name }) => (
        <fieldset>
          <legend>{label}</legend>
          {items.map((item) => (
            <Item item={item} name={name} type={type} />
          ))}
        </fieldset>
      ))}
    </form>
  )
}

export default Form
