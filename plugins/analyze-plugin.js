const { bytesToKB } = require('./utils')
const pluginName = 'AnalyzePlugin'

/**
 * @description 分析打包文件大小
 */
class AnalyzePlugin {
    // 插件构造函数
    constructor(options = {}) {
        // 获取指定分析文件名与文件标题
        const { outputFile, title } = options
        this.outputFile = outputFile
        this.title = title
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync(pluginName,(compilation, callback) => {
            const { assets } = compilation
            let sources = []
            sources.push(`# ${this.title}`)
            sources.push('| 名称 | 大小（KB） |')
            sources.push('| --- | --- |')
            for (const filePath in assets) {
                sources.push(`| ${filePath} | ${bytesToKB(assets[filePath].size())} |`)
            }
            // 添加输出资源
            const fileContent = sources.join('\n')
            const newAsset = {
                source: () => fileContent,
                size: () => fileContent.length
            };

            // 使用 compilation.emitAsset 方法添加新资源
            compilation.emitAsset(this.outputFile, newAsset);
            callback()
        });
    }
}

module.exports = AnalyzePlugin;
