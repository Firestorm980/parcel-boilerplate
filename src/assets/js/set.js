import { set } from './state'

document.getElementById('set').addEventListener('click', () => {
  set({ value: 'Hello world!' })
})
