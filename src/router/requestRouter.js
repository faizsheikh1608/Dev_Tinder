const express = require("express");
const userAuth = require("../middleware/userAuth");

const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      //status Validation
      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        throw new Error("invalid Status Type !");
      }

      //checking existing connection request
      const existingconnectionRequest = await connectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingconnectionRequest) {
        throw new Error("Already sent connection");
      }

      //checking that fromUserId is present in our DB
      const isToUserIsPresent = await User.findById(toUserId);
      if (!isToUserIsPresent) {
        throw new Error("Receiver is not present !");
      }

      const connectionRequests = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequests.save();

      res.json({
        message: "connection request completed",
        data,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    const isValidStatus = allowedStatus.includes(status);

    if (!isValidStatus) {
      throw new Error("Invalid Status Type!");
    }

    const connectionRequests = await connectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser,
      status: "interested",
    });

    if (!connectionRequest) {
      throw new Error("connection request not found!");
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({
      message: "connection request" + status,
      data,
    });
  }
);

module.exports = requestRouter;
