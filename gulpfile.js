const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('nodemon');
const exec = require('child_process').exec;

const config = require('./dist/config.js').default;
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
	return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
  	nodemon({
		script: 'dist/index.js',
		ext: 'js',
	});
});

gulp.task('watch', ['scripts'], () => {
	gulp.watch('src/**/*.ts', ['scripts']);
	gulp.watch('dist/**/*.ts', ['server']);
});

gulp.task('default', ['scripts', 'server', 'watch']);
