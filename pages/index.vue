<template>
  <main class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)] md:tw-grid-cols-2">
    <div class="tw-app-container sm:tw-min-h-screen tw-py-8">
      <app-header />

      <div class="tw-flex-1 tw-space-y-4 tw-py-6 sm:tw-py-8 tw-max-w-xl tw-w-full tw-ml-auto">
        <lib-file-input
          v-slot="{ clear }"
          v-model="fileInputValue"
          class="tw-text-center tw-group/input"
          accept="image/*"
        >
          <Transition mode="out-in">
            <div v-if="isProcessing" class="tw-rounded tw-w-full tw-text-3 tw-flex-center tw-h-image tw-animate-pulse tw-bg-2">
              {{ $t('processing') }}
            </div>
            <div v-else-if="imageDataString" class="tw-space-y-4 tw-w-full">
              <div class="tw-h-image">
                <img
                  ref="image"
                  :src="imageDataString"
                  class="tw-size-full tw-object-contain"
                  :alt="name ?? $t('imageDefaultAlt')"
                >
              </div>
              <div class="tw-max-w-xs tw-mx-auto tw-flex tw-flex-col 2xs:tw-flex-row tw-gap-y-3 tw-gap-x-4">
                <button class="tw-button 2xs:tw-flex-1 tw-w-full xs:tw-w-auto tw-mx-auto" @click="clear()">
                  {{ $t('clear') }}
                </button>
                <div class="tw-button 2xs:tw-flex-1 tw-w-full xs:tw-w-auto tw-mx-auto">
                  {{ $t('uploadNewImage') }}
                </div>
              </div>
            </div>
            <div v-else class="tw-text-3 tw-w-full tw-h-image tw-flex-center tw-flex-col tw-gap-1 tw-pb-1 tw-relative before:tw-absolute before:tw-inset-0 before:tw-mask-radial before:tw-opacity-muted before:tw-bg-[repeating-linear-gradient(45deg,_rgba(var(--color-4),_0)_10px,_rgb(var(--color-4))_10px,_rgb(var(--color-4))_11px,_rgba(var(--color-4),_0)_11px,rgba(var(--color-4),_0)_26px)]">
              <icon name="image" class="tw-duration-fast tw-text-4 tw-text-lg group-data-[over=true]/input:tw-text-accent-1" />
              <div>
                {{ $t('uploadImage') }}
              </div>
            </div>
          </Transition>
        </lib-file-input>

        <div>
          tweak theme
        </div>
      </div>

      <app-footer class="tw-hidden sm:tw-inline-flex" />
    </div>

    <div class="tw-app-container tw-h-[40rem] sm:tw-h-screen tw-py-6 sm:tw-py-8 tw-max-w-xl tw-w-full tw-mr-auto">
      <div class="tw-bg-3 tw-rounded-xl tw-py-8 tw-app-container tw-flex-1 sm:tw--m-2">
        Palette:
        <pre>{{ JSON.stringify(palette) }}</pre>

        Theme:
        <pre>{{ JSON.stringify(theme) }}</pre>
      </div>
    </div>
  </main>

  <app-footer class="tw-app-container tw-pb-8 sm:tw-hidden" />
</template>

<script setup lang="ts">
// Render the image on file uploaded
const fileInputValue = ref<File[]>([])
const imageFile = computed(() => fileInputValue.value[0])

const { isProcessing, name, imageDataString } = useImageFile(imageFile)

// Get theme by rendered image
const image = ref<HTMLImageElement | null>(null)

const { palette } = usePaletteByImageRef(image)
const { theme } = useThemeByPalette(palette)

// Apply current theme vars
useThemeApply(theme)
</script>
