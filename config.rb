###
# Settings
###
set :site_title, "OpenShift Commons"
set :site_url, 'https://commons.openshift.org/'
set :openshift_assets, 'https://assets.openshift.net/content'

###
# Assets
###
set :css_dir, 'css'
set :fonts_dir, 'fonts'
set :images_dir, 'img'
set :js_dir, 'js'

###
# Page command
###
page "/sitemap.xml", layout: false

###
# Generating individual dynamic Gathering pages from template
###
data.gatherings.gatherings.each do |gathering|
  proxy "/gatherings/#{gathering.name.gsub(" ","_")}.html", "/gatherings/template.html", :locals => { :gathering => gathering }, :ignore => true
end

# Development-specific configuration
configure :development do
  activate :php
end

# Build-specific configuration
configure :build do
  config.ignored_sitemap_matchers[:source_dotfiles] = proc { |file|
    file =~ %r{/\.} && file !~ %r{/\.(s2i|openshift|htaccess|htpasswd|nojekyll|git)|containers}
  }

  activate :minify_css
  activate :minify_javascript
end
