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
            , all: [ 'src/**/*.js' ]
        }
        , clean: [
                'build'
                , '*.tar.gz']
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
            , all: [
                'Gruntfile.js'
                , 'src/**/*.js' ]
        }
        , watch: {
            files: [ 'src/**/*.js' ]
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
                        , 'src/**/*.js'
                        , 'test/*.spec.js'
                    ]
                    , reporters: ['mocha', 'coverage']
                    , preprocessors: {
                        'src/**/*.js': ['coverage']
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
                        , cwd: 'src'
                        , src: [ '**' ]
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
                    , src: [ '**' ]
                    , dest: '/'
                    }]
            }
        }
    , });
    grunt.registerTask('default', ['clean', 'jshint', 'karma', 'ngdocs', 'package']);
    grunt.registerTask('test', ['jshint', 'karma']);
    grunt.registerTask('package', ['copy:package', 'compress:package']);
};