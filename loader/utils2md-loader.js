const path = require("path");
const fs = require("fs");
const loaderUtils = require('loader-utils');

// 项目根目录
const cwd = path.dirname(__dirname)

// 提取注释正则表达式
const commentRegex = /\/\*[\s\S]*?\*\//g
const defaultOutputPath = 'utils'

/**
 * @author leoJ
 * @description 提取utils包下的工具函数，生成函数说明文档
 */
module.exports = function (content) {
    // 限定处理 /src/utils 包下的js文件
    // 不在限定路径内跳过
    const utilsPath = path.resolve(cwd, 'src', 'utils')
    if (!this.resourcePath.includes(utilsPath)) return content
    const commentList = parseComment(content)
    const title = path.basename(this.resourcePath)
    // 获取输出文档的路径
    const options = loaderUtils.getOptions(this);
    const outputPath = options.outputPath || defaultOutputPath;
    // 异步处理
    const callback = this.async()
    output(commentList, outputPath, title).then(() => {
        callback(null, content.replace(commentRegex, ''));
    }).catch(err => {
        callback(err, content.replace(commentRegex, ''));
    })
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
function output(commentList, outputPath, title) {
    return new Promise((resolve, reject) => {
        if (!commentList || !commentList.length) {
            reject('comment is not defined')
        }
        const dir = path.resolve(cwd, outputPath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        const fileName = title.slice(0, title.lastIndexOf('.'))
        const beginTime = Date.now()
        // 写入文档
        const ws = fs.createWriteStream(`${dir}/md/${fileName}.md`, { flags: 'a' })
        ws.on('finish', () => {
            console.log(`文档写入完成，耗时：${Date.now() - beginTime} ms`);
        });
        ws.on('error', (err) => {
            ws.destroy();
            reject(`写入错误：${err}`)
        });
        ws.write(`# ${title}\r\n`)
        for (const [index, comment] of commentList.entries()) {
            for (const key in comment) {
                ws.write(`##### ${key}\r\n`)
                // ws.emit('error', 'hhh 出错啦'); // 错误测试
                ws.write(`${comment[key]}\r\n`)
            }
            if (index < commentList.length - 1) {
                ws.write('---\r\n')
            }
        }
        ws.end()
        resolve()
    })
}
