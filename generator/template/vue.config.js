/*
 * @Author: wuhaiwei 
 * @Date: 2018-10-23 14:36:27 
 * @Last Modified by: wuhaiwei
 * @Last Modified time: 2019-01-16 15:28:57
 */
/**
 * 用于配置vue-cli3 的webpack配置
 * 具体配置详见 https://cli.vuejs.org/zh/config/
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV == 'development';
// console.log(process.env);
console.log(process.env.IS_ANALYZ);
module.exports = {
  publicPath: './',
  productionSourceMap: false, // 生产环境的 source map
  configureWebpack: config => {
    if (!isDev) {
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
      };
      const plugins = [];
      plugins.push(
        new CleanWebpackPlugin(['node_modules/iview/dist/locale/*.js.map']),
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] //移除console
            },
          },
          sourceMap: false,
          parallel: true,
          exclude: /\/chunk-vendors.*?js$/,//排除压缩后文件
          // chunkFilter: (chunk) => {
          //   console.log('chunk', chunk.name);
          //   // Exclude uglification for the `vendor` chunk
          //   if (chunk.name === 'vendor') {
          //     return false;
          //   }
          //   return true;
          // }
        })
      );
      config.plugins = [
        ...config.plugins,
        ...plugins
      ];
      // config.module.rules.push({
      //   test: /node_modules\/iview.src.*?js$/,
      //   loader: 'babel-loader'
      // });
      // config.optimization={
      //   splitChunks:{
      //       cacheGroups: {
      //           libs: {
      //               name: 'chunk-vendors-libs',// 只打包初始时依赖的第三方
      //               test: /[\\/]node_modules[\\/]/,
      //               priority: 10,
      //               chunks: 'initial'
      //           },
      //           iview: {
      //               name: 'chunk-vendors-iview', // 单独将 iview 拆包 没有成功，是否跟iview的按需加载有关系
      //               test: /node_modules\/iview.src.*?js$/,
      //               priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
      //               chunks: 'all'
      //           }
      //       }
      //   },
      //   runtimeChunk: false
      // };
    }

  },
  chainWebpack: config => {
    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static'
      }]);
    }


  },
  css: {
    // modules: true, //设置会影响iview主题
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: '8089',
    open: true
  },
};
