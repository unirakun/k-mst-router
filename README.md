# k-mst-router

Make a Router from [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) model !

[![CircleCI](https://circleci.com/gh/alakarteio/k-mst-router.svg?style=shield)](https://circleci.com/gh/alakarteio/k-mst-router) [![Coverage Status](https://coveralls.io/repos/github/alakarteio/k-mst-router/badge.svg?branch=master)](https://coveralls.io/github/alakarteio/k-mst-router?branch=master) [![NPM Version](https://badge.fury.io/js/k-mst-router.svg)](https://www.npmjs.com/package/k-mst-router)
[![Size](http://img.badgesize.io/alakarteio/k-mst-router/master/index.js.svg)]()

## Contents
 - [Purpose](#purpose)
 - [Why ?](#why)
 - [Installation](#installation)
 - [API](#api)
 - [Examples](#examples)

## Purpose
TODO

## Why
TODO

## Installation
 - `yarn add k-mst-router`
 - `npm i --save k-mst-router`

## API
  1. Import the Model from **k-mst-router**: `import Router from 'k-mst-router'`
  2. Use it to one of your model, and initialize it with a `preProcessSnapshot` :
  ```es6
    import { types } from 'mobx-state-tree'
    import Router from 'k-mst-router'

    export default types
      .model({
        router: Router,
      })
      .named('Store')
      .preProcessSnapshot(snapshot => ({
        ...snapshot,
        router: {
          screens: [
            {
              name: 'list',
              path: '/',
            },
            {
              name: 'new',
              path: '/new',
            },
            {
              name: 'authentication',
              path: '/login',
            },
            {
              name: 'edit',
              path: '/contacts/:id',
            }
          ],
        },
      }))
  ```
  3. Change routes with `go` action: `store.router.go('new')`
  4. It supports parameters: `store.router.go('edit', { id: 3 })`

# About ![alakarte](https://i.imgur.com/PKlqzvj.png)
**alakarte** is created by two passionate french developers.

Do you want to contact them ? Go to their [website](http://alakarte.io)

<table border="0">
 <tr>
  <td align="center"><img src="https://avatars1.githubusercontent.com/u/26094222?s=460&v=4" width="100" /></td>
  <td align="center"><img src="https://avatars1.githubusercontent.com/u/17828231?s=460&v=4" width="100" /></td>
 </tr>
 <tr>
  <td align="center"><a href="https://github.com/guillaumecrespel">Guillaume CRESPEL</a></td>
  <td align="center"><a href="https://github.com/fabienjuif">Fabien JUIF</a></td>
</table>
