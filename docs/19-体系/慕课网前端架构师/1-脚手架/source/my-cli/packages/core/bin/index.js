#!/usr/bin/env node
import { fileURLToPath } from 'url'
import importLocal from 'import-local'
import { log } from '@dcli/utils'
import main from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
if (importLocal(__filename)) {
  log.info('', '正在使用 black-cli 本地版本')
} else {
  main(process.argv.slice(2))
}
