module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
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
            'build/docs'
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
                        'lib/jquery/jquery.js'
                        , 'lib/angularjs/angular.js'
                        , 'lib/angular-mocks/angular-mocks.js'
                        , 'service/story-service.js'
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
    , });
    grunt.registerTask('default', ['clean', 'jshint', 'ngdocs']);
    grunt.registerTask('test', ['jshint', 'karma']);
};