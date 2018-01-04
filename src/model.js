import { types } from 'mobx-state-tree'
import actions from './actions'

const ScreenDefinition = types
  .model({
    name: types.identifier(types.string),
    path: types.string,
  })
  .named('ScreenDefinition')

export default types
  .model({
    screens: types.array(ScreenDefinition),
    params: types.maybe(types.map(types.string)),
    current: types.maybe(types.reference(ScreenDefinition)),
  })
  .named('Router')
  .actions(actions)
  // Views:
  //  get current (Screen)
  // get params (current.params)
