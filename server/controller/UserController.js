const User = require("../model/User");
const { fetchUser, createUser } = require("../Services/UserService");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("../ControllerPolicy/UserControllerPolicy");

module.exports = {
  async register(req, res) {
    try {
      const { email, password, firstName, lastName, userName } = req.body;

      const existingUser = await fetchUser({ email: email });
      if (existingUser) {
        return res.status(409).send({
          error: `User with email ${email} already exists.`,
        });
      }

      const newUser = await createUser({
        email,
        password,
        firstName,
        lastName,
        userName,
      });

      return res.send(newUser);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: `An error occurred while saving the user ${email}` });
    }
  },

  async getUser(req, res) {
    try {
      const { userId } = req.params;

      if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Korisnik nije pronađen." });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Greška prilikom dohvaćanja korisnika." });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await fetchUser({ email: email });

      if (!user) {
        return res.status(404).send({
          error: "User does not exist",
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "The login information is incorrect",
        });
      }

      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      res.send({
        token: token,
      });
    } catch (err) {
      res.status(500).send({
        error: "Invalid login information",
      });
    }
  },

  async getLoggedInUserID(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      // Verify the JWT token
      const decoded = jwt.verify(token, "your-secret-key");
      const userId = decoded.userId;

      res.status(200).json({ userId });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to fetch logged-in user ID" });
    }
  },
};
