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

There will be a few questions to answer, but once thats done you'll have a **package.json** file.

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

It might also be a good idea to add a **.gitignore** file. We don't want to add the **/node_modules** folder when we commit our changes to version control. 

```.gitignore
# Dependency directories
node_modules/
```

Ok let's add some core dependencies for our React project. We'll want `webpack` which lets us bundle all our files into a single file to be used for production. We'll also add `webpack-cli` which lets us use `webpack` with the command line. 

We'll also install everything we need to transpile ES6 and JSX code into ES5. We have to do this because of a lack of browser support for ES6 and JSX. That's where `babel` comes in. 

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

Since our component has no state, we can simplify the code and remove a lot of unnecessary scaffolding. Our updated **App.js** file looks like this.

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

So now that we have our **index.html** file and a React component to be rendered, how do we actually do that? This is where importing `react-dom` comes into play. 

Inside the **/src** folder, create an **index.js** file.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

All that's going on here is that we're taking our `<App />` component that we defined in **App.js** and sticking it inside the root div element inside **index.html**. That's why we left that element blank. Using `ReactDOM` is how we render React components as viewable html.

---

Now that we have our files, we'll want to compile and bundle them into a single JavaScript file executable by the browser using `webpack`. To do that, we'll need a **webpack.config.js** file in our root directory.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

Let's break down what's going on here.

We first define our entry to the project, which is where we call the `ReactDOM.render()` function. So, we'll specify the path to **index.js**.

The output defines where we want to place our bundled file after `webpack` does its compiling. We create a public path to a new folder named **/dist** that will be created when we compile our files. Inside it, we define **bundle.js** which will be the result of our compiled files.

It's also probably a good idea to add a new rule to the **.gitignore** that will ignore our newly created **/dist** folder.

```.gitignore
# Dependency directories
node_modules/

# Compiled output
/dist
```

---

Next, we'll want to specify our loaders which are the ways we tell `webpack` how to transform certain modules. Loaders can transform files from one language to another (JSX to JavaScript) or turn images into data URLs.

We specify a new rule that we want to use the `babel` compiler on all our JavaScript and JSX files, except those in our **/node_modules** folder.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
```

To do this, we have to specify our file types and folders by using a regex expression. Then we just say which loader we want to use. In this case, it's `babel-loader`.

---

With `webpack` ready to work with `babel`, we need to specify what `babel` should do now. In your root directory, create a **.babelrc** file, which is a configuration file for `babel`.

```.babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

This file tells `babel` which presets we want to use that we added earlier with yarn to transpile our code. 

**babel-preset-env**: Transpiles ES6, ES7, and ES8 code to ES5<br>
**babel-preset-react**: Transpiles JSX code to ES5<br>

---

With `babel` configured, we can go ahead and get CSS files to work with our project as well. 

We'll want to add `style-loader` and 'css-loader` to our project as dev dependencies.

```bash
yarn add style-loader css-loader --dev
```

Here **style-loader** allows us to add CSS by injecting a `<style>` tag into our transpiled code, and **css-loader** interprets import statements like `@import` or `import/require()` for CSS files.

Let's configure these dependencies by adding a rule to **webpack.config.js**.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

We tell `webpack` that we want to use **style-loader** and **css-loader** on all of our CSS files. Let's add an **App.css** file to our **/src** folder. We can keep the styling really simple for now.

```css
.App {
  margin: 1rem;
  font-family: Arial, Helvetica, sans-serif;
}
```

Now we can move on to getting our code up and running with `webpack`.

---

To be able to run our project, we can add **webpack-dev-server** as a dev dependency.

```bash
yarn add webpack-dev-server --dev
```

We'll also have to configure our development server in **webpack.config.js**.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist'
  }
};
```

The content base is where our **index.html** file lives, the same file which we render our React code onto. The public path is where our bundled files exist as a URL. We also get to specify the port where our development server will run.

The only thing left to do is add a scripts key to **package.json** which will run our development server. 

```json
{
  "scripts": {
    "start": "webpack-dev-server --mode development --open --hot"
  }
}
```

The start script will run our server  and the two flags `--open` and `--hot` allow the webpage to refresh whenever a change is made to your code. 

To see the code in action, run the following command in the terminal and your browser should automatically open up at ht<span>tp://localhost:3000..
```bash
yarn start
# or npm start
```

And that's everything! You now have your own functional React boilerplate made from scratch. Feel free to check out this project on [Github](https://github.com/Alec1017/react-starter-code/tree/simple) as well.




