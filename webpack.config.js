// 需要使用node语法
const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let uglifyjsPlugin = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
module.exports = {
    optimization:{//优化项
        minimizer:[
            new uglifyjsPlugin({
                cache:true, //生成缓存
                parallel:true,// 并行打包
                sourceMap:true
            }),
            new OptimizeCssAssetsWebpackPlugin()
        ]
            
        
    },
    devServer: {
        //开发服务器的配置
        port:3000,
        progress:true,
        contentBase:'./dist'
    },
    mode:'development',// 默认是 生产模式
    entry:'./src/index.js',
    output:{
        // filename:'bundle.js',
        filename:'bundle.[hash:8].js',// 指定 生成的文件带有hash  数字 表示hash的位数
        path:path.resolve(__dirname,'dist')//此时的路径必须是一个绝对路径
        // __dirname 表示当前目录下
    },
    module:{// 模块
        //loader 是从右边向左执行 从下到上
        rules:[
            {
                test:/\.html$/,
                use:'html-withimg-loader'
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:{
                    // 做一个限制 如果图片小于多个k的时候 用base64来转化 否则用file-loader生成真实的图片
                    loader:'url-loader',
                    options:{
                        limit:200*1024,
                        outputPath:'img/'
                    }
                }
            },

            {
                test:require.resolve('jquery'),
                use:'expose-loader?$'
            },
            // {
            //     test:/\.js$/,
            //     use:{
            //         loader:'eslint-loader',
            //         options:{
            //             enforce:'pre',// 设置loader执行顺序 pre normal post
            //         }
            //     },
                
            // },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{ // 用Babel-loader 把Es5-》Es6
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime',
                        ]

                    }
                },
                include:path.resolve(__dirname,'src'),
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                // use:[style-loader,css-loader]// css-loader 用来解析 import 这种语法的
                use: [
                    // {
                    //     loader:'style-loader',
                    //     options:{
                    //         insert:'top'
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    
                    
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'postcss-loader'
                    },
                ]
                // style-loader 将css插入到heade的标签中
                // loader的特点  希望功能单一
                // loader的语法，字符串只用一个loader
                // 多个loader需要[]
                //loader还可以写成对象模式，可以再传一个option参数
            },
            {
                test:/\.less$/,
                use: [
                    // {
                    //     loader:'style-loader',
                    //     options:{
                    //         insert:'top'
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    
                    
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'postcss-loader'
                    },
                    {
                        loader:'less-loader'
                    }
                ]
            }
        ]
    },
    plugins:[ // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',//指定html的模板
            filename:'index.html',// 打包后的文件名称
            // minify:{//压缩
            //     removeAttributeQuotes:true,// 删除属性双引号
            //     collapseWhitespace:true,// 折叠空格 打包成一行
            // },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename:'mian.css',

        }),
        new webpack.ProvidePlugin({
            jquery:'$' // 在每个模块中都注入$符
        })
            
        
    ],
    externals: { // 不打包这些模块
        jquery: "jQuery" 
    }
}