const Thought = require("../models/Thoughts");
const User = require("../models/Users");

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    res.json(thought);
  } catch (err) {
    res
      .status(404)
      .json({ message: "We are sorry we did not find that thought" });
  }
};

const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateThought = async (req, res) => {
  try {
    const updateThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.json(updateThought);
  } catch (err) {
    res
      .status(404)
      .json({ message: "No thought with this id please try again!" });
  }
};
const deleteThought = async (req, res) => {
  const thoughtid = req.params.thoughtId;
  try {
    await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    try {
      await Thought.findOneAndUpdate(
        { users: req.params.thoughtId },
        { $pull: { users: req.params.thoughtId } },
        { new: true }
      );
    } catch (err) {
      res.status(404).json("No thought found!");
    }
    res.json({ message: "Thought successfully deleted!" });
  } catch (err) {
    res.status(404).json({ message: "No thought found!" });
  }
};
const createReaction = async (req, res) => {
  try {
    const newReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    res.json(newReaction);
  } catch (err) {
    res.status(404).json({ message: "No thought found with this ID!" });
  }
};

const deleteReaction = async (req, res) => {
  try {
    const deletedReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    res.status(200).json({ message: "Deleted reaction" });
  } catch (err) {
    res.status(404).json({ message: "No thought found with this ID!" });
  }
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
