import { DRAFT_BODY } from './constants.js'

export default (bodyText = '', codeBlocks = {}) => ({
  type: DRAFT_BODY,
  body: { bodyText, codeBlocks },
})