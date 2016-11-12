module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.initConfig({
        ngdocs: {
            options: {
                dest: "build/docs"
                , title: "Concept Web UI Documentation"
                , html5Mode: false
                , imageLink: "https://github.com/Nachtfeuer/concept-web-ui"
            }
            , all: ['src/**/*.js']
        }
        , clean: [
            'build'
            , '*.tar.gz']
        , jshint: {
            options: {
                esversion: 6
                , curly: true
                , maxdepth: 3
                , maxstatements: 20
                , maxparams: 6
                , unused: true
                , laxcomma: true
                , reporter: require('jshint-stylish')
            }
            , all: [
                'Gruntfile.js'
                , 'src/**/*.js']
        }
        , watch: {
            tests: {
                files: ['src/**/*.js', 'test/*.spec.js']
                , tasks: ['test']
            }
            , copy: {
                files: ['src/**']
                , tasks: ['copy']
            }
        }
        , karma: {
            unit: {
                options: {
                    frameworks: ['jasmine']
                    , singleRun: true
                    , autoWatch: true
                    , browsers: ['PhantomJS']
                    , logLevel: 'ERROR'
                    , files: [
                        'lib/jquery/dist/jquery.js'
                        , 'lib/angularjs/angular.js'
                        , 'lib/angular-mocks/angular-mocks.js'
                        , 'lib/angular-cookies/angular-cookies.js'
                        , 'lib/ng-dialog/js/ngDialog.js'
                        , 'src/**/*.js'
                        , 'test/*.spec.js'
                    ]
                    , reporters: ['mocha', 'coverage', 'threshold']
                    , preprocessors: {
                        'src/**/*.js': ['coverage']
                    }
                    , coverageReporter: {
                        reporters: [
                            {type: 'html', dir: 'build/coverage/'},
                            { type: 'text' }
                        ]
                    }
                    , thresholdReporter: {
                        statements: 95,
                        branches: 97,
                        functions: 90,
                        lines: 95
                    }
                }
            }
        }
        , copy: {
            package: {
                files: [
                    {
                        expand: true
                        , cwd: 'src'
                        , src: ['**']
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
                    , archive: function () {
                        var bowerJson = grunt.file.readJSON('./bower.json');
                        return bowerJson.name + '-' + bowerJson.version + '.tar.gz';
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
        , complexity: {
            generic: {
                src: ['src/**/*.js'],
                exclude: [],
                options: {
                    breakOnErrors: true,
                    errorsOnly: false,
                    cyclomatic: 5,
                    halstead: 10,
                    maintainability: 100,
                    hideComplexFunctions: false,
                    broadcast: false
                }
            }
        }
    });
    grunt.registerTask('default', ['clean', 'jshint', 'complexity', 'karma', 'ngdocs', 'package']);
    grunt.registerTask('test', ['jshint', 'complexity', 'karma']);
    grunt.registerTask('package', ['copy:package', 'compress:package']);
};