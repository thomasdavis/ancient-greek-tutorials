var _ = require('underscore');
var fs = require('fs');
var marked = require('marked');
var book = fs.readFileSync('book.txt', 'utf8');
var indexTemplate = fs.readFileSync('index.template', 'utf8');
var bookPages = book.split('\n');
var pages = [];
_.each(bookPages, function (page) {
	var pageContents = fs.readFileSync(page, 'utf8');
	var title = marked.lexer(pageContents)[0].text;
	var link = page.replace('.md', '.html');
	pages.push({
		title: title,
		contents: marked(pageContents),
		link: link
	})
});
_.each(pages, function(page){
	page.contents = page.contents.replace(/table>/g, 'table class="table">');
	var currentPage = _.template(indexTemplate, {pages: pages, currentLink: page.link, currentPage: page.contents});
	fs.writeFileSync(page.link, currentPage, 'utf8');
});
