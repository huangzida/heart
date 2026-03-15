<script setup lang="ts">
withDefaults(defineProps<{
  disabled?: boolean
  label?: string
}>(), {
  disabled: false,
  label: 'Hello Vue 3 + Tailwind',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
    @click="$emit('click', $event)"
  >
    {{ label }}
  </button>
</template>
