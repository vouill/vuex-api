import set from 'lodash/fp/set'

export default (state, keyPath, resp) => {
  const [head, ...tail] = keyPath;
  return { stateObject: tail.length > 0 ? set(tail, resp, state[head]): resp , head }
}
