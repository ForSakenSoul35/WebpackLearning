// 需要使用node语法
const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devServer: {
        //开发服务器的配置
        port:3000,
        progress:true,
        contentBase:'./dist'
    },
    mode:'production',// 默认是 生产模式
    entry:'./src/index.js',
    output:{
        // filename:'bundle.js',
        filename:'bundle.[hash:8].js',// 指定 生成的文件带有hash  数字 表示hash的位数
        path:path.resolve(__dirname,'dist')//此时的路径必须是一个绝对路径
        // __dirname 表示当前目录下
    },
    plugins:[ // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',//指定html的模板
            filename:'index.html',// 打包后的文件名称
            minify:{//压缩
                removeAttributeQuotes:true,// 删除属性双引号
                collapseWhitespace:true,// 折叠空格 打包成一行
            },
            hash: true
        })
    ]
}