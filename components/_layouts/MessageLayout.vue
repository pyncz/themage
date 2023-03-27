<template>
  <div class="tw-app-container tw-min-h-screen tw-py-8">
    <app-header />
    <main class="tw-container tw-py-8 tw-flex-1 tw-text-center tw-flex-center">
      <div class="tw-max-w-sm tw-pb-8">
        <slot />
      </div>
    </main>
    <app-footer />
  </div>
</template>
