# Welcome to the tools section

### Table Of Contents

[**How to upgrade npm on Windows?**](#how-to-upgrade-npm-on-windows)  
[**How to solve too long paths in node_modules on Windows?**](#how-to-solve-too-long-paths-in-node_modules-on-windows)  
[**How to copy all relevant files into a distribution folder?**](#how-to-copy-all-relevant-files-into-a-distribution-folder)  
[**How to create a package of your distribution?**](#how-to-create-a-package-of-your-distribution)  
[**How to watch for changes and trigger tasks?**](#how-to-watch-for-changes-and-trigger-tasks)  

# How to upgrade npm on Windows?

Run as Adminstrator a Windows Powershell:

```
npm install -g npm-windows-upgrade
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
npm-windows-upgrade
```

# How to solve too long paths in node_modules on Windows?

One solution is to use the tool `robocopy`.
You can call it like this:

```
robocopy . node_modules /purge
rd /s node_modules
```

The `purge`parameter ensures that all file from source which do not
exist at destination are removed. I found that solution here:
http://web.ageofascent.com/reduce-node_modules-recursion-long-paths-asp-net-5/

# How to copy all relevant files into a distribution folder?

When you check my `Gruntfile.js` you will find the code of the next box.
It does use `grunt-contrib-copy`.

```
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
                        , src: [ 'lib/**' ]
                        , dest: 'build/dist/'
                    }
                ]
            }
        }
```

# How to create a package of your distribution?

When you check my `Gruntfile.js` you will find the code of the next box.
It does use `grunt-contrib-compress`.

A few notes:

 * The package name is built via a function that does load the bower JSON and extract name and version for that.
 * I use `cwd`in the file section since I don't want to have `build/dist` included in the final package.

```
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
```

# How to watch for changes and trigger tasks?

When you check my `Gruntfile.js` you will find the code of the next box.
It does use `grunt-contrib-watch`.

A few notes:

 * You just say `grunt watch` to activate the observing.
 * When a JavaScript file in the src folder has changed the tests will run automatically.
 * When a unittest in the test folder has changed the tests also will run automatically.
 * Also a change of any file in src path results in an updating of the `build/dist` folder.
 
With this you can have your IDE open and a Browser is displaying the index.html and another
console is running the watch task.

```
        , watch: {
            tests: {
                files: ['src/**/*.js', 'test/*.spec.js' ]
                , tasks: [ 'test' ]
            }
            , copy: {
                files: ['src/**']
                , tasks: [ 'copy' ]
            }
        }
```

