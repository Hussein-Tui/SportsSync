import User from "../models/User.js";

  export const getAllUser = async (req, res) => {
    try {
          
      let querySkillFilter = req.query.skillFilter || "all";
      
      const order = req.query.order || "asc"; // default setting
      
      const skillOptions = ["Beginner", "Intermediate", "Advanced"];

      querySkillFilter === "all"
      ? (querySkillFilter = [...skillOptions])
      : ( querySkillFilter.includes(",") ?
        querySkillFilter = querySkillFilter.split(",") :
        querySkillFilter = [].concat(querySkillFilter)
      );

      const allUsers = await User.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [
                -0.748345,
                52.036281] //dummy geo loc for now mk62ef fishermead
            }
          }
        }
      })
      .where("skillLevel")
      .in([...querySkillFilter])
      .sort(order || 'asc');
           

      const users = allUsers.map(
        ({ _id, firstName, lastName, picturePath, skillLevel }) => {
          return { _id, firstName, lastName, picturePath, skillLevel };
        }
      );
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json({ message: err.message });
      // debug
      console.log(err.message);
    }
  };




