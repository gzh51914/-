module.exports = {
    // publicPath: "/", //两种方式上线都不行
    publicPath: "./",
    devServer: {
        proxy: {

            "/juanpi": {
                target: "https://webservice.juanpi.com",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/juanpi": "",
                }
            },
            "/inp": {
                target: "https://m.juanpi.com",
                // target: "https://webservice.juanpi.com",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/inp": "",
                }
            },
        }
    },


    productionSourceMap: false,

    css: {
        sourceMap: true,
    },


}


