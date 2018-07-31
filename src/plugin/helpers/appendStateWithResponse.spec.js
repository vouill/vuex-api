import mutateStateWithResponse from './appendStateWithResponse'

const set = (state, key, obj) => {
  state[key] = obj;
  return state
}



describe('Api handler', () => {
  it('should throw error when no keyPath', () => {
    const state =  {};
    const resp = { status: 'loading', data: { toto: 'tutu' } }
    expect(() => mutateStateWithResponse(state, undefined, resp)).toThrow()
  })

  it('should mutate correctly on keyPath with one item', () => {
    const state =  {};
    const resp = { status: 'loading', data: { toto: 'tutu' } }
    const keyPath = ['foo']
    const { stateObject, head } = mutateStateWithResponse(state, keyPath, resp)
    expect(set(state, head, stateObject )).toMatchSnapshot()
  })

  it('should mutate correctly on keyPath with more than one item', () => {
    const state =  {};
    const resp = { status: 'loading', data: { toto: 'tutu' } }
    const keyPath = ['foo', 'bar', 'baz'];
    const { stateObject, head } = mutateStateWithResponse(state, keyPath, resp)
    expect(set(state, head, stateObject )).toMatchSnapshot()
  })

  it('should mutate correctly already existing key on keyPath with one item', () => {
    const state =  { foo: { status: 'success', data: 'bax' } };
    const resp = { status: 'loading', data: { toto: 'tutu' } }
    const keyPath = ['foo']
    const { stateObject, head } = mutateStateWithResponse(state, keyPath, resp)
    expect(set(state, head, stateObject )).toMatchSnapshot()
  })

  it('should mutate correctly already existing key on keyPath with more than one item', () => {
    const state =  { foo: { status: 'success', data: 'bax' } };
    const resp = { status: 'loading', data: { toto: 'tutu' } }
    const keyPath = ['foo', 'bar', 'baz'];
    const { stateObject, head } = mutateStateWithResponse(state, keyPath, resp)
    expect(set(state, head, stateObject )).toMatchSnapshot()
  })
})
