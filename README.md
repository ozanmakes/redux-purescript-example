# Redux PureScript Example

![tmpimg](https://cloud.githubusercontent.com/assets/111265/14006914/915b6cee-f17a-11e5-8a29-acae68539852.png)

## About
This project is a work-in-progress example/boilerplate demonstrating my attempt
to write Redux reducers and actions in PureScript.

### Motivation

Browser apps are getting ever so complicated as browsers gain new capabilities
and move from simple document viewers to full-fledged app platforms. We need
better tools as plain JS is just not enough to deal with this complexity.

I love approaches that take front-end development up to eleven, such as
[Reflex](https://github.com/reflex-frp/reflex), [Elm](http://elm-lang.org/), and
[Halogen](https://github.com/slamdata/purescript-halogen), they prevent a large
class of bugs and edge cases, and help you write more robust web apps.
Unfortunately, simple virtual-dom wrappers slow me down a lot, especially when
I'm just prototyping UI's. I end up having to reinvent every single component in
my app. I don't think DOM diffing is the main selling point of React, in fact I
can go as far as to call it an implementation detail. React's real value comes
from its component system which makes creating reusable components very easy and
lets you choose from hundreds of third party components.

Writing your business logic and parts of your app interacting with outside world
(like AJAX calls) in languages like Haskell or PureScript makes a huge
difference. They help you manage side effects, avoid callback hell, create
testable code, and use libs like QuickCheck. In my experience writing pure views
using React is not error prone and doesn't (badly) need these properties. **This
is my attempt to find a sweet spot which can reduce the surface area for bugs to
linger while still benefiting from the great tooling React and Redux ecosystem
offers.**

This project is different than existing React bindings in that it is not way to
use React from PureScript. It doesn't have a `main` PureScript function that's
the entry point of the app, it just defines some PureScript functions which get
called from an otherwise traditional React+Redux codebase. It is my first go at
this approach, and I haven't used it for anything real yet.

Please let me know if you find any pain points, ways to introduce more type
safety, or any boilerplate that can be abstracted away.

### Important bits

* You can dispatch actions written in PureScript. These are defined using
  `Redux.Action.action` and `Redux.Action.asyncAction` utility functions found
  in
  [`purescript-redux-utils`](https://github.com/osener/purescript-redux-utils/tree/master/docs/Redux).
  See
  [`src/Actions.purs`](https://github.com/osener/redux-purescript-example/blob/master/src/Actions.purs)
  for some examples.
* You can write your reducers in PureScript. Use `Redux.Reducer.reducer` utility
  function to define them (also from `purescript-redux-utils`). See
  [`src/Reducers.purs`](https://github.com/osener/redux-purescript-example/blob/master/src/Reducers.purs)
  for some examples.
* Components are created using React and JSX.
* Hot reloading and Redux devtools work like a charm.

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
