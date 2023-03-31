const filePath = process.cwd() + "/utils/data.json";
const data = require("../utils/data.json");
const fs = require("fs");

module.exports.getRandomUser = (req, res, next) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomUser = data[randomIndex];
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
      res.status(200).send({
        success: true,
        message: "User created successfully",
      });
    });
  } else {
    res.status(204).send({
      success: false,
      message: "Please provide all details of user",
    });
  }
};

module.exports.updateAUser = (req, res, next) => {
  const id = req.params.id;
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
      res.status(200).send({
        success: true,
        message: "Updated data successfully",
      });
    });
  } else {
    res.status(404).send({
      success: false,
      message: "User not found",
    });
  }
};

module.exports.updateBulkUser = (req, res, next) => {
  const userIdsToUpdate = req.body.ids;
  const newDetails = req.body.details;
  if (newDetails) {
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
      res.status(200).send({
        success: true,
        message: "Updated Users Data Successfully",
      });
    });
  } else {
    res.status(404).send({
      success: false,
      message: "Users not available or data was not given",
    });
  }
};

module.exports.deleteAUser = (req, res, next) => {
  const id = req.params.id;
  const user = data.find((user) => user.id === Number(id));
  if (user) {
    const newData = data.filter((user) => user.id !== Number(id));
    fs.writeFile(filePath, JSON.stringify(newData), (err) => {
      if (err) {
        throw err;
      }
      res.status(200).send({
        success: true,
        message: "User has been deleted",
      });
    });
  } else {
    res.status(404).send({
      success: false,
      message: "User is not found",
    });
  }
};
