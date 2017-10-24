// import Vue from 'vue/dist/vue.js'
import { mount } from 'vue-test-utils'
import ApiHandler from './api-handler'

describe('Api handler', () => {
  it('call the correct hooks when mounting and unmounting', () => {
    const dispatch = jest.fn()
    mount(ApiHandler, { mocks: { $store: { dispatch } }, propsData: { url: 'some/url', keyPath: 'totally-a-keypath' } })
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})
