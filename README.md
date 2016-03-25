# Redux PureScript Example

## About

This project is a work-in-progress example/boilerplate demonstrating my attempt
to write Redux reducers and actions in PureScript.

### Motivation

Browser apps are getting ever so complicated as browsers gain new capabilities
and move from simple document viewers to full-fledged app platforms. We need
better tools as plain JS is just not enough to deal with this complexity.

Writing your business logic and parts of your app interacting with the outside
world (e.g. AJAX requests) in languages like Haskell or PureScript makes a huge
difference. They help you manage side effects, avoid callback hell, create
testable code, and use libs like QuickCheck. **This is my attempt to find a
sweet spot which can reduce the surface area for bugs to linger while still
benefiting from the great tooling React and Redux ecosystem offers.**

### Important bits

* You can dispatch actions written in PureScript. These are defined using
  `Redux.Action.action` and `Redux.Action.asyncAction` utility functions found
  in
  [`purescript-redux-utils`](https://github.com/osener/purescript-redux-utils/tree/master/docs/Redux).
  See
  [`src/Actions.purs`](https://github.com/osener/redux-purescript-example/blob/master/src/actions/Actions.purs)
  for some examples.
* You can write your reducers in PureScript. Use `Redux.Reducer.reducer` utility
  function to define them (also from `purescript-redux-utils`). See
  [`src/Reducers.purs`](https://github.com/osener/redux-purescript-example/blob/master/src/reducers/Reducers.purs)
  for some examples.
* Components are created using React and JSX.
* Hot reloading and Redux devtools!

### Installation

```bash
git clone https://github.com/osener/redux-purescript-example.git
cd redux-purescript-example
bower install
npm install
npm start
open http://localhost:3000
```

### TODOs

* Try to reintroduce some of the type safety sacrificed for ease of use from JS
* Investigate whether Immutable.js would be useful for this
* Investigate using TypeScript or Flow for JS bits (maybe generate type definitions?)
* Improve the example code by adding useful stuff like routing, CSS, etc.
* Implement a more real-world(ish) app (TodoMVC?)

## Thanks

* [@gaearon](https://github.com/gaearon) for Redux and a bunch of other tools
  that improve the state of front-end development. This project is based on
  [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate),
  and all of the caveats mentioned in its README apply to this project as well.

## License

CC0 (public domain)
