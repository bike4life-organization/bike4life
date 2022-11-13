import validateEnv from '@utils/validateEnv'
import startPullListener from './pull-listener'
;(async () => {
  try {
    validateEnv()
    if (false) {
      // await startPushListener(honeyClient)
    } else {
      await startPullListener()
    }
  } catch (err) {
    process.exit(1)
  }
})()
