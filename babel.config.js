// This file is necessary to implement the import export keywords which are present in ES6.
// Firstly, installing the npm install --save-def jest babel-jest @babel/present-env
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
};