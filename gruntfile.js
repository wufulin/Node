/**
 * Created by wufulin on 26/11/14.
 */

module.exports = function(grunt){

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },

        jshint: {
            options: {
                ignores: ['public/libs/**/*.js']
            },
            all: ['public/js/*.js', 'app/**/*.js']
        },

        uglify: {
            build: {
                files: {
                    'public/build/admin.min.js': ['public/js/admin.js']
                }
//                files: [{
//                    expand: true,
//                    cwd: 'js',
//                    src: '**/*.js',
//                    dest: 'output/js'
//                }]
            }
        },

        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    ignoreFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
//            tasks: ['nodemon', 'watch', 'uglify:build'],
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.option('force', true);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concurrent']);
};
