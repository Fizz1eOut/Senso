export default defineNuxtConfig({
  ssr: false,
  imports: {
    autoImport: false
  },
  components: {
    dirs: []
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],
  supabase: {
    redirect: false,
  },
  css: [
    '~/assets/styles/tokens.css',
    '~/assets/styles/theme.css',
    '~/assets/styles/main.css'
  ],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Senso',
      link: [
        { rel: 'icon', href: `${process.env.NUXT_APP_BASE_URL || '/'}favicon.ico` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Orbitron:wght@400..900&family=Geist:wght@100..900&family=Syne:wght@400..800&display=swap'
        }
      ]
    }
  },
  vite: {
    plugins: [
      (await import('vite-svg-loader')).default({
        svgo: false
      })
    ]
  }
});
