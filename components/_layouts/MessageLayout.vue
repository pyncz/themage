<template>
  <div class="tw-app-container tw-min-h-screen tw-py-8">
    <app-header />
    <section class="tw-container tw-py-8 tw-flex-1 tw-text-center tw-flex-center">
      <div class="tw-max-w-sm tw-pb-8">
        <slot />
      </div>
    </section>
    <app-footer />
  </div>
</template>
