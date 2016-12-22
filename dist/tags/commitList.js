riot.tag2('commit-list', '<ul> <li each="{commit in commits}"> <span>{commit.month + 1}/{commit.date}</span> <span>{commit.title}</span> </li> </ul>', '', '', function(opts) {
this.commits = Util.commits;
this.commits.on('change', () => this.update())
});
