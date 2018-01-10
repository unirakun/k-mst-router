/* eslint-env jest */

import Router from './index'

describe('k-mst-router', () => {
  it('should init with a simple router', () => {
    const router = Router.create({
      screens: [
        {
          name: 'home',
          path: '/',
        },
      ],
    })

    expect(router.toJSON()).toMatchSnapshot()
  })

  it('should init with siblings routes', () => {
    const router = Router.create({
      screens: [
        {
          name: 'home',
          path: '/',
        },
        {
          name: 'login',
          path: '/login',
        },
        {
          name: 'list',
          path: '/list',
        },
      ],
    })

    expect(router.toJSON()).toMatchSnapshot()
  })

  const create = () => Router.create({
    screens: [
      {
        name: 'home',
        path: '/',
      },
      {
        name: 'list',
        path: '/list',
      },
      {
        name: 'edit',
        path: '/list/:id',
      },
    ],
  })

  it('should go to edit sceen', () => {
    // mock
    jsdom.reconfigure({
      url: 'http://monsite.com/list/2',
    })
    window.history.pushState = jest.fn()

    // exec
    const router = create()

    // asserts
    expect({
      router: router.toJSON(),
      pushState: window.history.pushState.mock.calls,
    }).toMatchSnapshot()
  })

  it('should go to edit screen -with number param-', () => {
    const router = create()

    window.history.pushState = jest.fn()
    router.go('edit', { id: 2 })
    expect({
      router: router.toJSON(),
      pushState: window.history.pushState.mock.calls,
    }).toMatchSnapshot()
  })
})
