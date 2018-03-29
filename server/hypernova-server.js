// const bundle = require('../client/dist/bundle.js');
const hypernova = require('hypernova/server');
// const renderReact = require('hypernova-react').renderReact;

// var hypernova = require('hypernova/server');

hypernova({
  devMode: true,

  getComponent(name) {
    if (name === 'MyComponent.js') {
      // return require('./app/assets/javascripts/MyComponent.js');
    	return require('./MyComponent.js');
    }
    return null;
  },

  port: 3030,
});


// hypernova({
//     getComponent(name) {
//         for (let componentName in bundle) {
//             if (name === componentName) {
//                 return renderReact(componentName, bundle[componentName]);
//             }
//         }

//         return null;
//     }
// });