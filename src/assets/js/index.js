import gui from './gui'
import project from './project'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

gui()
project(document.getElementById('canvas'))
