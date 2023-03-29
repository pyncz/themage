<template>
  <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)] md:tw-grid-cols-2">
    <div class="tw-app-container sm:tw-min-h-screen tw-py-8">
      <app-header />

      <section class="tw-flex-1 tw-space-y-4 tw-pt-6 sm:tw-py-8 sm:tw-max-w-xl tw-w-full tw-ml-auto">
        <lib-file-input
          v-slot="{ clear }"
          v-model="fileInputValue"
          class="tw-text-center tw-group/input"
          accept="image/*"
        >
          <div v-if="isProcessing" class="tw-rounded tw-w-full tw-text-dim-2 tw-flex-center tw-h-image tw-animate-pulse tw-bg-dim-1">
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
              <button class="tw-button tw-button-muted 2xs:tw-flex-1 tw-w-full xs:tw-w-auto tw-mx-auto" @click.prevent="clear()">
                {{ $t('clear') }}
              </button>
              <div class="tw-button 2xs:tw-flex-1 tw-w-full xs:tw-w-auto tw-mx-auto">
                {{ $t('uploadNewImage') }}
              </div>
            </div>
          </div>
          <div v-else class="tw-text-dim-2 tw-w-full tw-h-image tw-flex-center tw-flex-col tw-gap-1 tw-pb-1 tw-relative before:tw-absolute before:tw-inset-0 before:tw-mask-radial before:tw-opacity-muted before:tw-bg-[repeating-linear-gradient(45deg,_rgba(var(--color-dim-3),_0)_10px,_rgb(var(--color-dim-3))_10px,_rgb(var(--color-dim-3))_11px,_rgba(var(--color-dim-3),_0)_11px,rgba(var(--color-dim-3),_0)_26px)]">
            <icon name="image" class="tw-duration-fast tw-text-dim-3 tw-text-lg group-data-[over=true]/input:tw-text-accent-primary" />
            <div>
              {{ $t('uploadImage') }}
            </div>
          </div>
        </lib-file-input>

        <switch-color-mode />

        <lib-disclosure :message="$t('tweakTheme')">
          tweak theme
        </lib-disclosure>
      </section>

      <app-footer class="tw-hidden sm:tw-inline-flex" />
    </div>

    <div class="tw-app-container tw-h-[40rem] sm:tw-h-screen tw-py-6 sm:tw-py-8 sm:tw-max-w-xl tw-w-full tw-mr-auto">
      <div class="tw-overflow-y-auto tw-bg-card tw-rounded-xl tw-py-8 tw-app-container tw-flex-1 sm:tw--m-2">
        <PalettePreview :colors="theme?.base" label="base" />
        <PalettePreview
          :colors="theme?.accent"
          :semantic-names="semanticNames"
          label="accent"
        />
      </div>
    </div>
  </div>

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
const { theme, metadata } = useThemeByPalette(palette, {
  // dim: 0,
  // contrast: 1,
  // shift: 0,
  // balance: 0,
  volume: 12,
  accentsVolume: 9,
  maxAccents: 3,
})

watch(metadata, () => {
  const root = document.querySelector('html')!

  // remove image-related classes
  root.classList.remove('image-light', 'image-dark')

  // bind color scheme parsed from image
  if (metadata.value) {
    root.classList.add(`image-${metadata.value?.scheme}`)
  }
})

// Apply current theme vars
const semanticNames = ['primary', 'secondary', 'tertiary']
useThemeApply(theme, { semanticNames })
</script>
