import project from './project'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

project(document.getElementById('canvas'))
