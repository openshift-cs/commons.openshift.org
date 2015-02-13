require 'nokogiri'   
require 'open-uri'

module SigHelper
	def openshiftv3
		page_url = "https://blog.openshift.com/tag/v3/"

		page = Nokogiri::HTML(open(page_url))

		posts = page.css(".post")
       
		# @title = posts.at_css(".entry-title").text
		# @link = posts.at_css(".entry-title a")[:href]
		# @summary = posts.at_css(".entry-summary").text

		#summary = page.css(".entry-summary p")
	end

	def operations
		page_url = "https://blog.openshift.com/tag/operations/"

		page = Nokogiri::HTML(open(page_url))

		posts = page.css(".post")
       
		# @title = posts.at_css(".entry-title").text
		# @link = posts.at_css(".entry-title a")[:href]
		# @summary = posts.at_css(".entry-summary").text

		#summary = page.css(".entry-summary p")
	end
end
