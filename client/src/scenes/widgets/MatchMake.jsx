import {
  Divider,
  FormGroup,
  useTheme,
  Button,
  FormControlLabel,
  Checkbox,
  // useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";

import MatchMaking from "./MatchMaking";

const MatchMake = ({ picturePath }) => {
  const [user, setUser] = useState(null);
  // button click
  const [filters, setFilters] = useState([]);
  const handleCheckBox = (e) => {
    console.log(e);
    if (filters.includes(e.target.value)) {
      const filteredState = filters.filter((filteredItem) => {
        return filteredItem !== e.target.value;
      });
      setFilters(filteredState);
    } else {
      setFilters([...filters, e.target.value]);
    }
  };

  // colour scheme
  const { palette } = useTheme();
  // const { _id } = useSelector((state) => state.user);
  // user validation
  const token = useSelector((state) => state.token);
  //
  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;

  // matchmaking
  // we want to pass the checkbox data to db / routes to be used in controller
  const handleMatchMake = async (filtedCheckbox) => {
    // return array of arrays
    const queryParams = filtedCheckbox.map((skillItem) => [
      "skillFilter",
      skillItem,
    ]);
    const response = await fetch(
      // skillFilter is defined on backend in express - query parameter
      `http://localhost:3001/matchmake?${new URLSearchParams(queryParams)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  return (
    <>
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <FormGroup
            sx={{
              width: "110%",

              borderRadius: "2rem",
              padding: "0.1rem 2rem",
            }}
          >
            <FormControlLabel
              onChange={handleCheckBox}
              value={"Beginner"}
              control={<Checkbox />}
              label="Matchmake against Beginner"
            />
            <FormControlLabel
              onChange={handleCheckBox}
              value={"Intermediate"}
              control={<Checkbox />}
              label="Matchmake against Intermediate"
            />
            <FormControlLabel
              onChange={handleCheckBox}
              value={"Advanced"}
              control={<Checkbox />}
              label="Matchmake against Advanced"
            />
          </FormGroup>
        </FlexBetween>

        <Divider sx={{ margin: "1.25rem 0" }} />

        <FlexBetween>
          <Button
            // onClick={handleMatchMake}
            onClick={() => {
              if (filters.length === 0) {
                alert("Please select at least one box");
                return;
              }

              console.log(filters);
              handleMatchMake(filters);
            }}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            Begin Matchmaking
          </Button>
        </FlexBetween>
      </WidgetWrapper>

      <WidgetWrapper>
        <FlexBetween>
          <MatchMaking user={user} />
        </FlexBetween>
      </WidgetWrapper>
    </>
  );
};

export default MatchMake;
