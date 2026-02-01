import type { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { rules } from './webpack.rules';

// Filter out electron-specific loaders
const webRules = rules.filter(rule => {
  const test = rule.test as RegExp;
  return !test?.toString().includes('native_modules');
});

// Add CSS rule
webRules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
    },
  ],
});

const config: Configuration = {
  mode: 'production',
  entry: './src/renderer.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  module: {
    rules: webRules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  performance: {
    hints: false,
  },
};

export default config;
