module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    './bower_components/jQuery/dist/jquery.js',
                    './bower_components/modernizr/modernizr.js',
                    'js/app.js'
                ],
                dest: 'js/build/production.js',
            }
        },
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },
        autoprefixer: {
            single_file: {
                options: {
                    browsers: ["last 4 versions", "ios 6"]
                },
                src: 'css/style.css',
                dest: 'css/style.css'
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },
        watch: {
            options: {
                livereload: false
            },
            scripts: {
                files: [
                    './bower_components/jQuery/dist/jquery.js',
                    './bower_components/modernizr/modernizr.js',
                    'js/app.js'
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify' ]);

};