# Welcome to the concept web-ui repository

## Introduction
It's about playing with AngularJS, jQuery, Bootstrap and similar.
Also for myself I would like to have a - hopefully - quite nice
example where technologies are combined in simple examples.

With the intention of high quality using separation as
much as possible, documentation of the source and this readme
with all required information that anybody - including me -
can take parts of the examples to use it for something else.

## Consider some data
First let us consider some data we would like to visualize.
Let us take stories and tasks as data with following definitions:

* A story can have an unlimited number of tasks.
* Each story and each task has an id and a title
* The story id's should be unique
* The id's of the tasks should be unique inside the given story.
* Each task has one of following states: **todo**, **wip** and **done**.
* Each task has one of following complexities: **easy**, **moderate**, **difficult** and **unknown**
* Each task has one of following effort levels: **soon**, **days**, **weeks**, **unknown**.
* Each story can have a description while task titles should be sufficient.
* Each story may have one of following priorities: **crititcal**, **urgent**, **normal** and **nice to have**.
* Each story can have labels (list of texts)

As a start those definitions should be sufficient. With this I'm going to write a JSON file.
You can see current stories and tasks in the file **data.json**.

## The first steps
We require an index.html. Just a few lines an AngularJS and Bootstrap are known.
Of course there are tools to organize that all those dependencies are installed
locally but as a start we can live without accessing the dependencies in the web.

Next we require the module (application) and at least one controller. The module
you find in **concept.js** and the controller in **story.js**. Ensure that you include
it in your index.html in that order.

The story controller is very simple. We load the JSON and assign it to the controller field.
You have to use the apply mechanism as you can see there.

The table has finally just one data row definition with the attribute **ng-repeat**
where you define the loop "for element in list" which looks similar as in many other languages.

The class definition from Bootstrap are doing most for you. The documentation is really
good so have a look what the **container**, **table** and **page-header** provide you
looking at http://getbootstrap.com/css/.

When writing this section the index.html has less than 40 lines of code.
The result was this:

![First table with some stories](docs/images/first-table.png)

## More columns and sorting

We don't show yet tasks (comes later) but following columns we could add because we have the data:

* The number of tasks we have per story.
* We can show the state by calculating it.
* We could show the percentage of completion.

In addition we can adjust the default sorting to the id (ascending order) but allow clicking
each column header to sort by this one and clicking same column header twice toggles between
ascending and descending order. The result was this:

![Second table with sortable columns and additional columns](docs/images/second-table.png)
