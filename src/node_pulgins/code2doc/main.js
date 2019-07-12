const fs = require('fs');
const path = require('path');

const template = require('art-template');
const dox = require('dox');
const fileUtils = require('nk-util-node').file;


const buildCode = (filePath, outDir) => {
    let rs = {
        success: false,
        data: null,
        message: ''
    };
    filePath = (filePath || '').replace(/\\/g, '/');

    if (fs.existsSync(filePath)) {
        let code = fs.readFileSync(filePath);
        code = new String(code);

        code = dox.parseComments(code);

        let doc = '';
        // code.forEach(item => {
        //     if ("<h1>code2doc</h1>" == item.description.summary) { // 带有文档生成表示
        //         doc += (item.description.full || '').replace(/<h1>code2doc<\/h1>/, '');
        //     }
        //     // 可以通过 tags、code进行更加丰富的描述
        // })

        let docs = [];
        code.forEach(item => {
            if (item.description.summary && item.description.summary.indexOf('<h1>code2doc</h1>') >= 0) { // 带有文档生成表示
                let params = [], returns = [], other = [];
                if (item.tags && item.tags.length > 0) {
                    // tag属性包括
                    // description 描述
                    // name 名字
                    // string 完整字符串，除去 @type 外的所有字符串
                    // type 类型，即 @ 后面的描述
                    // types 参数类型
                    // typesDescription 标签？
                    item.tags.forEach(tag => {
                        if (tag.type == 'param') {
                            params.push(tag);
                        } else if (tag.type == 'returns') {
                            returns.push(tag);
                        } else {
                            other.push(tag);
                        }
                    })
                }

                docs.push({
                    html: (item.description.full || '').replace(/<h1>code2doc<\/h1>/, ''),
                    params: params,
                    returns: returns,
                    other: other
                })
            }
            // 可以通过 tags、code进行更加丰富的描述
        })

        let fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        let title = fileName.substring(0, fileName.lastIndexOf('.'));

        let html = template(path.join(__dirname, './tpl/_base.html'), {
            title: title,
            doc: doc,
            docs: docs
        });

        if (!fs.existsSync(outDir)) { // 如果不存在那么会进行创建
            fs.mkdirSync(outDir);
        }

        let out = path.join(outDir, title + '.html');
        let saveRS = fs.writeFileSync(path.join(out), html); // 如果有错误会返回错误信息
        if (saveRS) {
            rs.message = '文件[' + filePath + '] 文档生成异常! '
            rs.data = saveRS;
        } else {
            rs.success = true;
            rs.data = {
                'title': title,
                'filePath': out
            };
            rs.message = '文件[' + filePath + '] 文档成功生成至[' + out + '] '
        }
    } else {
        rs.message = '文件[' + filePath + '] 不存在! ';
    }

    return rs;
}

/** 所有文档的 */
let pageList = [];
/**
 * 指定路径生成文件
 * @param {*} cfg 
 */
const buildCodeByDir = (cfg) => {
    cfg = cfg || {};
    let inDir = cfg.inDir;
    let outDir = cfg.outDir;
    let fileType = cfg.fileType;

    fileType = fileType || 'js'; // 默认后缀为 js

    if (inDir) {
        inDir = (inDir || '').replace(/\\/g, '/');
        outDir = (outDir || '').replace(/\\/g, '/');


        if (fs.existsSync(inDir)) {
            let state = fs.statSync(inDir);
            if (state.isDirectory()) { // 文件夹
                // 递归遍历
                let files = fs.readdirSync(inDir);

                files.forEach(item => {
                    let curInDir = path.join(inDir, item);
                    let curOutDir = outDir;

                    let curState = fs.statSync(curInDir);
                    if (curState.isDirectory()) { // 如果是路径需要添加子路径
                        curOutDir = path.join(outDir, item);
                    }

                    buildCodeByDir({
                        inDir: curInDir, outDir: curOutDir, fileType
                    })
                })
            } else { // 文件 直接构建文档
                let type = inDir.substring(inDir.lastIndexOf('.') + 1);
                if (type == fileType) {
                    let rs = buildCode(inDir, outDir);

                    // 做一个简要输出
                    if (rs.success) {
                        pageList.push(rs.data);
                        console.log('保存成功，' + rs.message);
                    } else {
                        console.log('保存失败，' + rs.message);
                    }
                }
            }
        }
    }
}


/**
 * 构建文档说明
 * @param {*} cfg 
 */
const buildDoc = (cfg) => {
    cfg = cfg || {};
    let outDir = cfg.outDir;

    // 先删除原有文件
    fileUtils.delFolderAndFile(outDir);

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir)
    }

    buildCodeByDir(cfg);

    let indexList = [];
    pageList.forEach(page => {
        let title = page.title,
            filePath = page.filePath;

        filePath = (filePath || '').replace(/\\/g, '/');
        outDir = (outDir || '').replace(/\\/g, '/');

        let indexDir = filePath.replace(outDir, '');
        if (indexDir.indexOf('/') == 0) { // 不能以 / 开通
            indexDir = indexDir.substring(1);
        }
        let indexTitle = indexDir.substring(0, indexDir.lastIndexOf('.')).split('/').join('.'); // 将路径改成 . 分割的路径

        indexList.push({
            'title': title,
            'indexTitle': indexTitle,
            'indexDir': indexDir
        });
    });

    // 构建index文件
    let html = template(path.join(__dirname, './tpl/_index.html'), {
        'indexList': indexList,
        'ver': new Date().getTime()
    });

    fs.writeFileSync(path.join(outDir, 'index.html'), html); // 如果有错误会返回错误信息
}

// var rs = buildCode(path.join(__dirname, '../../pulgins/datetimeselect/datetimeselect.js'), 'H:\\workspace\\other\\nk-util\\build');

// var rs = buildCode(path.join(__dirname, '../../js/page.js'), 'H:\\workspace\\other\\nk-util\\build');

// var rs = buildCode('H:\\workspace\\other\\normal-kit-web\\nk-util-node\\src\\utils.js', 'H:\\workspace\\other\\nk-util\\build');
// if (rs.success) {
//     console.log('保存成功，' + rs.message);
// } else {
//     console.log('保存失败，' + rs.message);
// }

// buildCodeByDir({
//     inDir: 'H:\\workspace\\other\\normal-kit-web\\nk-util-node\\src',
//     outDir: 'H:\\workspace\\other\\nk-util\\build\\nk-util-node'
// })


// nk-util-node
buildDoc({
    inDir: 'H:\\workspace\\other\\normal-kit-web\\nk-util-node\\app\\src',
    outDir: 'H:\\workspace\\other\\normal-kit-web\\nk-util-node\\doc'
})


// nk-simple-server
// buildDoc({
//     inDir: 'H:\\workspace\\other\\normal-kit-web\\nk-simple-server\\app\\src',
//     outDir: 'H:\\workspace\\other\\normal-kit-web\\nk-simple-server\\doc'
// })



// bpm-node-sdk-2
// buildDoc({
//     inDir: 'H:\\workspace\\other\\normal-kit-web\\bpm-node-sdk-2\\app\\src',
//     outDir: 'H:\\workspace\\other\\normal-kit-web\\bpm-node-sdk-2\\doc'
// })