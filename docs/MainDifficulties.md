## About the main difficulties

### Table Of Content
[**Difficulties in unittesting**](#difficulties-in-unittesting)  
[**Different scopes**](#different-scopes)  
[**Keep things very small**](#keep-things-very-small)  
[**A lot of tools and plugins**](#a-lot-of-tools-and-plugins)  

## Difficulties in unittesting
The Jasmine tests are quite nice in the way you write tests but
developing AngularJS 1.x you have to find out how to mock things.
You can find plenty of examples in the web but it took a while
to understand how it works for controller, services and for
directives especially when you have dependencies. You can find
the way to do in the given unit tests in this project.

Another aspect is **to configure Karam correctly** since a missing
dependency will fail your tests and you don't have a clue when
you you read the error messages. I have been missing ngDialog at
the beginning and wondered why the tests failed also I did everything
same way as the examples in the web.

## Different scopes!
Using `ng-include` you start a new scope. It's just an example. You have
to story your data in a shareble model because simple integer fields,
float fields, string fields and boolean fields will be copied.

## Keep things very small!
You won't get happy when you write one huge controller. With the intention
to have a very high code coverage (linne coverage > 90%) you have to break
down your design into small units. **Reusability** is important.

## A lot of tools and plugins
Not talking about the used `libraries` by your application the number of required
tools and plugins to have the whole development process is not small. Also
here it took a while to have all in place like

* build the artifact (package)
* compression (package)
* unit testing
* code coverage and limits
* code analysis (complexity, jshint)
* watching changes for updating the distribution
* provide local server
* HTML documentation of your code
* cleanup

After you have find out how it works you still have to be aware of following:

* Others are using npm only (no bower, no grunt)
* Others are using gulp

Depending on your choice you might have to investigate in `Browserify` or `Webpack`.
It looks to me like a endless road of possibilities but far away from a reasonable
standardization. Even more AngularJS 2.x does fully change its design being a totally
different product.

It is something you have to think about carefully.