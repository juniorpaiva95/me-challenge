<template>
  <div
    :class="[
      'ui-call-to-action',
      `ui-call-to-action--${variant}`,
      `ui-call-to-action--${size}`,
      { 'ui-call-to-action--full-width': fullWidth },
    ]"
  >
    <div class="ui-call-to-action__content">
      <div class="ui-call-to-action__text">
        <h3 v-if="title" class="ui-call-to-action__title">{{ title }}</h3>
        <slot name="description">
          <p
            v-if="description && typeof description === 'string'"
            class="ui-call-to-action__description"
          >
            {{ description }}
          </p>
        </slot>
      </div>
    </div>

    <div class="ui-call-to-action__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  title?: string
  description?: string | Component
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  fullWidth: false,
})
</script>

<style scoped>
.ui-call-to-action {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-secondary-200);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.ui-call-to-action:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.ui-call-to-action--full-width {
  width: 100%;
}

/* Variants */
.ui-call-to-action--default {
  border-color: var(--color-secondary-200);
}

.ui-call-to-action--primary {
  border-color: var(--color-primary-200);
  background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100));
}

.ui-call-to-action--success {
  border-color: var(--color-success-light);
  background: linear-gradient(135deg, var(--color-success-light), #d1fae5);
}

.ui-call-to-action--warning {
  border-color: var(--color-warning-light);
  background: linear-gradient(135deg, var(--color-warning-light), #fef3c7);
}

.ui-call-to-action--error {
  border-color: var(--color-error-light);
  background: linear-gradient(135deg, var(--color-error-light), #fee2e2);
}

/* Sizes */
.ui-call-to-action--sm {
  padding: var(--spacing-4);
}

.ui-call-to-action--md {
  padding: var(--spacing-6);
}

.ui-call-to-action--lg {
  padding: var(--spacing-8);
}

/* Content */
.ui-call-to-action__content {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.ui-call-to-action__text {
  flex: 1;
}

.ui-call-to-action__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-secondary-900);
  margin: 0 0 var(--spacing-2) 0;
  line-height: var(--line-height-tight);
}

.ui-call-to-action__description {
  font-size: var(--font-size-base);
  color: var(--color-secondary-700);
  margin: 0;
  line-height: var(--line-height-normal);
}

/* Actions */
.ui-call-to-action__actions {
  display: flex;
  gap: var(--spacing-3);
  flex-wrap: wrap;
}

.ui-call-to-action__button {
  padding: var(--spacing-3) var(--spacing-5);
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
}

/* Responsive */
@media (max-width: var(--breakpoint-md)) {
  .ui-call-to-action__content {
    flex-direction: column;
    text-align: center;
  }

  .ui-call-to-action__actions {
    justify-content: center;
  }
}
</style>
