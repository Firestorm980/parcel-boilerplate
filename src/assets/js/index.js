import canvas, { goTo } from './canvas'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

canvas()

document.querySelector('button').addEventListener('click', goTo)
