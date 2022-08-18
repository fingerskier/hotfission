import {run} from './engine.js'


window.addEventListener('load', event=>{
  const context = document.getElementById('program')

  run(context)
})