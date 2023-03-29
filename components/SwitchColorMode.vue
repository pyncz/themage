<template>
  <lib-radio
    v-if="colorModes.length > 1"
    v-model="$colorMode.preference"
    :options="colorModes"
  >
    <template #option="{ option }">
      <a
        v-if="option === 'image'"
        role="button"
        class="tw-inline-flex tw-text-dim-2 ui-not-checked:group-hover/option:tw-text-dim-1 ui-checked:tw-text-base"
        :title="$t('theme.image')"
      >
        <icon name="image" />
      </a>
      <a
        v-if="option === 'system'"
        role="button"
        class="tw-inline-flex tw-text-dim-2 ui-not-checked:group-hover/option:tw-text-dim-1 ui-checked:tw-text-base"
        :title="$t('theme.system')"
      >
        <icon name="desktop" />
      </a>
      <a
        v-else-if="option === 'light'"
        role="button"
        class="tw-inline-flex tw-text-dim-2 ui-not-checked:group-hover/option:tw-text-dim-1 ui-checked:tw-text-base"
        :title="$t('theme.light')"
      >
        <icon name="sun" class="tw-scale-[1.2]" />
      </a>
      <a
        v-else-if="option === 'dark'"
        role="button"
        class="tw-inline-flex tw-text-dim-2 ui-not-checked:group-hover/option:tw-text-dim-1 ui-checked:tw-text-base"
        :title="$t('theme.dark')"
      >
        <icon name="moon" />
      </a>
    </template>
  </lib-radio>
</template>
