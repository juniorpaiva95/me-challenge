import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'

describe('Collapse', () => {
  describe('Rendering', () => {
    it('renders with title when provided', () => {
      const wrapper = mount(Collapse, {
        props: { title: 'Test Title' },
      })

      expect(wrapper.text()).toContain('Test Title')
    })

    it('renders children content but hides it when defaultOpen is false', () => {
      const wrapper = mount(Collapse, {
        props: { title: 'Test Title', defaultOpen: false },
        slots: {
          default: '<p>Test content message</p>',
        },
      })

      const regionElement = wrapper.find('[role="region"]')

      expect(regionElement.exists()).toBe(true)
      expect(regionElement.attributes('aria-expanded')).toBe('false')
      expect(wrapper.html()).toContain('Test content message')
      expect(regionElement.isVisible()).toBe(false)
    })

    it('renders open when defaultOpen is true', () => {
      const wrapper = mount(Collapse, {
        props: { title: 'Test Title', defaultOpen: true },
        slots: {
          default: '<p>Test content message</p>',
        },
      })

      const regionElement = wrapper.find('[role="region"]')

      expect(regionElement.exists()).toBe(true)
      expect(regionElement.attributes('aria-expanded')).toBe('true')
      expect(regionElement.text()).toContain('Test content message')
      expect(regionElement.isVisible()).toBe(true)
    })
  })

  describe('Toggle functionality', () => {
    it('toggles visibility when clicking the header', async () => {
      const wrapper = mount(Collapse, {
        props: { title: 'Test Title', defaultOpen: false },
        slots: {
          default: '<p>Test content message</p>',
        },
      })

      const toggleButton = wrapper.find('[data-testid="collapse-toggle-button"]')
      const regionElement = wrapper.find('[role="region"]')

      expect(regionElement.attributes('aria-expanded')).toBe('false')

      await toggleButton.trigger('click')
      await wrapper.vm.$nextTick()

      expect(regionElement.attributes('aria-expanded')).toBe('true')
      expect(wrapper.html()).toContain('Test content message')
      expect(regionElement.exists()).toBe(true)

      await toggleButton.trigger('click')
      await wrapper.vm.$nextTick()

      expect(regionElement.attributes('aria-expanded')).toBe('false')
      expect(regionElement.exists()).toBe(true)
    })
  })
})
