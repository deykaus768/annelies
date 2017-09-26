An experimental E-Com project.

Code Analysis using gulp-jshint and gulp-jscs
==============================================
1. Include .jscsrc and .jshintrc (defines the rules that is to be followed during vetting)
2. npm install --save-dev gulp-jscs jshint gulp-jshint (--save-dev for only dev dependencies)
3. jshint reporter - for showing the errors in a proper manner 
	- jshint-stylish  {verbose:true}
	- fail - if jshint,jscs issues are not passed then want to fail the task
4. gulp-print,gulp-if,yargs (getting user arguement) - for printing all the files which is touched during the task.
5. gulp-load-plugins - npm install --save-dev gulp-load-plugins (Factory pattern approach of gulp to load all the gulp-plugins)	
	- var $ = require('gulp-load-plugins');
	- gulp-print ($.print)