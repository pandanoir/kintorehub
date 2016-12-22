(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Util = factory());
}(this, (function () { 'use strict';

var commits = JSON.parse(localStorage.getItem('commits') || '[]');
riot.observable(commits);
var lowerBoundCommits = function(commits, date) {
    var first = 0, last = commits.length, mid;
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    while (last - first > 1) {
        mid = Math.floor((first + last) / 2);
        var commitDate = new Date(commits[mid].year, commits[mid].month, commits[mid].date);
        if (commitDate < date) {
            first = mid;
        } else {
            last = mid;
        }
    }
    var commitDate = new Date(commits[first].year, commits[first].month, commits[first].date);
    if (commitDate < date) return last;
    else return first;
};
var upperBoundCommits = function(commits, date) {
    var first = 0, last = commits.length, mid;
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    while (last - first > 1) {
        mid = Math.floor((first + last) / 2);
        var commitDate = new Date(commits[mid].year, commits[mid].month, commits[mid].date).getTime();
        if (commitDate <= date) {
            first = mid;
        } else {
            last = mid;
        }
    }
    var commitDate = new Date(commits[first].year, commits[first].month, commits[first].date).getTime();
    if (commitDate <= date) return last;
    else return first;
};
var binarySearch = function(commits, date) {
    var start = 0, end = commits.length - 1, mid;
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    while (start <= end) {
        mid = (start + end) / 2 | 0;
        var commitDate = new Date(commits[mid].year, commits[mid].month, commits[mid].date).getTime();
        if (commitDate < date) start = mid + 1;
        else if (commitDate === date) return mid;
        else end = mid - 1;
    }
    return -1;
};

var main = {
    commits,
    lowerBoundCommits,
    upperBoundCommits,
    binarySearch
};

return main;

})));
