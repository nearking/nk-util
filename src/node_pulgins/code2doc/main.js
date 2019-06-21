const fs = require('fs');
const path = require('path');

const template = require('art-template');
const dox = require('dox');


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
        code.forEach(item => {
            doc += item.description.full;
            // 可以通过 tags、code进行更加丰富的描述
        })

        let fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        let title = fileName.substring(0, fileName.lastIndexOf('.'));

        let html = template(path.join(__dirname, './tpl/_base.html'), {
            title: title,
            doc: doc
        });

        let out = path.join(outDir, title + '.html');
        let saveRS = fs.writeFileSync(path.join(out), html); // 如果有错误会返回错误信息
        if (saveRS) {
            rs.message = '文件[' + filePath + '] 文档生成异常! '
            rs.data = saveRS;
        } else {
            rs.success = true;
            rs.message = '文件[' + filePath + '] 文档成功生成至[' + out + ']! '
        }
    } else {
        rs.message = '文件[' + filePath + '] 不存在! ';
    }

    return rs;
}

var rs = buildCode(path.join(__dirname, '../../pulgins/datetimeselect/datetimeselect.js'), 'H:\\workspace\\other\\nk-util\\build');
if (rs.success) {
    console.log('保存成功，' + rs.message);
} else {
    console.log('保存失败，' + rs.message);
}