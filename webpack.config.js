const config = require('laravel-mix/setup/webpack.config')

for (const rule of config.module.rules) {
    
    if ( rule.test.toString() === '/(\\.(woff2?|ttf|eot|otf)$|font.*\\.svg$)/') {
        rule.test = /(\.(woff2?|ttf|eot|otf)$)/
    }

    if ( rule.test.toString() === '/(\\.(png|jpe?g|gif)$|^((?!font).)*\\.svg$)/') {
        rule.test = /(\.(png|jpe?g|gif)$)/
    }
}

module.exports = config