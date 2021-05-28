module.exports = function(grunt) {
  var cssFilePathSrc = ['css/**/*.css', ]; // css源文件路径
  var jsFilePathSrc = ['js/*.js']; // js源文件路径
  var path = require('path');

  //根据构建命令，构建不同环境的资源包

  var staticFilePathSrc = 'D:/UED/static/passport/'; //本地对应的静态文件目录
  //var staticFilePathSrc = 'D:/UED/static/e-portal/branch';

  // 项目配置
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      //clean
      clean: ["dist"],

      //css
      csslint: { // CSS 检查
          strict: {
              options: {
                  import: 2
              },
              src: cssFilePathSrc
          }
      },
      cssmin: { // CSS mini
          compress: {
              files: {
                  'dist/output.css': cssFilePathSrc
              }
          }
      },

      //scss编译
      compass: {
          dist: {
              options: {
                  config: 'publish_config.rb'
              }
          },
          dev: {
              options: {
                  config: 'config.rb'
              }
          }
      },

      //copy
      copy: {
          main: {
              files: [{
                  expand: true,
                  cwd: 'dist',
                  src: ['**/*.css', '!stylesheets/fan-sass/**/*.*', '**/*.js', '**/*.{png,jpg,gif}'],
                  dest: staticFilePathSrc
              }]
          }
      },

      //img
      imagemin: { // Task
          dynamic: {
              options: { // Target options
                  optimizationLevel: 3
              },
              files: [{
                  expand: true, // Enable dynamic expansion
                  cwd: 'images/', // Src matches are relative to this path
                  src: ['**/*.{png,jpg,gif}', '!guide-web/**/*.*'], // Actual patterns to match
                  dest: 'dist/images/' // Destination path prefix
              }]
          }
      },

      //js
      jshint: { // js检查
          all: jsFilePathSrc,
          options: {
              // undef: true, // 禁止使用未定义变量
              // unused: true, // 禁止定义的变量未使用
              camelcase: true, // 禁止使用未定义变量
              curly: true, // if for 后语句块必须大括号包裹
              maxdepth: 2, // 语句块嵌套层数限制
              maxparams: 3, // 函数最大参数个数限制
              asi: false //  分号缺失检测
                  //reporterOutput:'cmd'
          }
      },
      uglify: {
          options: {
              mangle: false
          },
          my_target: {
              files: [{
                  expand: true,
                  cwd: 'js',
                  src: ['**/*.js', '!**/_*.js', '!**/*test.js'],
                  dest: 'dist/js'
              }]
          }
      },
      //js
      concat: {
          dist: {
              files: {
                  'js/plus/lb/_checkInputData.js': [ //原旧版输入检测方法
                      'js/plus/comm/idCard.js',
                      'js/plus/lb/_checkInputData_new.js'
                  ]
              }
          }
      },

      watch: {
          sass: {
              files: ['sass/**/*.scss'],
              tasks: ['compass:dev']
          },
          js: {
              files: ['js/**/*.js'],
              tasks: ['concat']
          }

      }

  });

  // 加载Grunt插件
  grunt.loadNpmTasks('grunt-contrib-csslint'); // CSS静态检查
  grunt.loadNpmTasks('grunt-contrib-cssmin'); // CSS mini化
  grunt.loadNpmTasks('grunt-contrib-compass'); //compass
  grunt.loadNpmTasks('grunt-contrib-copy'); //复制
  grunt.loadNpmTasks('grunt-contrib-imagemin'); //图片压缩
  grunt.loadNpmTasks('grunt-contrib-jshint'); //JS语法检查
  grunt.loadNpmTasks('grunt-contrib-uglify'); //JS压缩
  grunt.loadNpmTasks('grunt-contrib-concat'); //JS合并
  grunt.loadNpmTasks('grunt-contrib-clean'); //清除
  grunt.loadNpmTasks('grunt-contrib-watch'); //watch
  // 注册grunt默认任务

  //构建css
  grunt.registerTask('buildcss', ['imagemin', 'compass:dist']);

  //合并js
  grunt.registerTask('concatjs', ['concat:dist']);

  grunt.registerTask('buildjs', ['concat:dist', 'jshint', 'uglify']);
  //grunt.registerTask('buildjs', ['concat:dist']);

  //图片
  grunt.registerTask('minimg', ['imagemin']);

  //清理dist
  grunt.registerTask('cleandist', ['clean']);

  //开发
  grunt.registerTask('dev', ['watch:js', 'watch:sass']);

  grunt.registerTask('default', ['clean', 'buildcss', 'buildjs', 'copy']);
  //grunt.registerTask('default', ['clean', 'buildjs', 'copy']);

  grunt.registerTask('test', ['clean', 'concat:dist']);

  //压缩到dist,复制到对应本地静态目录
  grunt.registerTask('all', ['clean', 'buildcss', 'buildjs', 'copy']);
};