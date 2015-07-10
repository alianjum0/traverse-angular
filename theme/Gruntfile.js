sassFiles = {
    '../stylesheets/style.css': 'custom-theme/style.scss'
}

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: sassFiles
            },
            dist: {
                options: {
                    style: 'expanded'
                },
                files: sassFiles
            }
        },
        watch: {
            sass: {
                files: 'custom-theme/*.scss',
                tasks: ['sass:dev']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass:dist']);
};