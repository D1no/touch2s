# kickstart-simple by thereactivestack

Kickstart a simple project fast!

If you would like a more sophisticated kickstart with code splitting, see the [kickstart-hugeapp project](https://github.com/thereactivestack/kickstart-hugeapp).

Clone this project to start a simple project using Meteor, React.js and Webpack.

1. `git clone https://github.com/thereactivestack/kickstart-simple.git`
1. `cd kickstart-simple`
1. `meteor`

## Windows fix
You have to remove the unix symbolic link node_modules and create a Windows symbolic link:
`MKLINK /D node_modules packages\npm-container\.npm\package\node_modules`

## The stack & features
- Include the simple todo app example
- ES6 modules
- Meteor
- React.js
- react-router with server-rendering (you can disable it by editing `server/entry.js`)
- Webpack (bundle your app / assets and send them to Meteor)
- Hot-reload with no page refresh in development mode
- Optimize your code in production mode
- Give access to NPM by using packages.json

## How does it work?
Webpack needs one [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-simple/blob/master/client/webpack.conf.js) file for the client and one [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-simple/blob/master/server/webpack.conf.js) for the server. It allows you to have a better control over the build process. Every other files are not automatically included by Meteor. Everything is starting from your entry point.

The server entry point in the project is at [`server/entry.js`](https://github.com/thereactivestack/kickstart-simple/blob/master/server/entry.js). Everything that you want to load on your Meteor server, they have to be imported or required in some way.

The client entry point in the project is at [`client/entry.js`](https://github.com/thereactivestack/kickstart-simple/blob/master/server/entry.js) and work the same way as on the server, except it is run on the browser or Cordova.

You can use any package coming from NPM by adding it to [`packages.json`](https://github.com/thereactivestack/kickstart-simple/blob/master/packages.json).

Go look at them, they are simple!

## Production
To run or build in production, you need to set your environment variable NODE_ENV to production.

You can use meteor run, meteor build, mup or anything working with Meteor.

## Run in production mode
`NODE_ENV=production meteor run --production`

## Build for production
`NODE_ENV=production meteor build .`

Then, you can run `bundle/main.js` without it.

*We are going to remove this once we have a fix that detect Meteor production mode in a compiler*

# Troubleshooting

## Module build failed: ReferenceError: Unknown plugin "react-transform"
It seems like the babel plugins are not looking into the correct directory and their is no setting to fix that. However, what you can do is create a symbolic link in your project root to the correct folder:

`ln -s packages/npm-container/.npm/package/node_modules`

*We are going to remove this step once we have a fix*
