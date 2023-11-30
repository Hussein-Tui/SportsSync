import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import axios from "axios";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      skillLevel,
    } = req.body;

    // addition of geolocate
    const resultList = await getLatLonFromPostcode(location)
    .catch((err) => {
        res.status(500).json({ error: err.message });
       });

       const newLocation = {
        postcode: location,
        type: 'Point',
        coordinates: resultList
      };

    // hashing & salting password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      // this will need to match the front end to make things transfer smoothly
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location: newLocation,
      skillLevel,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    // status code (201) that something has been created
    res.status(201).json(savedUser);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    // the JWT_SECRET will be in the .env file, this will be gitignored
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // deletes PW so it isnt passed to front end
    delete user.password;
    // token is given to users who successfulyl sign in and can be used to access various parts of the site
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// addition of geolocate
async function getLatLonFromPostcode(location) {
  try {
    const res = await axios
      .get(`https://api.postcodes.io/postcodes/${location}`)
      .then((response) => {
        const lat = response.data.result.latitude;
        const lon = response.data.result.longitude;
        return([lon, lat]);
      });
    return res;
  } catch (error) {
    console.error(error);
  }
}
