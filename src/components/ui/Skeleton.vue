<template>
  <div
    :class="[
      'skeleton',
      `skeleton--${shape}`,
      `skeleton--${size}`,
      { 'skeleton--animated': animated },
    ]"
    :style="skeletonStyles"
    :aria-label="ariaLabel"
    role="status"
  >
    <span v-if="showContent" class="sr-only">{{ ariaLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  shape?: 'line' | 'circle' | 'rectangle' | 'avatar' | 'title' | 'paragraph'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  width?: string | number
  height?: string | number
  animated?: boolean
  showContent?: boolean
  ariaLabel?: string
  rows?: number
  avatar?: boolean
  avatarSize?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  shape: 'line',
  size: 'md',
  animated: true,
  showContent: false,
  ariaLabel: 'Carregando conteúdo...',
  rows: 3,
  avatar: false,
  avatarSize: 'md',
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
.skeleton {
  background: var(--color-secondary-200);
  border-radius: var(--border-radius-md);
  position: relative;
  overflow: hidden;
  margin-bottom: var(--spacing-3);
}

/* Shapes */
.skeleton--line {
  height: 1em;
  width: 100%;
}

.skeleton--circle {
  border-radius: var(--border-radius-full);
  aspect-ratio: 1;
}

.skeleton--rectangle {
  width: 100%;
  height: 100%;
}

.skeleton--avatar {
  border-radius: var(--border-radius-full);
  aspect-ratio: 1;
}

.skeleton--title {
  height: 1.5em;
  width: 100%;
  border-radius: var(--border-radius-sm);
}

.skeleton--paragraph {
  height: 1em;
  width: 100%;
  border-radius: var(--border-radius-sm);
}

/* Sizes */
.skeleton--xs {
  min-height: var(--spacing-4);
  min-width: var(--spacing-4);
}

.skeleton--sm {
  min-height: var(--spacing-5);
  min-width: var(--spacing-5);
}

.skeleton--md {
  min-height: var(--spacing-6);
  min-width: var(--spacing-6);
}

.skeleton--lg {
  min-height: var(--spacing-8);
  min-width: var(--spacing-8);
}

.skeleton--xl {
  min-height: var(--spacing-10);
  min-width: var(--spacing-10);
}

.skeleton--2xl {
  min-height: var(--spacing-12);
  min-width: var(--spacing-12);
}

/* Avatar sizes */
.skeleton--avatar.skeleton--sm {
  width: var(--spacing-8);
  height: var(--spacing-8);
}

.skeleton--avatar.skeleton--md {
  width: var(--spacing-10);
  height: var(--spacing-10);
}

.skeleton--avatar.skeleton--lg {
  width: var(--spacing-12);
  height: var(--spacing-12);
}

/* Animation */
.skeleton--animated::before {
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

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
