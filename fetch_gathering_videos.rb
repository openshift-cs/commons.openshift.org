#!/usr/bin/ruby

#################
# Produces /data/gathering_videos.yml file with YouTube video links based on playlist IDs found
# in /data/gatherings.yml; this file is later used by Middleman to build a static video page.
# This script is intended to be run before middleman build

GATHERINGS_FILE = "gatherings.yml"
OUTPUT_FILE = "gathering_videos.yml"
YT_PLAYLIST_PAGINATION = 20 # YouTube video results per page when querying playlistItems (max 50, default 5)
SLEEP_SECONDS = 1 # throttling individual API requests

puts "----> Attempting to get YouTube playlists from ./data/#{GATHERINGS_FILE}"

require 'json'
require 'net/http'
require 'psych'

# check YouTube API key environment variable presence
if !ENV["YT_API_KEY"]
  STDERR.puts("ERROR: Cannont generate Gathering video list (YT_API_KEY env. variable missing).")
  exit(false)
end

# Check YouTube API key validity
uri = URI('https://www.googleapis.com/youtube/v3/search')
params = { :part => "snippet", :key => ENV["YT_API_KEY"], :q => "foo", :resultsPerPage => 1 }
uri.query = URI.encode_www_form(params)
res = Net::HTTP.get_response(uri)
if res.code() == '400'
  data = JSON.parse(res.body())
  if data["error"]["errors"][0]["reason"] == "keyInvalid"
    STDERR.puts("ERROR: Invalid YouTube API key.")
    exit(false)
  end
end

# output that will be eventually converted to the yaml #{OUTPUT_FILE}
output = { "videos" => [] }
playlist_count = 0
video_count = 0

# be path aware
Gatherings_file = File.join(File.dirname(__FILE__),"/data/#{GATHERINGS_FILE}")
Output_file = File.join(File.dirname(__FILE__),"/data/#{OUTPUT_FILE}")

# loop through gatherings and find YouTube playlist IDs
begin
  gatherings = Psych.load_file(Gatherings_file)
rescue
  STDERR.puts("ERROR: Cannot load Gatherings YAML (trying #{Gatherings_file})")
  exit(false)
end
index = 0
gatherings["gatherings"].each do |gathering|
  # only the gathering name, the event date and the playlist ID are required for the video list
  if gathering["youtube_playlist_id"] && gathering["name"] && gathering["date"]
    print gathering["name"]
    output["videos"] << { "gathering_name" => gathering["name"], "gathering_date" => gathering["date"], "gathering_videos" => [] }
    playlist_count += 1
    uri = URI('https://www.googleapis.com/youtube/v3/playlistItems')
    params = { :part => "snippet", :playlistId => gathering["youtube_playlist_id"], :key => ENV["YT_API_KEY"], :maxResults => YT_PLAYLIST_PAGINATION }
    # loop through all the videos in the playlist
    loop do
      uri.query = URI.encode_www_form(params)
      res = Net::HTTP.get_response(uri)
      # break if unexpected response (incorrect playlist ID, connection issues)
      if res.code() != '200'
        puts "WARN: Failed getting videos for " + gathering["name"]
        break
      end
      data = JSON.parse(res.body())
      # add retrieved items to output
      data["items"].each do |item|
        # ignore private videos (which dot return thumbnails, link, etc.)
        if item["snippet"]["title"] != "Private video" && item["snippet"]["description"] != "This video is private."
          video_count += 1
          output["videos"][index]["gathering_videos"] << item["snippet"]
          # description, upload date, etc. to /data/gathering_videos.yml for the gathering
          print "."
        end
      end
      # terminate the loop, if the nextPageToken does not exist...
      break if !data["nextPageToken"]
      # ...otherwise continue with the next page of results
      params.merge!( :pageToken => data["nextPageToken"] )
      sleep(SLEEP_SECONDS)
    end
    print "\n"
    index += 1
    sleep(SLEEP_SECONDS)
  end
end

if playlist_count > 0
  puts "Processed " + video_count.to_s + " total videos from " + playlist_count.to_s + " playlists."
  if File.exists?(Output_file)
    puts "Deleting old #{OUTPUT_FILE} file."
    File.delete(Output_file)
  end
  puts "----> Writing result to #{OUTPUT_FILE}"
  File.open(Output_file, "a") { |f| f.write(output.to_yaml) }
else
  STDERR.puts "----> WARN: No YouTube playlists found in #{Gatherings_file}"
  # TODO (low) take care of a situation when there are no videos generated
  # (something like remove link to past videos from menu, do not generate pages)
end
