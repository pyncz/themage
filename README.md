# themage
🧙‍♂️ Generate UI theme by image

![themage cover](./public/img/cover.jpg)

A little showcase app for generating UI themes by an image.

Select or drop an image, adjust the theme parameters, get theme variables.


### Tech stack

- ![TypeScript](https://img.shields.io/badge/TypeScript-%232f74c0.svg?&logo=typescript&logoColor=white)
- [![Vue 3](https://img.shields.io/badge/vue%203-%233fb27f.svg?logo=vue.js&logoColor=white)](https://vuejs.org)
- [![Nuxt 3](https://img.shields.io/badge/nuxt%203-%2300c58e.svg?logo=nuxt.js&logoColor=white)](https://v3.nuxtjs.org)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20-%2357a7e1.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
- [VueUse](https://vueuse.org)
- Icons: [`ionicons`](https://ionic.io/ionicons)
- Validation: [`vuelidate`](https://vuelidate-next.netlify.app)

Under the hood, palette colors are extracted with [`colorthief`](https://lokeshdhakar.com/projects/color-thief) and the themes are generated through a bunch of [`chroma.js`](https://www.vis4.net/chromajs) operations.
