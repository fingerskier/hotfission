import * as commands from './commands.js'


async function execute(codata) {
  let result = ''


  if (commands[codata.name]) {
    
  } else {
    ;
  }


  return
}


function HTML2OBJ(markup='UNK', obj) {
  obj = {
    name: markup.tagName || markup,
    parm: {},
    subs: [],
  }

  
  for (let attr of markup.attributes) {
    console.log('ATTR', attr)
    
    obj.parm[attr.name] = attr.value
  }
  
  
  if (markup.children.length) {
    for (let child of markup.children) {
      obj.subs.push(HTML2OBJ(child))
    }
  } else {
    obj.subs = markup.innerHTML
  }
  
  console.log('NODE RESULT', markup, obj)
  
  return obj
}


function OBJ2HTML(obj, markup='') {
  let internal = ''
  let parameters = ''

  
  try {
    if (typeof obj.parm === 'object') {
      Object.keys(obj.parm).forEach(X => {
        parameters += ` ${X}="${obj.parm[X]}" `
      })
    }
  } catch (err) {
    console.error('OBJ PARM ERR', obj, err)
  }
  

  try {
    if (typeof obj.subs === 'string') {
      internal = obj.subs
    } else {
      obj.subs.forEach(X=>{
        internal += OBJ2HTML(X)
      })
    }
  } catch (err) {
    console.error('OBJ SUBS ERR', obj, err)
  }


  markup = `<${obj.name} ${parameters}>
    ${internal}
  </${obj.name}>
  `

  return markup
}


async function run(scope) {
  let result

  const codata = HTML2OBJ(scope, result)

  console.log('CODATA', codata)

  const markup = OBJ2HTML(codata)

  console.log('MARKUP', markup)

  scope.outerHTML = markup
}


export {
  run,
}