const { UsersModal } = require("../../db");

const {
  encryptPassword,
  generateToken,
  comparePassword,
  CustomError
} = require("restaurants-utils");

const signupController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await UsersModal.findOne({ email });

    if (user) {
      throw new CustomError(403, "User already exists");
    }

    const encryptedPassword = await encryptPassword(password);

    const record = new UsersModal({ ...req.body, password: encryptedPassword });
    user = await record.save();

    const { _id } = user;
    const accessToken = generateToken(_id, email, user.name);

    res.status(200).json({ id: _id, accessToken });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UsersModal.findOne({ email });

    if (!user) {
      throw new CustomError(403, "User does not exists");
    }

    const verifyUser = await comparePassword(password, user.password);

    if (!verifyUser) {
      throw new CustomError(403, "Invalid Credentials");
    }

    const { _id, name } = user;
    const accessToken = generateToken(_id, email, name);

    res.status(200).json({ id: _id, accessToken });
  } catch (error) {
    next(error);
  }
};

const profileController = async (req, res, next) => {
  try {
    const user = await UsersModal.findOne({ _id: req.body.userId }, { password: 0 });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  profileController,
  loginController,
  signupController
};
