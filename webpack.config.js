const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCSS = new ExtractTextPlugin('style.css');


const config = {
  entry: './src/app-shell.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: /src/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader']),
        /*
        loaders : ['style-loader', 'css-loader'] These loaders are applied from right to left
        */
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
      }
    ],
  },
  plugins: [
    extractCSS,
    new HtmlWebpackPlugin({
      title: 'Twitter Data Visualization',
      filename: 'index.html',
      template: 'src/index.hbs',
    }),
  ],
};

module.exports = config;