<script setup lang="ts">
import { computed, h, ref, watch } from 'vue'
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-vue-next'

interface AlertMessageProps {
  type?: 'success' | 'warning' | 'info' | 'error'
  title?: string
  message?: string
  dismissible?: boolean
  showIcon?: boolean
  autoDismiss?: boolean
  autoDismissDelay?: number
  onDismiss?: () => void
}

const props = withDefaults(defineProps<AlertMessageProps>(), {
  type: 'info',
  title: '',
  message: '',
  dismissible: false,
  showIcon: true,
  autoDismiss: false,
  autoDismissDelay: 5000,
  onDismiss: undefined,
})

const emit = defineEmits<{
  dismiss: []
}>()

const isVisible = ref(true)

const handleDismiss = () => {
  if (props.onDismiss || (emit && Object.keys(emit).length > 0)) {
    if (props.onDismiss) {
      props.onDismiss()
    } else {
      emit('dismiss')
    }
  } else {
    isVisible.value = false
  }
}

watch(
  () => props.autoDismiss,
  (shouldAutoDismiss) => {
    if (shouldAutoDismiss && props.autoDismissDelay > 0) {
      setTimeout(() => {
        handleDismiss()
      }, props.autoDismissDelay)
    }
  },
  { immediate: true },
)

const alertClasses = computed(() => {
  const baseClasses = 'rounded-lg border p-4'

  const typeClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  }

  return `${baseClasses} ${typeClasses[props.type]}`
})

const alertIcon = computed(() => {
  const iconClasses = 'w-5 h-5 mr-3'

  const icons = {
    success: () => h(CheckCircle, { class: `${iconClasses} text-green-600` }),
    warning: () => h(AlertCircle, { class: `${iconClasses} text-yellow-600` }),
    info: () => h(Info, { class: `${iconClasses} text-blue-600` }),
    error: () => h(XCircle, { class: `${iconClasses} text-red-600` }),
  }

  return icons[props.type]
})

const closeButtonClasses = computed(() => {
  const baseClasses = 'ml-auto p-1 rounded-full hover:bg-opacity-20 transition-colors'

  const buttonClasses = {
    success: 'text-green-600 hover:bg-green-600',
    warning: 'text-yellow-600 hover:bg-yellow-600',
    info: 'text-blue-600 hover:bg-blue-600',
    error: 'text-red-600 hover:bg-red-600',
  }

  return `${baseClasses} ${buttonClasses[props.type]}`
})
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div v-if="isVisible" :class="alertClasses">
      <div class="flex items-start">
        <component v-if="showIcon" :is="alertIcon" aria-hidden="true" />

        <div class="flex-1">
          <h4 v-if="title" class="font-semibold mb-1">
            {{ title }}
          </h4>

          <p v-if="message" class="text-sm !mb-0">
            {{ message }}
          </p>

          <slot />
        </div>

        <button
          v-if="dismissible"
          @click="handleDismiss"
          :class="closeButtonClasses"
          type="button"
          aria-label="Fechar alerta"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>
