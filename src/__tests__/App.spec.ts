import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import router from '../router'

describe('App', () => {
  it('Mounts and renders home route correctly', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    await router.isReady()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('View order with your order id (1)')
    expect(wrapper.text()).toContain('View inexistent order with your order id (2)')
  })
})
