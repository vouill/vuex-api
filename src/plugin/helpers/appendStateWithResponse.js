import set from 'lodash/fp/set'

export default (state, keyPath, responseStateObject) => {
  if(!keyPath){
    throw new Error('keyPath need to be defined')
  }
  if(typeof keyPath === 'string'){
    return { stateObject: responseStateObject , head: keyPath }

  }
  const [head, ...tail] = keyPath;
  return { stateObject: tail.length > 0 ? set(tail, responseStateObject, state[head]): responseStateObject , head }
}
