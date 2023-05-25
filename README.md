# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


<-------Install Tailwind CSS and its dependencies as dev dependencies using npm or yarn. Run the following command in your terminal:-------------------------------->

## npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

<------Create a Tailwind CSS configuration file by running the following command:------>
## npx tailwindcss init

<-----------Create a PostCSS configuration file named postcss.config.js in the root directory of your project and add the following code:--------->
##
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
##

<---------Import Tailwind CSS styles in your project's main CSS file, which is usually src/index.css. Add the following line to the top of the file:----->

##
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
##


#### font-awesome
set up the svg core
## npm i --save @fortawesome/fontawesome-svg-core
For Free icons, you can add either -- or both -- of these styles:
## Free icons styles
### npm i --save @fortawesome/free-solid-svg-icons
### npm i --save @fortawesome/free-regular-svg-icons
And lastly, install the Font Awesome React component:
### npm i --save @fortawesome/react-fontawesome@latest

font-awesome
## npm install @fortawesome/fontawesome-free

for momitor icon
### npm install --save @fortawesome/free-brands-svg-icons


mui-material
## npm install @mui/material @emotion/react @emotion/styled
## npm install @mui/material @mui/styled-engine-sc styled-components
## npm install @mui/icons-material


## npm install react-slider
## npm i mdb-ui-kit

for zegocloud
## npm i @zegocloud/zego-uikit-prebuilt --save

full-calender
npm i @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/timegrid 