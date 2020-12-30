require('dotenv').config();
const path = require('path');
const glob = require('glob');

const entry = glob.sync('modules/*/src/index.js').reduce((acc, curr) => {
  const chunkName = curr.replace('/src/', '/ui/public/');
  return Object.assign(
    acc,
    {
      [chunkName]: path.resolve(__dirname, curr)
    });
},
{});

entry['modules/asset/ui/public/site.js'] = './src/index.js';
console.log(`Webpack running in ${process.env.NODE_ENV || 'development'} mode`);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry,
  output: {
    path: __dirname,
    filename: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/, /modules\/.*\/ui\/public\/.*js$/gm ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/preset-env' ],
              plugins: [ '@babel/plugin-transform-runtime' ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  }
};
