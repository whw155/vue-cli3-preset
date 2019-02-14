module.exports = (api, options, rootOptions) => {
  // 命令
  // api.extendPackage({
  //   scripts: {
  //     "dev": "vue-cli-service serve",
  //     "build": "vue-cli-service build",
  //     "analyz": "vue-cli-service build --mode analyz",
  //     "lint": "vue-cli-service lint",
  //     "test:unit": "vue-cli-service test:unit"
  //   },
  //   "scripts-info": {
  //     "dev": "运行开发服务器",
  //     "build": "生产环境执行构建",
  //     "analyz": "生产环境执行构建打包分析",
  //   }
  // })

  // // 安装一些基础公共库
  // api.extendPackage({
  //   dependencies: {
  //     "axios": "^0.18.0",
  //     "iview": "^3.1.3",
  //     "vue": "^2.5.17",
  //     "vue-i18n": "^8.2.1",
  //     "vue-router": "^3.0.1",
  //     "vuex": "^3.0.1"
  //   },
  //   devDependencies: {
  //     "@vue/cli-plugin-babel": "^3.0.5",
  //     "@vue/cli-plugin-eslint": "^3.0.5",
  //     "@vue/cli-plugin-unit-mocha": "^3.0.5",
  //     "@vue/cli-service": "^3.0.5",
  //     "@vue/eslint-config-standard": "^3.0.5",
  //     "@vue/test-utils": "^1.0.0-beta.20",
  //     "babel-plugin-import": "^1.11.0",
  //     "babel-preset-es2015": "^6.24.1",
  //     "chai": "^4.1.2",
  //     "clean-webpack-plugin": "^1.0.0",
  //     "less": "^3.0.4",
  //     "less-loader": "^4.1.0",
  //     "uglifyjs-webpack-plugin": "^2.1.1",
  //     "vue-template-compiler": "^2.5.17"
  //   }
  // })

  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  // 公共基础目录和文件
  api.render('./template')

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
  })
}
