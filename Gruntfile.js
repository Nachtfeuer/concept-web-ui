module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-clean');
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
    , });
    grunt.registerTask('default', ['clean', 'ngdocs']);
};