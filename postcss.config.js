module.exports = {
    plugins: {
        "postcss-nested": {},
        tailwindcss: {},
        autoprefixer: {},
        "postcss-preset-env": {
            stage: 1,
            features: {
                "nesting-rules": true,
            },
        },
    },
};
