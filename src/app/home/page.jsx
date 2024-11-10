"use client";
import AuthAPI from "@/api/AuthAPI";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../(auth)/AuthSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HomePage = () => {
  const dispatch = useDispatch();
  const rerouter = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AuthAPI.getUser();

        if (response.status !== 200) {
          console.error("Error fetching user data", response);
          return;
        }

        console.log("data: ", response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const action = logout();

      const result = await dispatch(action);

      console.log("Logged out", result.payload);

      console.log("Logged out");
    } catch (error) {
      console.error("Error logging out", error);
    }

    rerouter.push("/auth/login");
  };

  return (
    <Box>
      <Typography>Home HomePage</Typography>
      <Button onClick={handleLogout}>Logout</Button>
      <Link href={"/signup"}>Redirect to SignUpPage</Link>
    </Box>
  );
};

export default HomePage;
