riot.tag2('shiba', '<div class="week" each="{week, i in weeks}"> <div class="{day: true, shiba: isShiba[i][j]}" each="{day, j in week}"></div> </div>', 'shiba,[data-is="shiba"]{ display: flex; flex-direction: row; } shiba .week,[data-is="shiba"] .week{ display: flex; flex-direction: column; } shiba .day,[data-is="shiba"] .day{ background: #eee; display: inline-block; height: 10px; width: 10px; margin: 1px; } shiba .shiba,[data-is="shiba"] .shiba{ background: #44a340; }', '', function(opts) {
  var year = new Date().getFullYear();
this.weeks = createYear(year);
this.isShiba = shibaTable(year, this.weeks);
var self = this;
Util.commits.on('change', function() {
  self.isShiba = shibaTable(year, self.weeks);
  self.update();
});
function shibaTable(year, calendar) {
  var month = -1;
  var res = [];
  var upper = Util.upperBoundCommits(Util.commits, new Date(year, 11, 31));
  var lower = Util.lowerBoundCommits(Util.commits, new Date(year, 0, 1));
  for (var i = 0, _i = calendar.length; i < _i; i++) {
    res.push([]);
    for (var j = 0, _j = calendar[i].length; j < _j; j++) {
      if (calendar[i][j] === 1) {
        month++;
      }
      res[i][j] = Util.binarySearch(
        Util.commits.slice(lower, upper),
        new Date(year, month, calendar[i][j])
      ) !== -1;
    }
  }
  return res;
}
function createYear(year) {
  var days = [];
  for (let i = 1 - new Date(year, 0, 1).getDay(); i < 0; i++) days.push(0);
  for (var month = 0; month < 12; month++) {
    var lastDay = new Date(year, month + 1, 0).getDate();
    for (var day = 1; day <= lastDay; day++) days.push(day);
  }

  var weeks = [];
  for (var i = 0; i < days.length; i += 7) {
    weeks.push([]);
    for (var j = 0; j < 7; j++) {
      weeks[i / 7 | 0].push(days[i + j]);
    }
  }
  return weeks;
}
});
