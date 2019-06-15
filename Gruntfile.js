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
          'dist/enjoyhint.js': 'src/enjoyhint.js',
          'dist/jquery.enjoyhint.js': 'src/jquery.enjoyhint.js',
        },
      },
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'dist/*.js',
          'node_modules/kinetic/kinetic.min.js',
          'node_modules/jquery.scrollto/jquery.scrollTo.min.js',
        ],
        dest: 'dist/<%= pkg.name %>.bundle.js',
      },
    },

    copy: {
      main: {
        expand: true,
        cwd: 'src',
        src: 'jquery.enjoyhint.css',
        dest: 'dist/',
      },
    },

    cssmin: {
      combine: {
        files: {
          'dist/<%= pkg.name %>.min.css': ['dist/jquery.enjoyhint.css'],
        },
      },
    },

    eslint: {
      src: ['*.js', 'src/*.js'],
    },

    uglify: {
      main: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
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
