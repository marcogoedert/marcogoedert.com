/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "covers.openlibrary.org" },  // book covers via ISBN
      { hostname: "m.media-amazon.com" },       // Amazon/IMDB images
      { hostname: "i.scdn.co" },                // Spotify album art
      { hostname: "image.tmdb.org" },           // TMDB movie/TV posters
    ],
  },
};

module.exports = nextConfig;
