import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HeartGallery from '../src/components/HeartGallery.vue'

describe('heartGallery', () => {
  it('renders models and presets', async () => {
    const wrapper = mount(HeartGallery, {
      props: {
        animated: false,
        autoCruise: false,
      },
    })

    expect(wrapper.text()).toContain('心形函数艺术馆')

    const selects = wrapper.findAll('select')
    expect(selects).toHaveLength(2)
    expect(selects[0].findAll('option').length).toBeGreaterThanOrEqual(10)
    expect(selects[1].findAll('option').length).toBeGreaterThanOrEqual(8)

    await selects[0].setValue('beating-heart')
    expect(wrapper.text()).toContain('呼吸心跳')
  })
})
