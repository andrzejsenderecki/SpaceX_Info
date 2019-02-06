const path = require('path');
module.exports={
   mode: "development",
   entry: {
    main_page : "./scripts/main_page.js",
    rocket : "./scripts/rocket.js",
    dragon : "./scripts/dragon.js",
    roadster : "./scripts/roadster.js"
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
