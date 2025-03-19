module.exports = {
    // ... 다른 설정들 ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            // ... 다른 rules ...
        ],
    },
    // ... 다른 설정들 ...
};
