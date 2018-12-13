---
title: Building a React Project from Scratch
date: "2018-12-06T21:46:37.121Z"
intro: "\"What I cannot create, I do not understand\" -Richard Feynman"
---

React has a pretty steep learning curve because of all its dependencies and configurations. Luckily, the developers over at Facebook put together [create-react-app](https://github.com/facebook/create-react-app) to make our lives easier.

But I thought it would be a good exercise to start a React project the good old-fashioned way.

Let's dive in.

---

The first thing you'll want to do is initialize the project with a package manager. I like to use Yarn but npm is just fine too.

```bash
yarn init
# or npm init
```

There will be a few questions to answer, but once thats done you'll have a package.json file.

```json
{
  "name": "react-starter-code-tutorial",
  "version": "1.0.0",
  "description": "react starter code from scratch",
  "main": "index.js",
  "repository": "git@github.com:Alec1017/react-starter-code-tutorial.git",
  "author": "Alec DiFederico",
  "license": "MIT"
}
```

It might also be a good idea to add a .gitignore file. We don't want to add the node_modules folder when we commit. 

```.gitignore
# Dependency directories
node_modules/
```

Ok let's add some core dependencies for our React project. We'll want `webpack` which lets us bundle all our files into a single file to be used for production. We'll also add `webpack-cli` which lets us use `webpack` with the command line. 

We'll also install everything we need to transpile ES6 and JSX code into ES5. We have to do this because of a lack of browser support for ES6 and JSX. That's where Babel comes in. 

We'll need `babel-core`, `babel-loader`, `babel-preset-env`, and  `babel-preset-react`.

```bash
yarn add webpack webpack-cli --dev
yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader --dev
```


**babel-core**: Lets you use next-gen JavaScript<br>
**babel-preset-env**: Transpiles ES6, ES7, and ES8 code to ES5<br>
**babel-preset-react**: Transpiles JSX code to ES5<br>
**babel-loader**: Webpack plugin for Babel<br>

We'll also want to add `react` and `react-dom`.

```bash
yarn add react react-dom
```

---

Alright now that we've got some of the main dependencies out of the way, we can start writing some React code. First, create a **/public** folder in the project root and add an **index.html** file. 

```html
<!-- index.html -->
<html>
  <head>
    <meta charset="UTF-8" />
    <meta 
      name="viewport" 
      content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>React Starter</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

The root div element is where we will render our React code.

We'll also create a **/src** folder in the project root which will house our first React component. Add an **App.js** file to it.

```jsx
// App.js
import React from 'react';

class App extends React.component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <h1>Hello, World!</h1>
      </div>
    );
  }
}

export default App;
```

So on the first line we're importing `react` which allows us to create our React component named App. Next we have the constructor which takes in `props` and passes them to `super()`. We don't have to deal with that now, but just know that `props` is used for passing values to the React component from the outside.

We also have our `render()` function, which exists in all react components. This is where we return our JSX code which will actually be rendered.

Finally we export the component so it can be accessed elsewhere in our project.

Since our component has no state, we can simplify the code and remove a lot of unnecessary scaffolding. Our updated App.js file looks like this.

```jsx
// App.js
import React from 'react';


const App = () => (
  <div className="App">
    <h1>Hello, World!</h1>
  </div>
);

export default App;
```

Definitely looks a lot cleaner.

---

So now that we have our index.html file and a React component to be rendered, how do we actually do that? This is where importing `react-dom` comes into play. 

Inside the **/src** folder, create an **index.js** file.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

All that's going on here is that we're taking our `<App />` component that we defined in **App.js** and sticking it inside the root div element inside **index.html**. That's why we left that element blank. Using `ReactDOM` is how we render React components as viewable html.
