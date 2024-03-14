const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");
const { bytesToKB } = require('./utils')

const pluginName = 'InlineChunkPlugin'

/**
 * @description 限定小于预设大小的js资源内联到html里
 */
class InlineChunkPlugin {
    constructor(options = {}) {
        const { size } = options
        this.size = size
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            // 获取HtmlWebpackPlugin的hooks
            const hooks = HtmlWebpackPlugin.getHooks(compilation)

            hooks.alterAssetTagGroups.tap(pluginName, (assets) => {
                assets.headTags = this.getInlineTag(assets.headTags, compilation.assets);
                assets.bodyTags = this.getInlineTag(assets.bodyTags, compilation.assets);
            });

            hooks.afterEmit.tap(pluginName, () => {
                for (const assetsKey in compilation.assets) {
                    if (bytesToKB(compilation.assets[assetsKey].size()) < this.size) {
                        delete compilation.assets[assetsKey]
                    }
                }
            })
        })
    }

    getInlineTag(tags, assets) {
        return tags.map((tag) => {
            if (tag.tagName !== "script") return tag
            const scriptName = tag.attributes.src
            if (bytesToKB(assets[scriptName].size()) > this.size) return tag

            return { tagName: "script", innerHTML: assets[scriptName].source(), closeTag: true }
        });
    }
}

module.exports = InlineChunkPlugin
