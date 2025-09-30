export async function register() {
  process.on('uncaughtException', (err) => {
    console.error('[INSTRUMENTATION] uncaughtException:', err)
  })
  process.on('unhandledRejection', (reason) => {
    console.error('[INSTRUMENTATION] unhandledRejection:', reason)
  })
}

