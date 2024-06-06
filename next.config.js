module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/alganews-files/posts/*.jpeg',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '**',
      },
    ],
  }
}
