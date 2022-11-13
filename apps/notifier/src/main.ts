import { config } from 'dotenv'
config({ path: '../../.env' })

import startPullListener from './pull-listener'

const start = (): Promise<void> => {
  return startPullListener()
}

start()