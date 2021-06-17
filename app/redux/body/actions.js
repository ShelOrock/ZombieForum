import DRAFT_BODY from './constants.js'

export default (bodyText = '', codeBlocks = {}) => {
  return {
    type: DRAFT_BODY,
    body: { bodyText, codeBlocks },
  }
}