const { default: mongoose } = require("mongoose");
const Message = require("../models/message");
const User = require("../models/User");

const addMessage = async (req, res) => {
  const { contenu, userresorve } = req.body;
  if (!contenu || !userresorve)
    return res.status(401).json({ message: "fields are empty" });
  const userSender = req.user;
  const Founduserresorve = await User.findOne({ email: userresorve });
  const foundUserSender = await User.findOne({ _id: userSender });
  await Message.create({
    contenu,
    userSender: foundUserSender.toObject(),
    userresorve: Founduserresorve.toObject(),
    resorve: 0,
    sender: 1,
  });
  return res.status(200).json({ message: "message create" });
};

const user_send_message = async (req, res) => {
  const userid = new mongoose.Types.ObjectId(req.user);
  const user_s = await User.findOne({ _id: userid });

  const users = await Message.find({
    $or: [{ "userSender._id": userid }, { "userresorve._id": userid }],
  }).select({ "userresorve.email": 1, "userSender.email": 1, _id: 1 });

  const resulta = users.map((user) => ({
    email_sender: user.userSender.email,
    email_reserve: user.userresorve.email,
    id: user._id,
  }));
  const list = new Set();
  list.add(user_s.email);
  let r = [];
  for (const user of resulta) {
    if (!list.has(user.email_sender)) {
      r.push(user.email_sender);
      list.add(user.email_sender);
    }
    if (!list.has(user.email_reserve)) {
      r.push(user.email_reserve);
      list.add(user.email_reserve);
    }
  }
  //   let finalResult = [];
  //   for (const user of r) {
  // //     [
  // //   {
  // //     "email_sender": "Melike@gmail.com",
  // //     "email_reserve": "sidi@gmail.com",
  // //     "id": "688a763d897f3dfe7f63c44d"
  // //   },
  // //   {
  // //     "email_sender": "sidi@gmail.com",
  // //     "email_reserve": "ali@gmail.com",
  // //     "id": "688a7d5351706cc49dcb1791"
  // //   }
  // // ]
  //     if (user.email_sender!==user_s) {
  //       finalResult.push(user.email_sender);
  //     }
  //     if( user.email_reserve!==user_s) {
  //       finalResult.push(user.email_reserve);
  //     }
  //   }

  return res.status(200).json(r);
};

const filter_message = async (req, res) => {
  try {
    const userresorve = req.params.email;
    const foundUser = await User.findOne({ email: userresorve });
    const currentUserId = new mongoose.Types.ObjectId(req.user);

    const messages = await Message.find({
      $or: [
        { "userresorve._id": foundUser._id, "userSender._id": currentUserId },
        { "userresorve._id": currentUserId, "userSender._id": foundUser._id },
      ],
    });
    const fikter_messages = messages.map((message) => ({
      contenu: message.contenu,
      userSender: message.userSender.email,
      userresorve: message.userresorve.email,
      sender: message.sender,
      resorve: message.resorve,
      userresorve_id: message.userresorve._id,
    }));

    return res.status(200).json(fikter_messages);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = { addMessage, user_send_message, filter_message };
