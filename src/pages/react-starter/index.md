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
<br>

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