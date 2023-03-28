<template>
  <nuxt-loading-indicator color="rgb(var(--accent-1))" />

  <nuxt-page v-if="isOnline" />
  <message-layout v-else>
    <p class="tw-text-3">
      {{ $t('errors.noConnection') }}
    </p>
  </message-layout>
</template>

<script setup lang="ts">
const { isOnline } = useNetwork()
const { t } = useI18n()

// Set up meta tags
const baseUrl = getAbsoluteBaseUrl()
const route = useRoute()

const href = computed(() => `${baseUrl}${route.path}`)

useSeoMeta({
  title: 'var(--themage)',
  description: t('pages.index.description'),

  ogTitle: t('pages.index.title'),
  ogDescription: t('pages.index.description'),
  ogType: 'website',
  ogSiteName: 'themage',
  ogImage: `${baseUrl}/img/cover.jpg`,
  ogUrl: href,

  twitterTitle: t('pages.index.title'),
  twitterDescription: t('pages.index.description'),
  twitterCard: 'summary_large_image',
  twitterSite: `@${APP_TWITTER_HANDLE}`,
})
</script>
