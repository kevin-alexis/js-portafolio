const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: "./src/index.js", /* punto de entrada de la aplicación */
    output: { 
        filename: '[name].[contenthash].js', 
        path: path.resolve(__dirname, 'dist'), 
        assetModuleFilename: 'assets/[name][ext]'
        },
    mode: "development",
    watch: true,
    resolve: {
        extensions: [".js"], //si se utiliza otras extensiones, se deben agregar, como react y asi
        alias:{
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@templates": path.resolve(__dirname, "src/templates/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@images": path.resolve(__dirname, "src/assets/images/")
        }
    },
    module:{
        rules: [
            {
                test: /\.m?js$/,
                //Se usa una expresión regular en donde nos dice lo siguiente: utiliza cualquier archivo que empiece con m ó js
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
                
            },

            {
                test: /\.css|.styl$/i,
                use:[MiniCssExtractPlugin.loader,
                "css-loader",
                "stylus-loader"
                ],
            },
            {
                test: /\.png/,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                filename: "assets/fonts/[hash][ext]",
                },
                       
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html"
        }),

        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
            }]
        }),
        new Dotenv(),
    ],

}


