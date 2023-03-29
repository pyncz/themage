<template>
  <theme-wrapper>
    <message-layout>
      <h1>
        {{ title }}
      </h1>
      <div class="tw-space-y-2">
        <p class="tw-text-dim-1">
          {{ message }}
        </p>
        <div>
          <a
            class="tw-link"
            role="button"
            @click="clearError({ redirect: '/' })"
          >
            {{ $t('goHome') }}
          </a>
        </div>
      </div>
    </message-layout>
  </theme-wrapper>
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
