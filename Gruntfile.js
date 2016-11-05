module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.initConfig({
            ngdocs: {
                options: {
                    dest: "build/docs"
                    , title: "Concept Web UI Documentation"
                    , html5Mode: false
                    , imageLink: "https://github.com/Nachtfeuer/concept-web-ui"
                }
                , all: [
                'concept.js'
                , 'controller/*.js'
                , 'directives/*.js'
                , 'service/*.js'
            ]
            }
            , clean: [
            'build'
        ]
            , jshint: {
                options: {
                    esversion: 6
                    , curly: true
                    , maxdepth: 3
                    , maxstatements: 15
                    , unused: true
                    , laxcomma: true
                    , reporter: require('jshint-stylish')
                }
                , all: ['Gruntfile.js'
                    , 'concept.js'
                    , 'controller/*.js'
                    , 'directives/*.js'
                    , 'service/*.js']
            }
            , watch: {
                files: [
                'concept.js'
                , 'controller/*.js'
                , 'directives/*.js'
                , 'service/*.js']
                , tasks: ['test']
            }
            , karma: {
                unit: {
                    options: {
                        frameworks: ['jasmine']
                        , singleRun: true
                        , browsers: ['PhantomJS']
                        , files: [
                        'lib/jquery/dist/jquery.js'
                        , 'lib/angularjs/angular.js'
                        , 'lib/angular-mocks/angular-mocks.js'
                        , 'service/*.js'
                        , 'directives/*.js'
                        , 'test/*.spec.js'
                    ]
                        , reporters: ['mocha', 'coverage']
                        , preprocessors: {
                            'service/*.js': ['coverage']
                            , 'controller/*.js': ['coverage']
                            , 'directives/*.js': ['coverage']
                        }
                        , coverageReporter: {
                            type: 'html'
                            , dir: 'build/coverage/'
                        }
                    }
                }
            }
            , copy: {
                package: {
                    files: [
                        {
                            expand: true
                            , src: ['concept.js', 'index.html', 'data.json']
                            , dest: 'build/dist/'
                            , filter: 'isFile'
                    }
                    , {
                            expand: true
                            , src: ['service/**']
                            , dest: 'build/dist/'
                    }
                    , {
                            expand: true
                            , src: ['controller/**']
                            , dest: 'build/dist/'
                    }
                    , {
                            expand: true
                            , src: ['directives/**']
                            , dest: 'build/dist/'
                    }
                    , {
                            expand: true
                            , src: ['lib/**']
                            , dest: 'build/dist/'
                    }
                ]
                }
            }
            , compress: {
                package: {
                    options: {
                        mode: 'tgz'
                        , archive: function() {
                            return 'concept-web-ui.tar.gz';
                        }
                    }
                    , files: [{
                        expand: true
                        , cwd: 'build/dist/'
                        , src: ['**']
                        , dest: '/'
                    }]
                }
            }
    , });
grunt.registerTask('default', ['clean', 'jshint', 'karma', 'ngdocs', 'package']);
grunt.registerTask('test', ['jshint', 'karma']);
grunt.registerTask('package', ['copy:package', 'compress:package']);
};