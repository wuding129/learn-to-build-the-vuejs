/**
 * Created by chuck on 2016/9/18.
 */
module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true
            },
            build: {
                src: ['gruntfile.js', 'tasks/*.js']
            },
            src: {
                src: 'src/**/*.js'
            },
            test: {
                src: 'test/*/specs/*.js'
            }
        },

        karma: {
            options: {
                frameworks: ['jasmine', 'commonjs'],
                preprocessors: {
                    'src/**/*.js': ['commonjs'],
                    'test/unit/specs/*': ['commonjs']
                },
                files: [
                    'src/**/*.js',
                    'test/unit/specs/*.js'
                ],
                singleRun: true
            },
            browsers: {
                options: {
                    browsers: ['Chrome', 'Firefox'],
                    reporters: ['progress']
                }
            }
        },

        browserify: {
            options: {
                browserifyOptions: {
                    standalone: 'Vue'
                }
            },
            build: {
                src: ['src/vue.js'],
                dest: 'dist/vue.js'
            },
            watch: {
                src: ['src/vue.js'],
                dest: 'dist/vue.js',
                options: {
                    watch: true,
                    keepAlive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('unit', ['karma:browsers']);
    grunt.registerTask('watch', ['browserify:watch']);
    grunt.registerTask('build', ['browserify:build']);


};
