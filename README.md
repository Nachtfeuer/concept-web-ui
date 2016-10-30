# Welcome to the concept web-ui repository

## Introduction
It's about playing with AngularJS, jQuery, Bootstrap and similar.
Also for myself I would like to have a - hopefully - quite nice
example where technologies are combined in simple examples.

With the intention of high quality I'm using separation as
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
You require an index.html. Just a few lines an AngularJS and Bootstrap are known there.
Of course there are tools to organize that all those dependencies are installed
locally but as a start you can live without accessing the dependencies in the web.

Next you require the module (application) and at least one controller. The module
you find in **concept.js** and the controller in **story.js**. Ensure that you include
it in your index.html in that order.

The story controller is very simple. You load the JSON and assign it to the controller field.
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

I don't show yet tasks (comes later) but following columns could be added because we have the data:

* The number of tasks per story.
* Showing the state of the story by calculating it.
* Showing the percentage of completion.

In addition I can adjust the default sorting to the id (ascending order) but allow clicking
each column header to sort by this one and clicking same column header twice toggles between
ascending and descending order. The result was this:

![Second table with sortable columns and additional columns](docs/images/second-table.png)

## Adding searching/filtering

The next step is to add a **searching/filtering capability** and that's using the
filter Functionality provided by AngularJS.

Again Bootstrap does help that the filter input looks quite nice. In addition I add a further column
that calculates the complexity. Here some thoughts to it:

* I internaly adjust "easy" to 2, "moderate" to 8 and "difficult" to 13 (taken from fibonacci sequence)
* Story with three tasks: one easy, one moderate and one difficult is (2+8+13)/3 is ~ 7 => nearest value is 5 so the average complexity will be moderate.
* Story with three tasks: two easy, 1 difficult: (2*2+13)/3 is ~ 5 so average complexity will be moderate
* For unknown complexity I take 144 (also from fibonacci sequence). Of course I assume that stories are kept as small as possible. If the story has more than one difficult task you probably should consider to breakdown the story into two or even more stories. Unknown complexity anyway should enforce that too.

The result was this:
![Third table with searching/filtering and complexity](docs/images/third-table.png)

## Expand and collapse for individual stories

It's now time to show/hide the tasks. Basically I use same row used for the story for displaying
the tasks. A dictionary remembers for each story the expand/collapse state. The advantage of this
design is that it is easy to implement and that sorting and filtering still work fine with this.
The basic AngularJS mechanism used for it is **ng-show**.

The result was this:
![Fourth table with expand/collapse of stories](docs/images/fourth-table.png)


## Expand and collapse for all stories and labels

Of course all stories should be expandable/collapsable in one step; therefore I place a icon in the outer left cell of the column header. The **ng-show** depends on a scope variable remembering current toggle state and a scope function **toggleAllStories** does the job (really easy). The labels I simply put after the title since there is enough space. I also tested to print and I have seen that the search form would have been printed; that's why I put a class attribute **hidden-print** at the form (see Bootstrap).

The result was this:
![Fifth table with expand/collapse of all stories](docs/images/fifth-table.png)






