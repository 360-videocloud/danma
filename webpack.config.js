const path = require('path');

module.exports = {
    entry: ['./src/danma.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'danma.js'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader', options: {
                    presets: 'es2015'
                }}
            },
            {
                test: /\.css$/,
                use: [
          {loader: 'style-loader', options: {insertAt: 'bottom'}},
          {loader: 'css-loader', options: {importLoaders: 1}},
                    {loader: 'postcss-loader', options: {
                        plugins: () => {
                            return [
                                require('autoprefixer'), // 添加前缀
                                require('cssnano') // css 中的 Uglify
                            ];
                        }
                    }}
                ]
            }
        ]
    },
  // devtool: 'cheap-source-map',
    devtool: 'inline-source-map',
    plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true
    // })
    ]
};
