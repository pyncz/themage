<template>
  <disclosure-container
    v-slot="{ open, close }"
    as="div"
    class="tw-text-sm tw-py-1"
    :default-open="initialOpened"
  >
    <disclosure-button
      class="tw-mb-1 ui-open:tw-text-opacity-full tw-text-dim-2 tw-text-opacity-soft hover:tw-text-opacity-full tw-duration-fast tw-font-medium tw-border-b tw-border-dashed tw-border-b-dim-3 hover:tw-border-b-dim-2"
    >
      <slot name="toggle" v-bind="{ open, close }">
        <div class="tw-duration-normal tw-inline ui-open:tw-text-dim-1">
          {{ message }}
        </div>

        <transition appear name="v-fade" mode="out-in">
          <icon
            name="chevron-down"
            class="tw-text-dim-3 group-hover:tw-text-dim-2 ui-open:tw-rotate-180 tw-duration-fast tw-inline-flex tw-relative tw-left-0.5"
          />
        </transition>
      </slot>
    </disclosure-button>
    <disclosure-panel class="tw-p-4 tw-rounded tw-border tw-border-dim-3">
      <slot v-bind="{ close }" />
    </disclosure-panel>
  </disclosure-container>
</template>

<script setup lang="ts">
import {
  DisclosureButton,
  Disclosure as DisclosureContainer,
  DisclosurePanel,
} from '@headlessui/vue'

defineProps<{
  message?: string
  initialOpened?: boolean
}>()
</script>
