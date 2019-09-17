const path = require("path");//node语法  导入 path 模块
const htmlWebpackPlugin = require("html-webpack-plugin");//导入html-webpack-plugin模块

module.exports ={
    mode: 'development',//webpack4中新增语法
    entry: path.join(__dirname,'./src/main.js'),//被打包的文件
    // entry:{
    //     index:"./src/main.js",
    //     another: './src/another-module.js'
    // },
    output:{
        //打包的目录
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'//打包的文件名称
    },
    plugins: [
        new htmlWebpackPlugin({//创建一个在内存中的html插件
            template: path.join(__dirname,"./src/index.html"),//指定模板页面
            filename: "index.html",//指定生成页面名称
        }),
    ],
    module: {//配置所有第三方模块加载器
        rules: [//所有第三方模块加载器匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//因为less也属于样式  所以前面要加css模块加载器 less 匹配规则
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.jpg|png|gif|jpeg|bmp$/,use:['url-loader?limit=false&name=[hash:8]-[name].[ext]']},//图片的loader规则
            {test:/\.eot|svg|ttf|woff|woff2$/,use:['url-loader']},//字体的loader规则
            {test:/\.js$/,use:'babel-loader', exclude: /node_modules/},//转换高级es语法
            {test: /\.vue$/, use:'vue-loader'}//处理vue的loader
        ]

    },
    resolve: {
        alias: {
            //修改被导入vue的路径
            // "vue$":"vue/dist/vue.js"
        }
    },
    // target:'web'
};