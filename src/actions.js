/* eslint-disable no-param-reassign */
import decorate from 'k-mst-purifier'
import pathToRegexp from 'path-to-regexp'

export const afterCreate = self => () => {
  self.init()
}

export const go = self => (screenName, params = null) => {
  // get screen reference from name
  const screen = self.screens.find(sc => sc.name === screenName)

  // save to the store
  self.current = screen
  self.params = params

  // save to the navigator
  const toPath = pathToRegexp.compile(screen.path)
  window.history.pushState(null, screen.name, toPath(params))
}

export const init = self => () => {
  const { pathname } = window.location

  let found = false
  for (let i = 0; i < self.screens.length && !found; i += 1) {
    const screen = self.screens[i]
    const params = []
    const match = pathToRegexp(screen.path, params, { sensitive: true }).exec(pathname)

    found = !!match
    if (found) {
      self.go(
        screen.name,
        params
          .map(({ name }, index) => ({ [name]: match[index + 1] }))
          .reduce(
            (acc, curr) => ({ ...acc, ...curr }),
            {},
          ),
      )
    }
  }
}

export default decorate({
  afterCreate,
  go,
  init,
})
