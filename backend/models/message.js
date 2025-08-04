const mongoose = require("mongoose");
const messageSchema = mongoose.Schema(
  {
    contenu: {
      type: String,
    },
    userSender: {
      type: Object,

      required: true,
    },
    userresorve: {
      type: Object,

      required: true,
    },
    sender: {
      type: Boolean,
    },
    resorve: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
