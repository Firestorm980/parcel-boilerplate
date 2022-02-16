import { set, listen } from './state'

document.getElementById('clear').addEventListener('click', () => {
  set({ value: '' })
})

listen((state) => {
  document.getElementById('output').textContent = `You have ${10 - state.value.length} characters remaining.`
  document.getElementById('input').value = state.value
})

document.getElementById('input').addEventListener('input', (event) => {
  const value = event.target.value.substring(0, 10)

  set({ value })
})
