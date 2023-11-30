// import {
//   ManageAccountsOutlined,
//   EditOutlined,
//   LocationOnOutlined,
//   // WorkOutlineOutlined,
//   SportsTennis,
//   MilitaryTech,
//   // ThumbUp,
// } from "@mui/icons-material";
// import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const MatchMaking = ({ userId, picturePath, user }) => {
  // const [user, setUser] = useState(null);
  const { palette } = useTheme();
  // const navigate = useNavigate();
  // const token = useSelector((state) => state.token);
  // these themes are coming from the theme.js file created earlier
  const dark = palette.neutral.dark;
  // const medium = palette.neutral.medium;
  // const main = palette.neutral.main;

  useEffect(() => {
    // getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useful, incase no users are pulled from server
  if (!user) {
    return null;
  }

  // const { firstName, lastName, location, skillLevel, viewedProfile, friends } =
  //   user;

  return (
    <>
      <div>
        {user &&
          user.map((user) => (
            <WidgetWrapper key={user._id}>
              <FlexBetween gap="0.5rem" pb="1.1rem">
                <FlexBetween gap="1rem">
                  <UserImage image={user.picturePath} />
                  <Box>
                    <Typography variant="h4" color={dark} fontWeight="300">
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                      <span>:</span>

                      {/* {user.location.postcode} */}
                    </Typography>
                  </Box>
                  <Typography>{user.skillLevel}</Typography>
                  <Button
                    onClick={() => {}}
                    sx={{
                      color: palette.background.alt,
                      backgroundColor: palette.primary.main,
                      borderRadius: "2rem",
                    }}
                  >
                    Match
                  </Button>
                </FlexBetween>
              </FlexBetween>
              <Divider />
            </WidgetWrapper>
          ))}
      </div>
    </>
  );
};

export default MatchMaking;
