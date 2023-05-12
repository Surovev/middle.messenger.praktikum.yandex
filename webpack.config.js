// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable no-undef */
// // Generated using webpack-cli https://github.com/webpack/webpack-cli
// const Handlebars = require("handlebars");


// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const isProduction = process.env.NODE_ENV == 'production';


// const stylesHandler = MiniCssExtractPlugin.loader;

// const config = {
//     entry: './index.ts',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//     },
//     devServer: {
//         open: true,
//         host: 'localhost',
//         port: 3000
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './index.html',
//         }),

//         new MiniCssExtractPlugin(),
//     ],
//     module: {
//         rules: [
//             // {
//             //     test: /\.(gif|png|jpe?g|svg)$/i,
//             //     use: [
//             //       'file-loader',
//             //       {
//             //         loader: 'image-webpack-loader',
//             //         options: {
//             //           bypassOnDebug: true, // webpack@1.x
//             //           disable: true, // webpack@2.x and newer
//             //         },
//             //       },
//             //     ],
//             // },
//             //{ test: /\.hbs$/, loader: "handlebars-loader" },
//             // {
//             //     test: /\.hbs$/i,
//             //     loader: "html-loader",
//             //     options: {
//             //       preprocessor: (content, loaderContext) => {
//             //         let result;
        
//             //         try {
//             //           result = Handlebars.compile(content)({
//             //             firstname: "Value",
//             //             lastname: "OtherValue",
//             //           });
//             //         } catch (error) {
//             //           loaderContext.emitError(error);
        
//             //           return content;
//             //         }
        
//             //         return result;
//             //       },
//             //     },
//             //   },
//             {
//                 test: /\.(handlebars|hbs)$/,
//                 loader: 'handlebars-loader'
//             },
//             {
//                 test: /\.(ts|tsx)$/i,
//                 loader: 'ts-loader',
//                 exclude: ['/node_modules/'],
//             },
//             {
//                 test: /\.less$/i,
//                 use: [
//                   // compiles Less to CSS
//                   "style-loader",
//                   "css-loader",
//                   "less-loader",
//                 ],
//               },
//             {
//                 test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
//                 type: 'asset',
//             },

//             // Add your rules for custom modules here
//             // Learn more about loaders from https://webpack.js.org/loaders/
//         ],
//     },
//     resolve: {
//         extensions: ['.ts', '.js', '.hbs', '.handlebars'],
//         alias: {
//             'handlebars': 'handlebars/dist/handlebars.min.js'
//         }
//     },
// };

// module.exports = () => {
//     if (isProduction) {
//         config.mode = 'production';


//     } else {
//         config.mode = 'development';
//     }
//     return config;
// };

// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 3000

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(less)$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                options: { transpileOnly: true },
                exclude: ['/node_modules/']
            },
            // {
            //     test: /\.less$/i,
            //     use: ['style-loader',
            //         {
            //             loader: 'less-loader',
            //             options: {
            //                 importLoaders: 1
            //             }
            //         },
            //         // {
            //         //     loader: 'less-loader',
            //         //     options: {
            //         //         postcssOptions: {
            //         //             plugins: {
            //         //                 'autoprefixer': {},
            //         //                 'postcss-easy-import': {},
            //         //                 'postcss-custom-media': {},
            //         //                 'postcss-for': {},
            //         //                 'postcss-mixins': {},
            //         //                 'postcss-nested': {},
            //         //                 'postcss-simple-vars': {}
            //         //             }
            //         //         }
            //         //     }
            //         // }
            //     ]
            // },
            {
                test: /\.(handlebars|hbs)$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@static': path.resolve(__dirname, 'static')
        }
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }

    return config;
};
