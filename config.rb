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

# Reload the browser automatically whenever files change
configure :development do
  set :site_url, 'https://commons-openshift.c9.io/'
  set :openshift_assets, 'https://assets-openshift.c9.io/content'
end

# Build-specific configuration
configure :build do
  config.ignored_sitemap_matchers[:source_dotfiles] = proc { |file|
    file =~ %r{/\.} && file !~ %r{/\.(openshift|htaccess|htpasswd|nojekyll|git)}
  }
  
  activate :minify_css
  activate :minify_javascript
end

# Deployment configuration
activate :deploy do |deploy|
  deploy.method = :git
  deploy.build_before = true # default: false
  deploy.remote = 'production' # remote name or git url, default: origin
  deploy.branch = 'master' # default: gh-pages
end