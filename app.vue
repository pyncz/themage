<template>
  <theme-wrapper>
    <nuxt-loading-indicator color="rgb(var(--accent-primary-500))" />

    <nuxt-page v-if="isOnline" />
    <message-layout v-else>
      <p class="tw-text-dim-2">
        {{ $t('errors.noConnection') }}
      </p>
    </message-layout>
  </theme-wrapper>
</template>

<script setup lang="ts">
const { isOnline } = useNetwork()
const { t } = useI18n()

// Set up meta tags
const baseUrl = getAbsoluteBaseUrl()
const route = useRoute()

useSeoMeta({
  title: 'var(--themage)',
  description: t('pages.index.description'),

  ogTitle: t('pages.index.title'),
  ogDescription: t('pages.index.description'),
  ogType: 'website',
  ogSiteName: 'themage',
  ogImage: () => `${baseUrl}/img/cover.jpg`,
  ogUrl: () => `${baseUrl}${route.path}`,

  twitterTitle: t('pages.index.title'),
  twitterDescription: t('pages.index.description'),
  twitterCard: 'summary_large_image',
  twitterSite: `@${APP_TWITTER_HANDLE}`,
})
</script>
