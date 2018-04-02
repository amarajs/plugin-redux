## [@amarajs/plugin-redux](https://github.com/amarajs/plugin-redux)

Plugin middleware for AmaraJS to connect features to a Redux store.

Actions dispatched to your `Amara` instance (e.g. through features using the [`@amarajs/plugin-events`](https://github.com/amarajs/plugin-events) middleware) will also be dispatched to your Redux store. A new boolean property, `__Amara__`, will be added to any actions dispatched to your store through Amara. Your Redux middleware, reducers, sagas, etc. can look for this property to know if the action was dispatched through this middleware.

### Installation

`npm install --save @amarajs/plugin-redux`

### Usage

```javascript
import Amara from '@amarajs/core';
import AmaraRedux from '@amarajs/plugin-redux';
import myStore from './store';
const amara = new Amara([
    AmaraRedux(myStore)
]);
```

### Feature Type

The `@amarajs/plugin-redux` middleware does not handle any feature types.

### New `args` Property

This plugin adds a `'state'` property to `args` functions. Whenever your Redux store state changes, AmaraJS will re-evaluate any features whose `args` functions reference the `'state'` property.

```javascript
amara.add({
    type: 'dom',
    targets: ['main'],
    args: {
        // this selector will be re-invoked every
        // time your Redux store's state changes
        loading: ({state}) => state.loading
    },
    // this method will be re-invoked every time
    // the value of state.loading changes
    apply: ({loading}) => loading && 'please wait...' || 'ready!';
});
```

### Customization

This plugin accepts a single argument, which should be a Redux store.

### Contributing

If you have a feature request, please create a new issue so the community can discuss it.

If you find a defect, please submit a bug report that includes a working link to reproduce the problem (for example, using [this fiddle](https://jsfiddle.net/04f3v2x4/)). Of course, pull requests to fix open issues are always welcome!

### License

The MIT License (MIT)

Copyright (c) Dan Barnes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
