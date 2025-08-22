<template>
  <div
    :class="[
      'ui-skeleton',
      `ui-skeleton--${shape}`,
      `ui-skeleton--${size}`,
      { 'ui-skeleton--animated': animated },
      `ui-skeleton--${theme}`,
    ]"
    :style="skeletonStyles"
    role="status"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  shape?: 'line' | 'circle' | 'rectangle' | 'avatar' | 'title' | 'paragraph'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  width?: string | number
  height?: string | number
  animated?: boolean
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  shape: 'line',
  size: 'md',
  animated: true,
  theme: 'light',
})

const skeletonStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (props.width) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  if (props.height) {
    styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  return styles
})
</script>

<style scoped>
.ui-skeleton {
  background: var(--color-secondary-200);
  border-radius: var(--border-radius-md);
  position: relative;
  overflow: hidden;
  margin-bottom: var(--spacing-1);
  /* Melhor contraste em diferentes fundos */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Skeleton com fundo escuro (para fundos coloridos como azul) */
.ui-skeleton--dark {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Skeleton com fundo claro (padrão) */
.ui-skeleton--light {
  background: var(--color-secondary-200);
}

/* Shapes */
.ui-skeleton--line {
  height: 1em;
  width: 100%;
}

.ui-skeleton--circle {
  border-radius: var(--border-radius-full);
  aspect-ratio: 1;
}

.ui-skeleton--rectangle {
  width: 100%;
  height: 100%;
}

.ui-skeleton--avatar {
  border-radius: var(--border-radius-full);
  aspect-ratio: 1;
}

.ui-skeleton--title {
  height: 1.5em;
  width: 100%;
  border-radius: var(--border-radius-sm);
}

.ui-skeleton--paragraph {
  height: 1em;
  width: 100%;
  border-radius: var(--border-radius-sm);
}

/* Sizes */
.ui-skeleton--xs {
  min-height: var(--spacing-4);
  min-width: var(--spacing-4);
}

.ui-skeleton--sm {
  min-height: var(--spacing-5);
  min-width: var(--spacing-5);
}

.ui-skeleton--md {
  min-height: var(--spacing-6);
  min-width: var(--spacing-6);
}

.ui-skeleton--lg {
  min-height: var(--spacing-8);
  min-width: var(--spacing-8);
}

.ui-skeleton--xl {
  min-height: var(--spacing-10);
  min-width: var(--spacing-10);
}

.ui-skeleton--2xl {
  min-height: var(--spacing-12);
  min-width: var(--spacing-12);
}

/* Avatar sizes */
.ui-skeleton--avatar.ui-skeleton--sm {
  width: var(--spacing-8);
  height: var(--spacing-8);
}

.ui-skeleton--avatar.ui-skeleton--md {
  width: var(--spacing-10);
  height: var(--spacing-10);
}

.ui-skeleton--avatar.ui-skeleton--lg {
  width: var(--spacing-12);
  height: var(--spacing-12);
}

/* Animation */
.ui-skeleton--animated::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
