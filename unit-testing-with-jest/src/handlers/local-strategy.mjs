import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/helpers.mjs";

export const localPassportStrategy = async (username, password, done) => {
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) throw new Error("User not found");
    if (!comparePassword(password, findUser.password))
      throw new Error("Bad Credentials");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
};
