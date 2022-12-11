import { createRouter as customCreateRouter } from '../router.js'

const createDefaultRouter = null
const routerOptions = null

export function createRouter(ssrContext, config, store) {
  return customCreateRouter(ssrContext, createDefaultRouter, routerOptions, config, store)
}
