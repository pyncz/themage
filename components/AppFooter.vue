<template>
  <footer class="tw-opacity-muted tw-flex tw-flex-col xs:tw-flex-row tw-gap-2 tw-items-center">
    <nav class="tw-inline-flex tw-gap-2">
      <a
        class="tw-text-lg tw-inline-flex"
        :href="`https://twitter.com/${APP_TWITTER_HANDLE}`"
        target="_blank"
        rel="noreferrer noopener"
      >
        <icon name="twitter" />
      </a>
      <a
        class="tw-text-lg tw-inline-flex"
        :href="`https://github.com/${APP_GITHUB_USERNAME}`"
        target="_blank"
        rel="noreferrer noopener"
      >
        <icon name="github" />
      </a>
    </nav>
    <span class="tw-text-3 tw-text-xs tw-inline-block">
      © {{ yearsFrom }}. Made by
      <a href="https://github.com/pyncz" target="_blank" rel="noreferrer noopener">
        pyncz
      </a>
    </span>
  </footer>
</template>

<script lang="ts" setup>
const yearsFrom = getYearsFrom(2023)
</script>
