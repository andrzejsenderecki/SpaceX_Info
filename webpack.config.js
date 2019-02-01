const path = require('path');
module.exports={
   mode: "development",
   entry: {
    app_1 : "./scripts/app_1.js",
    app_2 : "./scripts/app_2.js",
},
output: {
    filename: "out_[name].js",
    path: `${__dirname}/scripts`,
},
   module: {
       rules: [
           {
               test: /\.scss$/,
               use: ['style-loader', 'css-loader?url=false',
                   'sass-loader',
               ],
           },
           {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                   loader: 'babel-loader',
                   options: {
                       presets: [
                           ['env', {
                               targets: {
                                   browsers: [
                                       'Chrome 49'
                                   ]
                               },
                           }],
                           "es2015", "stage-0"
                       ]
                   }
               }
           }
       ]
   }
};
