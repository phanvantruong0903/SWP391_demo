const redis = require('redis');

const client = redis.createClient({
  host: 'redis-16011.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com',
  port: 16011,
  password: 'W0VAFcc1upFvgpP6th6f7xB1na9k8ovY'
});

client.on('connect', () => {
  console.log('Redis connected');
});

client.on('disconnect', (err) => {
  console.error('Redis disconnected');
});


client.on('error', (err) => {
  console.error('Redis error:', err);
});

function setKey(key, value, callback) {
  client.set(key, value, (err, reply) => {
    if (err) {
      console.error('Error setting key:', err);
      return callback(err, null);
    }
    callback(null, reply);
  });
}

function getKey(key, callback) {
  client.get(key, (err, reply) => {
    if (err) {
      console.error('Error getting key:', err);
      return callback(err, null);
    }
    callback(null, reply);
  });
}

module.exports = {
  getKey,
  setKey
};
