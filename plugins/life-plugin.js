const pluginName = 'LifePlugin'

/**
 * @description 生命周期插件，探索webpack-plugin工作流程
 */
class LifePlugin {
  constructor () {
    console.log(`${pluginName} created`)
  }

  apply (compiler) {
    // 处理入口hook
    compiler.hooks.entryOption.tap(pluginName, (context, entry) => {
      console.log(`entry：${JSON.stringify(entry)}`)
    })
    compiler.hooks.run.tap(pluginName, compiler => {
      console.log('run')
    })
    compiler.hooks.compilation.tap(pluginName, (compilation, compilationParams) => {
      console.log('compilation')
    })
    compiler.hooks.make.tapAsync(pluginName, (compilation) => {
      console.log('make')
      compilation.hooks.buildModule.tap(pluginName, (module) => {
        console.log('buildModule')
      })
    })

    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      callback()
    })
  }
}

module.exports = LifePlugin
