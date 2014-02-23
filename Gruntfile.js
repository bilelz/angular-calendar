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
		      'build/css/production.min.css': ['css/*.css']
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
		        'build/index.html': 'index.html',    // 'destination': 'source'
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
		      {expand: true, flatten: true, src: ['js/libs/font-awesome/font/*'], dest: 'build/css/font/', filter: 'isFile'}
		    ]
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

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [ 'uglify', 'cssmin','processhtml', 'htmlmin', 'copy']);

};