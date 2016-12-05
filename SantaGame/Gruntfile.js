'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/{,*/}*.html',
                    'app/css/{,*/}*.css',
                    'app/js/{,*/}*.js'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('app')
                        ];
                    }
                }
            },
        },
    });
    grunt.registerTask('server', function (target) {
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });
};
