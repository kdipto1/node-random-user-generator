const filePath = process.cwd() + "/utils/data.json";
// const data = require("../utils/data.json");
// import  data from "../utils/data.json";
const JSONdb = require("simple-json-db");
const dataS = new JSONdb(filePath);
const fs = require("fs");
const data = dataS.storage;
//

module.exports.getRandomUser = async (req, res, next) => {
  const randomIndex = await Math.floor(Math.random() * data.length);
  const randomUser = await data[randomIndex];
  // console.log(data);
  res.json(randomUser);
};

module.exports.getAllUsers = async (req, res, next) => {
  const limit = req.query.limit;
  if (limit) {
    const limitedUsers = await data.slice(0, Number(limit));
    res.json(limitedUsers);
  } else {
    res.json(data);
  }
};

module.exports.saveAUser = async (req, res, next) => {
  const newUser = req.body;
  const { gender, name, contact, address, photoUrl } = newUser;
  if (gender && name && contact && address && photoUrl) {
    const availableIds = await data.map((user) => user.id);
    let newUserId;
    do {
      newUserId = await Math.floor(Math.random() * data.length + 1);
    } while (availableIds.includes(newUserId));
    const newUserWithId = await {
      id: newUserId,
      ...newUser,
    };
    const newData = await [...data, newUserWithId];
    fs.writeFile(filePath, JSON.stringify(newData), (err) => {
      if (err) {
        throw err;
      }
    });
    res.send("save a user");
  }
};

module.exports.updateAUser = async (req, res, next) => {
  const id = req.query.id;
  const properties = req.body;
  const user = await data.find((user) => user.id === Number(id));
  if (user) {
    const updatedData = await data.map((user) => {
      if (user.id === Number(id)) {
        return {
          ...user,
          ...properties,
        };
      }
      return user;
    });
    fs.writeFile(filePath, JSON.stringify(updatedData), (err) => {
      if (err) {
        throw err;
      }
      res.send("update a user");
    });
  }
};

module.exports.updateBulkUser = async (req, res, next) => {
  const userIdsToUpdate = req.body.userIds;
  const newDetails = req.body.newDetails;
  console.log(newDetails);
  const updatedData = await data.map((user) => {
    if (userIdsToUpdate.includes(user.id)) {
      return { ...user, ...newDetails };
    }
    return user;
  });
  fs.writeFile(filePath, JSON.stringify(updatedData), (err) => {
    if (err) {
      throw err;
    }
    res.send("update a user");
  });
};

module.exports.deleteAUser = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const newData = await data.filter((user) => user.id !== Number(id));
    fs.writeFile(filePath, JSON.stringify(newData), (err) => {
      if (err) {
        throw err;
      }
      res.send("delete a user");
    });
  }
};
