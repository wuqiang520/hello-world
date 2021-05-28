var d = {'src/ab.js':['src/_a.js','src/_b.js']};
var a = {src:['src/_a.js','src/_b.js','src/_c.js'],dest:'src/abc.js'};
var b = {};
var config = {
  name:'wq'
}
module.exports = function(grunt){
  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options:{
        banner: '/*\n author: <%= pkg.author %> \n name:<%= config.name %> \n time:<%= grunt.template.today("yyyy-mm-dd") %> \n*/\n' //每个文件顶部生成的注释
      },
      build:{
        src:['src/a.js','src/grunt.js'],
        dest: 'build/c.js'
      },
      my_target: {
        files: [{
            expand: true, //expand设置为true将启用以下选项 cwd、src、dist、ext、extDot、flatten、rename
            cwd: 'src/',
            src: ['**/*.js', '!**/_*.js', '!**/*test.js'],  // **匹配任意数量字符包括/  *匹配任意数量字符不包括/  ?匹配单个字符，不包括/  !在模式的开头用于排除一个匹配模式所匹配的任意文件
            dest: 'dist/js',
            ext:"_<%= grunt.template.today('yyyy-mm-dd')%>.min.js",
            extDot:'last'
        }]
      }
      
    },
    watch:{
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['compass:dev']
      },
      js: {
          files: ['src/**/_*.js'],  //监控src下 _开头的js文件
          tasks: ['jshint','concatjs']
      }
      },
    copy: {
      main: {
          files: [{
              expand: true,
              cwd: 'dist',  //把dist下的静态文件，复制到build下
              src: ['**/*.css', '**/*.js', '**/*.{png,jpg,gif}'],
              dest: 'build',
              rename: function (dest, src) {          // The `dest` and `src` values can be passed into the function
                return dest + src.replace('js','/jsdir'); // The `src` is being renamed; the `dest` remains the same
              }
          }]
      }
    },
    clean:['build','dist'], //清除build、dist文件夹内容

    concat:{
      options:{ //任务级options覆盖目标级options

      },
      foo:{
        options:{ //目标级options

        },
        files: [
          d,
          a,
          b
        ]
      },
      bar:{

      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      // define the files to lint
      files: ['src/**/_*.js', 'test/**/_*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    log: {
      foo: [1, 2, 3],
      bar: 'hello world',
      baz: false
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    csslint: { // CSS 检查
      strict: {
          options: {
              import: 2
          },
          src: ['src/css/**/*.css']
      }
  },
      imagemin: {
        options:{
          optimizationLevel: 3
        },
        dynamic: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/images'
            }]
        }
    }
  })
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');



  grunt.loadNpmTasks('grunt-contrib-jshint');





  grunt.loadNpmTasks('grunt-contrib-clean'); //清除


  //任务别名
  // grunt.registerTask('buildcss', ['csslint']);

  grunt.registerTask('dev', ['watch:js', 'watch:sass']); 
  grunt.registerTask('imgmin', ['imagemin']); 


  grunt.registerTask('default',['clean','uglify']);

  grunt.registerTask('test',['qunit']);


  grunt.registerTask('ug',['clean','uglify:my_target','copy']);

  grunt.registerTask('concatjs',['clean','concat:foo']);

  grunt.registerTask('jiuzhe',function(){  //自定义任务
    grunt.log.write('logging some stuff...').ok()
  })

  //注册多任务
  grunt.registerMultiTask('log','任务描述，可选项',function(){
    grunt.log.writeln(this.target+':'+this.data)
  })
  //基本任务 当一个基本任务执行时，Grunt并不会检查配置和环境 -- 它仅仅执行指定的任务函数，并传递任何使用冒号分割的参数作为函数的参数。
  grunt.registerTask('foo',function(arg1,arg2){  // grunt foo:1:2
    if(arguments.length === 0){
      grunt.log.writeln(this.name+', no args')
    }else{
      grunt.log.writeln(this.name+','+arg1+','+arg2) // foo,1,2

    }
  })
}