'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps           = require('gulp-sourcemaps');
var autoprefixer      = require('autoprefixer');
var plumber          = require('gulp-plumber');
var filter              = require('gulp-filter');
var browserSync       = require('browser-sync').create();
var reload              = browserSync.reload;


gulp.task('sass', function () {
    // Sass plugins
    var sass_plugins = [
        // autoprefixer({ browsers: ['last 3 version'] })
    ];

    // Sass task error handler
    var errorHandler = function(errorObj) {
        // Notify the user
        browserSync.notify('Error: ' + beautifyMessage(errorObj.message));

        // Post the message in the console
        console.log(errorObj.message);

        // End this task
        this.emit('end');
    };

    var pipeErrorHandler = plumber(errorHandler);

    return gulp.src('src/style.scss')
        .pipe(pipeErrorHandler)                      // Prevent pipe breaking caused by errors from gulp plugins
        .pipe(sourcemaps.init())                     // source map init
        .pipe(sass( {
            plugins: sass_plugins
        }).on('error', errorHandler))                 // Sass
        .pipe(sourcemaps.write( '.' ))                // sourcemap write
        .pipe(gulp.dest( '.' ))                    // save css file
        .pipe(filter('**/*.css'))                    // filter only css files (remove the map file)
        .pipe(reload({stream: true}));                    // inject the changed css


    // return task;
});


// Browser sync server
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy : 'localhost',
        port  : 3001
    });
});

// Watch
gulp.task('watch', function() {
    gulp.watch('src/**/*.scss', ['sass']);

    // JS watch
    gulp.watch('js/*.js').on('change', reload);

    // HTML watch
    gulp.watch('**/*{.shtml,.html}').on('change', reload);
});



// Defaut Task
gulp.task('default', ['browser-sync', 'sass', 'watch']);

// Build Task
gulp.task('build', ['css']);




// Helpers

/**
 * Prepare message for browser notify.
 * @param  {string} message raw message
 * @return {string}         parsed message - new lines replaced by html elements.
 */
function beautifyMessage(message) {
    return '<p style="text-align: left">' + message.replace(/\n/g, '<br>') + '</p>';
}

