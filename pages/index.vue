<template>
  <main class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)] md:tw-grid-cols-2">
    <div class="tw-app-container sm:tw-min-h-screen tw-py-8">
      <app-header />
      <div class="tw-flex-1">
        hey
      </div>
      <app-footer class="tw-hidden sm:tw-inline-flex" />
    </div>

    <div class="tw-app-container tw-h-[40rem] sm:tw-h-screen tw-py-6 sm:tw-py-8">
      <div class="tw-bg-3 tw-rounded-lg tw-py-8 tw-app-container tw-flex-1 sm:tw--m-2">
        preview
      </div>
    </div>
  </main>

  <app-footer class="tw-app-container tw-pb-8 sm:tw-hidden" />
</template>
