import { mount } from 'vue-test-utils'
import ApiHandlerComponent from './api-handler-component'

describe('Api handler', () => {
  it('call the correct hooks when mounting', () => {
    const dispatch = jest.fn()
    mount(ApiHandlerComponent(), { mocks: { $store: { dispatch } }, propsData: { url: 'some/url', keyPath: 'totally-a-keypath' } })
    expect(dispatch.mock.calls).toMatchSnapshot()
  })

  it('should be called after destroy', () => {
    const dispatch = jest.fn()
    const wrapper = mount(ApiHandlerComponent({ requestConfig: { baseURL: 'https://api.github.com' } }), { mocks: { $store: { dispatch } }, propsData: { persistent: false, url: 'some/url', keyPath: 'totally-a-keypath' } })
    wrapper.vm.$destroy()
    expect(dispatch.mock.calls).toMatchSnapshot()
  })

  // it('should call the api after arg change', () => {
  //   const dispatch = jest.fn()
  //   const wrapper = mount(ApiHandlerComponent({ requestConfig: { baseURL: 'https://api.github.com' } }), { mocks: { $store: { dispatch } }, propsData: { persistent: false, url: 'some/url', keyPath: 'totally-a-keypath', args: { post: 1 } } })
  //   wrapper.setProps({ args: { post: 2 } })
  //   wrapper.setProps({ args: { post: 3 } })
  //   expect(dispatch.mock.calls).toMatchSnapshot()
  // })
})
