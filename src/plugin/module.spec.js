/**
 * Created by vouill on 10/24/17.
 */
// import Vue from 'vue/dist/vue.js'
import module from './module'
import pluginActions from './actions'

const testRequest = { url: 'testUrl', method: 'testMethod', baseURL: 'baseUrl' }

describe('Module Actions', () => {
  it('should process request', () => {
    const commit = jest.fn()
    module.actions[pluginActions.request]({ commit }, testRequest)
    expect(commit.mock.calls).toMatchSnapshot()
  })

  it('should process clear', () => {
    const commit = jest.fn()
    module.actions[pluginActions.clear]({ commit }, 'someKeypath')
    expect(commit.mock.calls).toMatchSnapshot()
  })
})

describe('Module mutations', () => {
  let state = {}
  const keyPath = 'someKeyPath'
  beforeEach(() => {
    state = {}
  })
  it('should process request', () => {
    module.mutations[pluginActions.request](state, { keyPath })
    expect(state).toMatchSnapshot()
  })

  it('should process success', () => {
    module.mutations[pluginActions.success](state, { keyPath, resp: { date: 'fakeData' } })
    expect(state).toMatchSnapshot()
  })

  it('should process error', () => {
    module.mutations[pluginActions.error](state, { keyPath, err: { data: 'fakeError' } })
    expect(state).toMatchSnapshot()
  })

  it('should process clear', () => {
    module.mutations[pluginActions.clear](state, { keyPath })
    expect(state).toMatchSnapshot()
  })

  it('should process request -> success', () => {
    module.mutations[pluginActions.clear](state, { keyPath })
    module.mutations[pluginActions.success](state, { keyPath, resp: { date: 'fakeData' } })
    expect(state).toMatchSnapshot()
  })

  it('should process request -> error', () => {
    module.mutations[pluginActions.clear](state, { keyPath })
    expect(state).toMatchSnapshot()
    module.mutations[pluginActions.error](state, { keyPath, err: { data: 'fakeError' } })
    expect(state).toMatchSnapshot()
  })
})
