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
            // "/juanpib": {
            //     target: "https://m.juanpi.com",
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         "^/juanpib": "",
            //     }
            // },
        }
    },


    productionSourceMap: false,

    css: {
        sourceMap: true,
    },


}


