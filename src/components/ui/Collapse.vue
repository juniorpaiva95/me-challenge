<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface CollapseProps {
  title?: string
  defaultOpen?: boolean
  disabled?: boolean
  headerClass?: string
  bodyClass?: string
  iconClass?: string
  noBorder?: boolean
}

const props = withDefaults(defineProps<CollapseProps>(), {
  title: '',
  defaultOpen: false,
  disabled: false,
  headerClass: '',
  bodyClass: '',
  iconClass: '',
  noBorder: false,
})

const emit = defineEmits<{
  toggle: [isOpen: boolean]
}>()

const isOpen = ref(props.defaultOpen)
const uid = Math.random().toString(36).substring(2, 15)

const headerClasses = computed(() => {
  const baseClasses =
    'flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer'
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed hover:bg-gray-50' : ''
  const customClasses = props.headerClass

  return `${baseClasses} ${disabledClasses} ${customClasses}`.trim()
})

const bodyClasses = computed(() => {
  const baseClasses = 'overflow-hidden transition-all duration-300 ease-in-out'
  const customClasses = props.bodyClass

  return `${baseClasses} ${customClasses}`.trim()
})

const iconClasses = computed(() => {
  const baseClasses = 'w-5 h-5 text-blue-600 transition-transform duration-300'
  const customClasses = props.iconClass

  return `${baseClasses} ${customClasses}`.trim()
})

const iconTransform = computed(() => {
  return isOpen.value ? 'rotate-180' : 'rotate-0'
})

const toggle = () => {
  if (props.disabled) return

  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}

watch(
  () => props.defaultOpen,
  (newValue) => {
    isOpen.value = newValue
  },
)

const open = () => {
  if (props.disabled) return
  isOpen.value = true
  emit('toggle', true)
}

const close = () => {
  if (props.disabled) return
  isOpen.value = false
  emit('toggle', false)
}

defineExpose({
  open,
  close,
  toggle,
  isOpen: computed(() => isOpen.value),
})
</script>

<template>
  <div :class="noBorder ? '' : 'border border-gray-200 rounded-lg overflow-hidden p-3 bg-white'">
    <!-- Header do Collapse -->
    <button
      :class="headerClasses"
      @click="toggle"
      :disabled="disabled"
      type="button"
      :aria-expanded="isOpen"
      :aria-controls="`collapse-${uid}`"
    >
      <!-- Conteúdo do Header (Título ou Slot) -->
      <div class="flex items-center flex-1">
        <!-- Ícone de Seta -->
        <ChevronDown :class="[iconClasses, iconTransform]" aria-hidden="true" />

        <!-- Título ou Slot Customizado -->
        <div class="ml-3 flex-1">
          <slot name="header">
            <span v-if="title" class="font-medium text-gray-900">
              {{ title }}
            </span>
          </slot>
        </div>
      </div>
    </button>

    <!-- Corpo do Collapse com Transição -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[1000px]"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-[1000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-show="isOpen"
        :class="bodyClasses"
        :id="`collapse-${uid}`"
        role="region"
        :aria-labelledby="`collapse-header-${uid}`"
      >
        <div class="p-4 bg-white">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
