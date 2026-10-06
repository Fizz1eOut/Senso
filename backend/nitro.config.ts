export default defineNitroConfig({
  compatibilityDate: '2026-10-04',
  srcDir: '.',
  routeRules: {
    '/**': { cors: false },
  },
})