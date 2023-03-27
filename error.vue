<template>
  <message-layout>
    <h1>
      {{ title }}
    </h1>
    <div class="tw-space-y-2">
      <p class="tw-text-2">
        {{ message }}
      </p>
      <div>
        <a role="button" @click="clearError({ redirect: '/' })">
          {{ $t('goHome') }}
        </a>
      </div>
    </div>
  </message-layout>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
})

const { t } = useI18n()
const error = toRef(props, 'error')

const title = computed(() => error.value?.statusCode ?? t('errors.default'))
const message = computed(() => error.value?.statusCode === 404
  ? t('errors.notFound')
  : t('errors.unexpected'),
)

useHead({
  title: `var(--themage-error${error?.value?.statusCode ? `-${error.value.statusCode}` : ''})`,
})
</script>
