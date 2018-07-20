import bs from 'browser-sync';
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

// Set "process.env.NODE_ENV" BEFORE calling the Webpack CLI
process.env.NODE_ENV = "development";

// Some options I'm using in my Webpack config function
const options = {
    // should always be true --- BrowserSync without HMR is pretty pointless
    hot: true, 
    devServer: true,
    browserSync: true
};

// Get the Webpack config with options
import config from "../webpack.config.dev";
const bunlder = webpack(config);

// Run Browsersync and use middleware for Hot Module Replacement
const middleware = [
    webpackDevMiddleware(bunlder, {
        // IMPORTANT: dev middleware can't access config, so we should provide publicPath by ourselves
        publicPath: config.output.publicPath,
        noInfo: true,
        // colored output
        stats: {colors: true}
        // for other settings:
        // https://webpack.js.org/guides/development/#webpack-dev-middleware
    })
]; 

if (options.hot === true) {
    // bunlder should be the same as above
    middleware.push(webpackHotMiddleware(bunlder));
}

bs({
    port: 3000,
    notify: false,
    server: {
        baseDir: config.output.publicPath,
        middleware
    }

    // No need to watch '*.js' here, webpack will take care of it
    // including full page reloads if HMR won't work
    // files: [
    //     '../src/*.css',
    //     '*.html'
    // ]
});

// bs.create().init({
//     server: "src",
//     files: ["src/css/*.css"],
//     plugins: [
//         {
//             module: "bs-html-injector",
//             options: {
//                 files: ["src/*.html"]
//             }
//         }
//     ]
// });