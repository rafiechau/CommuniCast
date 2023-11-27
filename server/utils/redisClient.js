const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
});

// Event listener untuk koneksi berhasil
redisClient.on('connect', () => {
    console.log('Successfully connected to Redis');
});
  
  // Event listener untuk error koneksi
redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});
  

module.exports = redisClient;