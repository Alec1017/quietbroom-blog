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


**babel-core**: <br>
**babel-preset-env**: Transpiles ES6, ES7, and ES8 code to ES5<br>
**babel-preset-react**: Transpiles JSX code to ES5<br>
**babel-loader**: Webpack plugin for Babel<br>

We'll also want to add `react` and `react-dom`.

```bash
yarn add react react-dom
```




