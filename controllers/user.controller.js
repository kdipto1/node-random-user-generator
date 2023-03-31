const filePath = process.cwd() + "/utils/data.json";
const data = require("../utils/data.json");
// import  data from "../utils/data.json";
// const JSONdb = require("simple-json-db");
// const dataS = new JSONdb(filePath);
const fs = require("fs");
// const data = dataS.storage;
//
// const StormDB = require("stormdb");
// const engine = new StormDB.localFileEngine(filePath);
// const db = new StormDB(engine);
// const data = db.state;
//

module.exports.getRandomUser = (req, res, next) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomUser = data[randomIndex];
  // console.log(data);
  res.json(randomUser);
};

module.exports.getAllUsers = (req, res, next) => {
  const limit = req.query.limit;
  if (limit) {
    const limitedUsers = data.slice(0, Number(limit));
    res.json(limitedUsers);
  } else {
    res.json(data);
  }
};

module.exports.saveAUser = (req, res, next) => {
  const newUser = req.body;
  console.log(newUser);
  const { gender, name, contact, address, photoUrl } = newUser;
  if (name && gender && address && contact && photoUrl) {
    const availableIds = data.map((user) => user.id);
    let newUserId;
    do {
      newUserId = Math.floor(Math.random() * data.length + 1);
    } while (availableIds.includes(newUserId));
    const newUserWithId = {
      id: newUserId,
      ...newUser,
    };
    const newData = [...data, newUserWithId];
    fs.writeFile(filePath, JSON.stringify(newData), (err) => {
      if (err) {
        throw err;
      }
      res.send("save a user");
    });
  }
};

module.exports.updateAUser = (req, res, next) => {
  const id = req.query.id;
  const properties = req.body;
  const user = data.find((user) => user.id === Number(id));
  if (user) {
    const updatedData = data.map((user) => {
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

module.exports.updateBulkUser = (req, res, next) => {
  const userIdsToUpdate = req.body.userIds;
  const newDetails = req.body.newDetails;
  console.log(newDetails);
  const updatedData = data.map((user) => {
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

module.exports.deleteAUser = (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const newData = data.filter((user) => user.id !== Number(id));
    fs.writeFile(filePath, JSON.stringify(newData), (err) => {
      if (err) {
        throw err;
      }
      res.send("delete a user");
    });
  }
};
