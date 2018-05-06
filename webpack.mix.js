const mix = require('laravel-mix')
const path = require('path')
const tailwindcss = require('tailwindcss')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.svg$/,
                exclude: /(node_modules|bower_components|fonts)/,
                loader: 'svg-url-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, './resources/assets/js')
        }
    }
})


mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .sass('resources/assets/sass/v2/app.scss', 'public/css/v2.css')
   .options({
       processCssUrls: false,
       postCss: [ tailwindcss('./tailwind.js') ]
   })
   .sourceMaps()
   .disableNotifications()


if ( mix.inProduction() ) {
    mix.version();
    
    mix.extract(['vue', 'axios', 'moment']);
}