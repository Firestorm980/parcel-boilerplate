import { createContext, h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

const initialData = {
  facets: [
    {
      label: 'Fruit',
      name: 'fruit',
      id: 'fruit',
      type: 'checkbox',
      items: [
        { selected: false, label: 'Apple', value: 'apple', id: 'apple' },
        { selected: false, label: 'Banana', value: 'banana', id: 'banana' },
        { selected: false, label: 'Cherry', value: 'cherry', id: 'cherry' },
        { selected: false, label: 'Blueberry', value: 'blueberry', id: 'blueberry' },
        { selected: false, label: 'Blackberry', value: 'blackberry', id: 'blackberry' }
      ]
    },
    {
      label: 'Vegetable',
      name: 'vegetable',
      id: 'vegetable',
      type: 'radio',
      items: [
        { selected: true, label: 'None', value: 'none', id: 'none' },
        { selected: false, label: 'Cucumber', value: 'cucumber', id: 'cucumber' },
        { selected: false, label: 'Pickle', value: 'pickle', id: 'pickle' },
        { selected: false, label: 'Lettuce', value: 'lettuce', id: 'lettuce' },
        { selected: false, label: 'Carrot', value: 'carrot', id: 'carrot' }
      ]
    }
  ],
  test: false
}

export const MyContext = createContext()

export const MyProvider = (props) => {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)

  const update = () => {
    console.log('update')
    setIsLoading(!isLoading)
  }

  const helpers = {
    update
  }

  useEffect(() => {
    setData(initialData)
  })

  return (
    <MyContext.Provider value={{ isLoading, data, helpers }}>
      {props.children}
    </MyContext.Provider>
  )
}
