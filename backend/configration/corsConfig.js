const allawedorigine = require("./allawedOrigine");
const corsOptions = {
  origin: (origin, callback) => {
    if (allawedorigine.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allwode"));
    }
  },
  Credentials: true,
};
module.exports = corsOptions;
