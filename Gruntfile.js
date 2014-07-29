module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        
		
		uglify: {
	      /*dist: {
	        files: {
	          'build/js/compiled.min.js': ['js/jquery.min.js','js/mustache.js','js/bootstrap.min.js','js/*.js'] // make sure we load jQuery first
	        }
	      },*/
	        options:{
	        	mangle : false,
	        	compress : true,
	        	beautify: false
	        },
	        build: {
		      files: {
	          'build/js/production.min.js': ['js/libs/jquery/jquery.min.js','js/libs/requirejs/require.js','js/*.js'] // make sure we load jQuery first
	        }
		    }
	   },
		cssmin: {
		  add_banner: {
		    options: {
		      banner: '/* My minified css file */'
		    },
		    files: {
		      'build/css/build.css': ['js/libs/bootstrap/dist/css/bootstrap.min.css', 'js/libs/font-awesome/css/font-awesome.min.css', 'css/*.css']
		    }
		  }
		},
	   processhtml: {
	      dist: {
	        files: {
	        'build/index.html': ['index.html']
	        }
	      }
	    },
		htmlmin: {                                     // Task
		    dist: {                                      // Target
		      options: {                                 // Target options
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                   // Dictionary of files
		        'build/index.html': 'build/index.html',    // 'destination': 'source'
		        'build/html/add.html' : 'html/add.html',
		        'build/html/calendar.html' : 'html/calendar.html',
		        'build/html/detail.html' : 'html/detail.html',
		        'build/html/list.html' : 'html/list.html'
		      }
		    }
		  },
		watch: {
		    scripts: {
		        files: ['js/*.js'],
		        tasks: ['concat', 'uglify'],
		        options: {
		            livereload: true,
		            spawn: false,
		        },
		    } 
		},
		copy: {
		  main: {
		    files: [
		      // includes files within path
		      {expand: true, flatten: true, src: ['js/libs/font-awesome/fonts/*'], dest: 'build/fonts/', filter: 'isFile'}
		    ]
		  }
		},
		// require js optimization
		requirejs: {
		    compile: {
		        options: {
		            // name is required
		            name: "main",
		            // the base path of our optimization
		            baseUrl: "js/",
		            // include almond to get define (in place of require.js)
		           // include: "../lib/almond-0.2.5",
		            // use our original main configuration file to avoid
		            // duplication.  this file will pull in all our dependencies
		            mainConfigFile: "js/main.js",
		            // the output optimized file name
		            out: "build/js/build.js"
		        }
		    }
		}
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [ 'uglify', 'cssmin','processhtml', 'htmlmin', 'copy', 'requirejs']);

};