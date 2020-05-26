from googlemaps import Client as GoogleMaps
gmaps = GoogleMaps('AIzaSyBtnmS2qOuXie7iXgZJoUhUgbBzNFcik-A')
geocode_result = gmaps.geocode("1822 East Mall, Vancouver, BC")

print(geocode_result[0]['geometry']['location'] ['lat'])
print(geocode_result[0]['geometry']['location']['lng'])