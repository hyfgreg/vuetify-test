import { loadApp } from "../common/loadApp"

const _mutationMap = {}
const _actionMap = {}

loadApp(_mutationMap, "mutationMap")
loadApp(_actionMap, "actionMap")

window.mutationMap = _mutationMap
export const mutationMap = _mutationMap
export const actionMap = _actionMap
