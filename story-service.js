angular.module('concept', []).service('Story', function() {
    /**
     * @return state for given story.
     */
    this.getState = function(story) {
        if (story.tasks.every(entry => entry.state === "todo")) {
            return "todo";
        }
        if (story.tasks.every(entry => entry.state === "done")) {
            return "done";
        }
        return "wip";
    }
    
    /**
     * @return percentage value of done stories.
     */
    this.getPercentageDone = function(story) {
        if (story.tasks.length === 0) {
            return 100.0;
        }

        var countDone = story.tasks.reduce(function(total, task) {
            if (task.state === "done") {
                return total + 1;
            }
            return total;
        }, 0);
        
        return countDone * 100.0 / story.tasks.length;
    }

    /**
     * @param story current story for which to calculate average complexity.
     * @return average complexity for given story.
     */
    this.getAverageComplexity = function(story) {
        if (story.tasks.length === 0) {
            return "none";
        }

        var complexity = story.tasks.reduce(function(total, task) {
            if (task.complexity === "easy") {
                total += 2;
            } else if (task.complexity == "moderate") {
                total += 8;
            } else if (task.complexity == "difficult") {
                total += 13;
            } else if (task.complexity == "unknown") {
                total += 144;
            }
            return total;
        }, 0);

        var averageComplexity =  complexity / story.tasks.length;

        if (averageComplexity < 5) { // (2+8)/2 = 5
            return "easy";
        } else if (averageComplexity < 10.5) { // (8+13)/2 = 10.5
            return "moderate";
        } else if (averageComplexity < 78.5) { // (13+144)/2 = 78.5
            return "difficult";
        }
        return "unknown";
    }

});