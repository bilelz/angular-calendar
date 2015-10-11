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
	          'build/js/build.js': ['build/js/build.js'] // make sure we load jQuery first
	        }
		    }
	   },
		cssmin: {
			options: {
			    advanced: false, 
			    noAdvanced : false
			  },
		  	add_banner: {
			    options: {
			      banner: '/* My minified css file */'
			    },
		    files: {
		      'build/css/build.css': [	'js/libs/bootstrap/dist/css/bootstrap.min.css', 
		      							'js/libs/font-awesome/css/font-awesome.min.css', 
		      							'js/libs/animate.css/animate.min.css',
		      							'css/*.css']
		    }
		  }
		},
	   processhtml: {
			options: {
		      data: {
		        message: 'Hello world!', 
		        version : '<%= grunt.template.today("yyyymmddHHMM") %>'
		      }
		    },
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
		        'build/html/list.html' : 'html/list.html',
		        'build/html/search.html' : 'html/search.html'
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
		      {expand: true, flatten: true, src: ['package.json'], dest: 'build/', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['js/lang/*'], dest: 'build/js/lang/', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['js/libs/font-awesome/fonts/*'], dest: 'build/fonts/', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['js/libs/requirejs-plugins/src/async.js'], dest: 'build/js/libs/requirejs-plugins/src/', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['js/libs/requirejs-plugins/src/goog.js'], dest: 'build/js/libs/requirejs-plugins/src/', filter: 'isFile'},
		      {expand: true, flatten: true, src: [	'js/misc/add.php', 
		      										'js/misc/detail.php', 
		      										'js/misc/list.php', 
		      										'js/misc/atom.php', 
		      										'js/misc/download.php'], dest: 'build/js/misc/', filter: 'isFile'}

		      
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
		            include: "libs/requirejs/require.js",
		            // use our original main configuration file to avoid
		            // duplication.  this file will pull in all our dependencies
		            mainConfigFile: "js/main.js",
		            // the output optimized file name
		            out: "build/js/build.js",
		            optimize: "none"
		        }
		    }
		},
		imagemin: {                          // Task
		    
		    dynamic: {                         // Another target
		      files: [{
		        expand: true,                  // Enable dynamic expansion
		        cwd: 'img/',                   // Src matches are relative to this path
		        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
		        dest: 'build/img/'                  // Destination path prefix
		      }]
		    }
		  },
		 clean: ["build/"],
		 // make a zipfile
		compress: {
		  main: {
		    options: {
		      archive: 'build/build_<%= grunt.template.today("yyyy-mm-dd_HHMM") %>.zip'
		    },
		    files: [
		      {expand: true, src: ['**', '!build/*.zip'], cwd: 'build/'}, // includes files in path and its subdirs
		    ]
		  }
		},
		cacheBust: {
		    options: {
		      encoding: 'utf8',
		      algorithm: 'md5',
		      length: 32,
		      deleteOriginals: true,
		      ignorePatterns: []
		    },
		    assets: {
		      files: [{
		        src: ['build/index.html']
		      }]
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
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-cache-bust');



    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['clean', 'cssmin','processhtml', 'htmlmin', 'copy', 'requirejs', 'uglify','cacheBust', 'imagemin', 'compress']);

};