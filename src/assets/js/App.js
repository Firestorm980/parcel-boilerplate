import { useState, useEffect } from 'react'

const STORAGE_KEY = 'test-local-storage'

/**
 *
 * @returns
 */
const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [projects, setProjects] = useState(() => {
    const store = localStorage.getItem(STORAGE_KEY)

    if (!store) {
      return []
    }

    const data = JSON.parse(store)

    return data.projects
  })

  const handleFormOnSubmit = (event) => {
    event.preventDefault()

    const newProject = {
      name: inputValue
    }

    setProjects([...projects, newProject])

    setInputValue('')
  }

  const handleInputOnChange = (event) => {
    const { target } = event
    const { value } = target

    setInputValue(value)
  }

  const handleRemoveOnClick = (index) => {
    const updated = [...projects]

    updated.splice(index, 1)

    setProjects(updated)
  }

  useEffect(() => {
    // Set to local storage.
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects }))
  }, [projects])

  return (
    <>
      <h1>Hello!</h1>
      <ul>
        {projects.map((project, index) => {
          return (
            <li key={index}>
              <div>
                {project.name}
                <button type="button" onClick={() => { handleRemoveOnClick(index) }}>
                  Remove
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      <form autoComplete="off" onSubmit={handleFormOnSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={inputValue} onChange={handleInputOnChange} />
        </div>
        <button>Submit</button>
      </form>
    </>
  )
}

export default App
