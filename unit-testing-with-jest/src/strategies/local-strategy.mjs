import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/helpers.mjs";
import { localPassportStrategy } from "../handlers/local-strategy.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(new Strategy(localPassportStrategy));
