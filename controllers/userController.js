const User = require("../models/Users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({
        message: `No user with that id`,
      });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    res.json({ massage: "User successfully deleted!" });
  } catch (err) {
    res.status(404).json({
      message: `No user with this id ${req.params.userId} please try again!`,
    });
  }
};

const addUserFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeUserFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json({
      massage: "User successfully deleted!",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addUserFriend,
  removeUserFriend,
};
