import type { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { rules } from './webpack.rules';

// Filter out electron-specific loaders
const webRules = rules.filter(rule => {
  const test = rule.test as RegExp;
  // Exclude native module loaders and asset relocator loader
  if (test?.toString().includes('native_modules')) return false;
  if (test?.toString().includes('node_modules')) {
    // Check if it uses asset relocator loader
    const ruleUse = rule.use as { loader?: string };
    if (ruleUse?.loader?.includes('asset-relocator')) return false;
  }
  return true;
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
  target: 'web',
  node: {
    __dirname: false,
    __filename: false,
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
    fallback: {
      path: false,
      fs: false,
      crypto: false,
    },
  },
  performance: {
    hints: false,
  },
  externals: {
    electron: 'commonjs2 electron',
  },
};

export default config;
