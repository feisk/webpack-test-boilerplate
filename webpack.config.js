const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PrettierPlugin = require('prettier-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const setOptimization = () => {
  const config = {
    splitChunks: {
      cacheGroups: {
        vendors: {},
      },
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimize = true;
    config.minimizer = [`...`, new CssMinimizerPlugin()];
  }

  return config;
};

const getPlugins = () => {
  const plugins = [
    new HTMLWebpackPlugin({
      title: 'Webpack boilerplate',
      template: './template.html',
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
      filename: 'index.html',
      cache: false,
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    // {
    //   from: path.resolve(__dirname, 'src/assets/favicon.ico'),
    //   to: path.resolve(__dirname, 'dist'),
    // },
    // {
    //     from: path.resolve(__dirname, 'src/assets/images'),
    //     to: path.resolve(__dirname, 'dist/images'),
    // },
    //   ],
    // }),
    new PrettierPlugin(),
    new MiniCssExtractPlugin({ filename: setFilename('css') }),
    new ESLintPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ];

  if (isProd) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};

const setFilename = (extention) =>
  `[name]${isProd ? '.[contenthash]' : ''}.${extention}`;

const setCssLoader = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: path.resolve(__dirname, 'dist'),
      },
    },
    // 'style-loader', inline styles, commented because MiniCssExtractPlugin
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const getBabelLoader = (preset) => {
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        // targets: '> 0.25%, not dead',
        corejs: 3,
      },
    ],
  ];

  if (preset) {
    presets.push(preset);
  }

  const params = {
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets,
        },
      },
    ],
  };

  return params;
};

module.exports = {
  target: isDev ? 'web' : 'browserslist', // hrm hack https://qna.habr.com/answer?answer_id=1813939#answers_list_answer https://github.com/webpack/webpack-dev-server/issues/2758
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.jsx',
    analytics: './analytics.ts',
  },
  output: {
    filename: setFilename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    // extensions: ['*', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    },
  },
  optimization: setOptimization(),
  devServer: {
    static: true,
    // contentBase: path.join(__dirname, 'src/assets'),
    // open: true,
    hot: isDev,
    port: 4200,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.js$/,
        ...getBabelLoader(),
      },
      {
        test: /\.ts$/,
        ...getBabelLoader('@babel/preset-typescript'),
      },
      {
        test: /\.jsx$/,
        ...getBabelLoader('@babel/preset-react'),
      },
      {
        test: /\.css$/,
        use: setCssLoader(),
      },
      {
        test: /\.(sa|sc)ss$/,
        use: setCssLoader('sass-loader'),
      },
      {
        test: /\.less$/,
        use: setCssLoader('less-loader'),
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/inline', // base64
      },
      {
        test: /\.xml$/,
        use: 'xml-loader',
      },
      {
        test: /\.csv$/,
        use: 'csv-loader',
      },
    ],
  },
};
