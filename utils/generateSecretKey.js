const crypto = require('crypto');

const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');

const keys = [
  { KeyName: 'Key 1', Value: key1 },
  { KeyName: 'Key 2', Value: key2 }
];

console.table(keys);
