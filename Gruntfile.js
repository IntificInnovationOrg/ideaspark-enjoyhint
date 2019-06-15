/* eslint-env node */
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env'],
      },
      dist: {
        files: {
          'dist/js/enjoyhint.js': 'src/enjoyhint.js',
          'dist/js/jquery.enjoyhint.js': 'src/jquery.enjoyhint.js',
        },
      },
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'dist/js/enjoyhint.js',
          'dist/js/jquery.enjoyhint.js',
          'node_modules/kinetic/kinetic.js',
          'node_modules/jquery.scrollto/jquery.scrollTo.js',
        ],
        dest: 'dist/js/<%= pkg.name %>.bundle.js',
      },
    },

    copy: {
      main: {
        expand: true,
        cwd: 'src',
        src: 'jquery.enjoyhint.css',
        dest: 'dist/css/',
      },
    },

    cssmin: {
      combine: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': ['dist/css/jquery.enjoyhint.css'],
        },
      },
    },

    eslint: {
      src: ['*.js', 'src/*.js'],
    },

    uglify: {
      options: {
        sourceMap: true,
        compress: true,
        mangle: true,
      },
      main: {
        files: {
          'dist/js/ideaspark-enjoyhint.bundle.min.js': ['dist/js/ideaspark-enjoyhint.bundle.js'],
        },
      },
    },
  });

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['eslint', 'babel', 'concat', 'uglify', 'copy', 'cssmin']);
};
