const mongoose = require("mongoose");
const redis = require("redis");
const User = require("../models/user.model");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on("connected", function () {
  console.log("MongoDB connected");
});

conn.on("disconnected", function () {
  console.log("MongoDB disconnected");
});

conn.on("error", function (error) {
  console.error(`MongoDB error: ${error}`);
});

process.on("SIGINT", async () => {
  await conn.close();
  process.exit(0);
});

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.on("connect", () => {
  console.log("Redis connected");
});

client.on("disconnect", (err) => {
  console.error("Redis disconnected");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client.on("SIGINT", async () => {
  await client.close();
  client.exit(0);
});

// lấy dữ liệu từ mongodb lưu lên redis cloud
async function cacheUserData(userId) {
  try {
    const user = await User.findById(userId);
    if (user) {
      client.set(userId, JSON.stringify(user), "EX", 900, (err, reply) => {
        if (err) {
          console.error("Error caching user data:", err);
        } else {
          console.log(`User ${userId} cached successfully`);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// lấy dữ liệu từ redis cloud
async function getUserFromCache(userId) {
  return new Promise((resolve, reject) => {
    client.get(userId, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(reply));
      }
    });
  });
}

async function main() {
  try {
    const userId = "66e4321a3e632453bd674c98";

    const cachedUser = await getUserFromCache(userId);
    if (cachedUser) {
      console.log("User from cache:", cachedUser);
    } else {
      await cacheUserData(userId);
      const updatedUser = await getUserFromCache(userId);
      console.log("Updated user from cache:", updatedUser);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
