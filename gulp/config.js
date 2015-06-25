var dest = "./build";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  sass: {
    src: src + "/sass/**/*.{sass,scss}",
    dest: dest,
    settings: {
      //indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'img' // Used by the image-url helper
    }
  },
  images: {
    src: src + "/img/**",
    dest: dest + "/img"
  },
  markup: {
    src: src + "/html/**",
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/js/index.js',
      dest: dest,
      outputName: 'index.js',
      // list of externally available modules to exclude from the bundle
      external: ['jquery', 'underscore']
    }]
  },
  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    dest: dest
  }
};
