[Touich2S Live Demo](http://touch2s.meteor.com). A sister of the [kickstart-simple]( https://github.com/thereactivestack/kickstart-simple) & [hugeapp]( https://github.com/thereactivestack/kickstart-hugeapp) project by The Reactive Stack.

# Touch2S: Mobile Client & Server Side (✌️S)

Touch2S is a [Meteor](http://meteor.com), [React](https://facebook.github.io/react/index.html) and [Framework7](http://www.idangero.us/framework7/)-Mobile WebApp-Stack based on the [kickstart projects by thereactivestack](https://github.com/thereactivestack/kickstart). Remarkable is the use of webpack for chunking and the ability to render both on the server and the client. Hence, 2 Side-Rendering... 🤔 *Touch2S*. This approach enables very **low initial load times** while being **reactive** (Meteor) and extremely **responsive** (React's Virtual DOM meets Framework7)! 

![touch2s-v 0 2 2-demo](https://cloud.githubusercontent.com/assets/2397125/12060744/6b4d7a9c-af76-11e5-8e7c-8f1370c8556e.gif)

The goal of this stack is to make **SEO**, **target conversion** and **market penetration** a first priority with (mobile) apps that deliver value and a rich user experience immediately **over the browser**. 

### Getting Started
Clone this project to start a mobile web project using Meteor, React.js, Framework7 and Webpack. [Install Meteor]( https://www.meteor.com/install), than

1. `git clone https://github.com/D1no/touch2s.git`
1. `cd touch2s`
1. `meteor`

### The stack & features (similar to kickstart-simple)
- Framework7 (new in Touch2S)
- Use [TrackerReact]( https://github.com/ultimatejs/tracker-react) (new in Touch2S)
- Include the simple To-Do app example
- ES6 modules
- Meteor
- React.js
- react-router with server-side-rendering (SSR only runs on `meteor run –-production`! You can disable it by editing `server/entry.js`)
- Webpack (bundle your app / assets and send them to Meteor)
- Hot-reload with no page refresh in development mode
- Optimize your code in production mode
- Give access to NPM by using packages.json


# Working with Touch2S, React & Framework 7
This project started as an exploration of how to incorporate a “traditional, DOM manipulating library” with meteor and react. As a result, it turned out that React is way more resilient than expected: Making it possible to combine fast virtual DOM rendering with the app instance management and CSS3 magic of a library such as Framework7.

Libraries such as Framework7 are build around Ajax and static HTML. I.e. HTML snippets should be generated and provided by a PHP server for different views and components. A reason why client side, DOM-Rendering, engines are becoming generally slow: There is never a “true finished static piece of html” to work with. So engines, such as [Meteors Blaze]( https://www.meteor.com/blaze), eventually over access the DOM and everything comes to a crawl. A frustration we often dealt with and also one, that could be avoided if we were working with static HTML again.

### Approach
With react we are exactly doing that. We bring the static html server directly to the client for instant (virtual) DOM dispatching while maintaining moderate DOM re-rendering and speed. Working with this stack is not difficult but you have to acknowledge that you need to balance yourself between working in ajax like **“Static-Style”** or decouple a section of the page and work in **“DOM-Rendering-Style”**. Just mixing styles can get you in trouble. Knowing that, you can use any feature of Framework7 as long you separate those into the respective working styles. Touch2S tries to be a starting point in that regard: Go into the great [F7 docs]( http://www.idangero.us/framework7/docs/#.VoSA-ZMrJhE) and try to implement features yourself.

### Example
I.e. the To-Do example features a slide-left and than delete button. The sliding is styling / a CSS3 transformation of static HTML (Ajax-Style). The delete function could also be implemented with Framework7s `swipeout-delete` class on the task item. But that would violate the “Static-Style” of the component and break reacts rendering. So instead, we delete the task from our Tasks collection to have react update the DOM for us. A beautiful symbiosis.

### Outlook
Touch2S is just at the beginning but should implement

- View and Page management of F7 through react
- iOS and Material Design
- Workflow to always keep up to the great work of Framework7
- Routing
- Static-Style React Components for some common features
- Chunking for incremental loading
- Keep aligned with Meteor (1.3) and thereactivestack


# The Reactive Stack (TRS) [link]( https://github.com/thereactivestack)
Touch2S would not be possible without the amazing work of The Reactive Stack (TRS), namely, Benoit ([@eXon]( https://github.com/eXon)). 


### How does it work?
Analog to the TBS Kickstart-Simple-Project: [See here]( https://github.com/thereactivestack/kickstart-simple#how-does-it-work). For now, please orient yourself on the comments inside the code. A more in-depth description of the ins-and-outs incl. gotachs will follow.

### Testing
Tests, mostly End2End-Tests, are a to-do.

### Production (analog to TBS)
You can use meteor run, meteor build, mup or anything working with Meteor.

#### Run in production mode (also to test SSR)
`meteor run --production`

#### Build for production
`meteor build .`

#### Deploy with Meteor-up
`mup deploy`

#### Cordova
You need to do those 3 steps to make it works with iOS or Android:

1. Add the platform to your Meteor project

    ```javascript
    meteor add-platform ios
    meteor add-platform android
    ```
1. Allow access to your dev server in your `/mobile-config.js` file:

    ```javascript
    App.accessRule('http:// localhost:3500/*');
    ```

1. Replace localhost by your local ip address in `/entry/webpack.conf.js`.

# License
MIT