// this function is used for rendering blog post links on SIG pages only
function displayBlogPosts(feedUrl, maxItems, blogFeedContainer) {

  var blogItemHtml = function(link, title, date, description) {
    htmlTemplate = '<div class="col-xs-12 col-md-6"><div class="blog-article"><div class="blog-item"><i class="fa fa-newspaper-o"></i><h3><a href="' + link + '">' + title + '</a></h3><div class="blog-article-description"><p>' + description.split(/\s+/).slice(0,20).join(" ") + '&hellip;</p></div></div></div></div>';
    return htmlTemplate;
  };

  $.ajax({
    url: feedUrl,
    accepts:{
			xml:"application/rss+xml"
		},
    dataType: "xml",
    error: function() {
      console.log("Error occurred while getting blog RSS feed from " + this.url);
    },
    success: function(response) {
      console.log("Blog feed retrieved.");
      var output = "";
      $(response).find("item").slice(0, maxItems).each(function () {
        var el = $(this);
        output += blogItemHtml(el.find("link").text(), el.find("title").text(), el.find("pubDate").text(), el.find("description").text())
      });
      blogFeedContainer.html(output);
    },
    complete: function() {
      $("#blog-feed-sig .blog-article").matchHeight();
    }
  });
}