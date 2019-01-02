const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');
const dirPages = path.join(__dirname, 'pages');

const html = {
    "title" : "Writing Scalable, Modular and Themeable CSS with SASS Exercises",
    "welcome" : "What a crazy CSS day!"
}

module.exports = {
    entry: {
        bundle: path.join(dirApp, 'index')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets,
            dirPages
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename : "index.html",
            template: path.join(__dirname, 'index.ejs'),
            title: html.title,
            welcome : html.welcome
        }), 
        new HtmlWebpackPlugin({
            filename : "grid-view.html",
            template: path.join(__dirname, 'pages/grid-view.html')
        }),
        new HtmlWebpackPlugin({
            filename : "theme-example.html",
            template: path.join(__dirname, 'pages/theme-example.html')
        }),
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
