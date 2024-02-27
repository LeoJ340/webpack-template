const path = require("path");
const fs = require("fs");
const loaderUtils = require('loader-utils');

// 提取注释正则表达式
const commentRegex = /\/\*[\s\S]*?\*\//g

/**
 * @author leoJ
 * @description 提取utils包下的工具函数，生成函数说明文档
 */
module.exports = function (content) {
    // 限定处理 /src/utils 包下的js文件
    // 不在限定路径内跳过
    const utilsPath = path.resolve(__dirname, '../', 'src', 'utils')
    if (!this.resourcePath.includes(utilsPath)) return content
    const commentList = parseComment(content)
    const title = path.basename(this.resourcePath)
    // 获取输出文档的路径
    const options = loaderUtils.getOptions(this);
    const outputPath = options.outputFile || 'utils.md';
    output(commentList, outputPath, title)
    // 返回原始源代码（不包含注释）
    return content.replace(commentRegex, '');
};

// 解析注释
function parseComment(content){
    // 使用正则表达式提取注释
    const comments = content.match(commentRegex)
    return comments.map(comment => {
        const commentMap = new Map()
        const lines = comment.split('\r\n').slice(1, -1)
        let key = ''
        for (const commentItem of lines) {
            // 去除行首行尾的无效字符（ * ）
            const line = commentItem.match(/^\s*\*\s(.*)/)[1];
            // @字符开头，存下key
            if (line.charAt(0) === '@') {
                const lineMap = line.split(' ')
                key = lineMap[0].slice(1)
                const value = lineMap.slice(1, lineMap.length).join(' ')
                commentMap.set(key, commentMap.get(key) ? [commentMap.get(key), value].join(',') : value)
            } else {
                commentMap.set(key, commentMap.get(key).concat(line))
            }
        }
        return Object.fromEntries(commentMap)
    })
}



// 输出文档
function output(commentList, path, title) {
    fs.appendFileSync(path, `# ${title}\r\n`)
    for (const comment of commentList) {
        for (const key in comment) {
            fs.appendFileSync(path, `##### ${key}\r\n`)
            fs.appendFileSync(path, `${comment[key]}\r\n`)
        }
        fs.appendFileSync(path, '---\r\n')
    }
}
