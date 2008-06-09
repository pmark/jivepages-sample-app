class FlickrCell < Cell

  def show
  end

  def index
    host = "flickr.com"
    uri = "/services/oembed"
    options = {
      :format => "json",
      :maxwidth => "200",
      :url => "http://flickr.com/photos/codepo8/2475016321/"
    }

    http = Net::HTTP.new(host)
    path = "#{uri}?#{options.to_query}"
    response = http.get(path)
    @json = response.body
  end

end