import React, { useState, useEffect } from "react";
import "./Counter.css";
import { counterSlice } from "../store/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { authSlice } from "../store/authSlice";
import { LightMode, DarkMode } from "@mui/icons-material";
import { themeSlice } from "../store/themeSlice";
import { Box, Switch, useTheme, Typography, Card } from "@mui/material";


const Counter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);
  const authState = useSelector((state) => state.auth);
  const token = localStorage.getItem("auth_token");
  const [isLoading, setIsLoading] = useState(false);
  const themeState = useSelector((state) => state.theme);
  const theme = useTheme();

  const increase = () => {
    dispatch(counterSlice.actions.increase());
    console.log(counterState.counter);
  };

  const reset = () => {
    dispatch(counterSlice.actions.reset());
  };

  const saveCount = () => {
    const datum = new Date();
    const year = datum.getFullYear();
    const month = datum.getMonth() + 1;
    const day = datum.getDate();
    // console.log(year, month, day);

    const savedAt = `${day}/${month}/${year}`;
    const savedData = {
      count: counterState.counter,
      savedAt: savedAt,
      fullName: authState.fullName,
      id: authState.id,
    };

    dispatch(counterSlice.actions.saveValues(savedData));
    console.log(counterState.savedValues);
    console.log("auth state", authState);
  };

  return (
    <>
      <div
        className="main"
        
      >
        <div
          className="login"
        
        >
          <div
            className="navbar-logo"
          >
            Counter
          </div>
          <button
            className="login-button"
            onClick={() => {
              setIsLoading(true);
              navigate("/login");
            }}
          >
            Login
          </button>
          {authState.id ? (
            <button
              onClick={() => {
                dispatch(authSlice.actions.logout());
                console.log(authState);
              }}
            >
              Logout
            </button>
          ) : (
            //   <div>
            //      <LightMode color="primary" />
            //   <Switch
            //     onChange={dispatch(themeSlice.actions.setTheme())}
            //     checked={theme === "dark"}
            //     />
            //     <DarkMode color="primary" />
            // </div>
              <div></div>
          )}
        </div>

        <div
          className="card"
        >
          <div
            className="counter"
          >
            <div>
              <h1   >
                {counterState.counter}
              </h1>
              <h1>{counterState.savedValues.count}</h1>
            </div>
            <div>
              <button className="increase" onClick={increase}></button>
              <button
                className="reset"
                disabled={counterState.counter === 0}
                onClick={reset}
              ></button>
              <button
                className="save-count"
                onClick={saveCount}
                disabled={!authState.id || counterState.counter === 0}
              >
                {" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="user-data-div">
        {counterState.savedValues.map((item, index) => (
          <Card variant="outlined" sx={{ mt: 3, width: 700, p: 3 }}>
            {" "}
            <Typography variant="h4">Username: {item.fullName}</Typography>
            <Typography variant="h5" mt={1}>
              Count: {item.count}
            </Typography>
            <Typography variant="h6" mt={1}>
              SavedAt: {item.savedAt}
            </Typography>
            <Typography variant="p" mt={4}>
              User ID: {item.id}
            </Typography>
          </Card>
          // <div className="sacuvani-countovi" key={index}>
          // </div>
        ))}
      </div>
    </>
  );
};

export default Counter;
