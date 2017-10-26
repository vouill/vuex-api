import { mount } from 'vue-test-utils'
import ApiHandler from './api-handler'

describe('Api handler', () => {
  it('call the correct hooks when mounting', () => {
    const dispatch = jest.fn()
    mount(ApiHandler, { mocks: { $store: { dispatch } }, propsData: { url: 'some/url', keyPath: 'totally-a-keypath' } })
    expect(dispatch.mock.calls).toMatchSnapshot()
  })

  it('should be called after destroy', () => {
    const dispatch = jest.fn()
    const wrapper = mount(ApiHandler, { mocks: { $store: { dispatch } }, propsData: { persistent: false, url: 'some/url', keyPath: 'totally-a-keypath' } })
    wrapper.vm.$destroy()
    wrapper.update()
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})
