riot.tag2('commit-form', 'title:<br> <input type="text" ref="title"><br> description:<br> <textarea ref="desc"></textarea><br> <button onclick="{click}">commit</button> <button onclick="{clear}">clear</button>', '', '', function(opts) {
this.click = function() {
  var today = new Date();
  Util.commits.push({year: today.getFullYear(), month: today.getMonth(), date: today.getDate(), title: this.refs.title.value, description: this.refs.desc.value});
  Util.commits.trigger('change');
  localStorage.setItem('commits', JSON.stringify(Util.commits));
}.bind(this)
this.clear = function() {
  Util.commits = [];
  Util.commits.trigger('change');
  localStorage.clear();
}.bind(this)
});
