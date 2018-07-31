/**
 * Created by vouill on 10/24/17.
 */
import module from './module'
import pluginActions from './actions'
import moxios from 'moxios'

const testRequest = { url: 'testUrl', method: 'testMethod', baseURL: 'baseUrl' }

describe('Module Actions', () => {
  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })
  it('should process request', () => {
    const commit = jest.fn()
    module.actions[pluginActions.request]({ commit }, testRequest)
    expect(commit.mock.calls).toMatchSnapshot()
  })

  it('should process clear', () => {
    const commit = jest.fn()
    module.actions[pluginActions.clear]({ commit }, { keyPath: 'someKeypath' })
    expect(commit.mock.calls).toMatchSnapshot()
  })

  it('should process onSuccess', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: 'test'
      })
    })

    const commit = jest.fn()
    const dispatch = jest.fn()
    return module.actions[pluginActions.request]({ commit, dispatch }, { keyPath: 'someKeypath', url: 'testUrl', onSuccess: { dispatchAction: { type: 'test-type', payload: 'test-payload' } } }).then(() => {
      expect(commit.mock.calls).toMatchSnapshot()
      expect(dispatch.mock.calls).toMatchSnapshot()
    })
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
    module.mutations[pluginActions.clear](state, keyPath)
    expect(state).toMatchSnapshot()
  })

  it('should process request -> success', () => {
    module.mutations[pluginActions.clear](state, keyPath)
    module.mutations[pluginActions.success](state, { keyPath, resp: { date: 'fakeData' } })
    expect(state).toMatchSnapshot()
  })

  it('should process request -> error', () => {
    module.mutations[pluginActions.clear](state, keyPath)
    expect(state).toMatchSnapshot()
    module.mutations[pluginActions.error](state, { keyPath, err: { data: 'fakeError' } })
    expect(state).toMatchSnapshot()
  })
})
