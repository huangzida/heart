import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HelloButton from '../src/components/HelloButton.vue'

describe('helloButton', () => {
  it('renders label and emits click event', async () => {
    const wrapper = mount(HelloButton, {
      props: {
        label: '立即体验',
      },
    })

    expect(wrapper.text()).toContain('立即体验')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
