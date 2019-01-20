module.exports={
   mode: "development",
   entry:['babel-polyfill', "./scripts/app.js"],
   watch: true,
   output: {
       filename: "../scripts/out.js"
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
           }]
   }
};
