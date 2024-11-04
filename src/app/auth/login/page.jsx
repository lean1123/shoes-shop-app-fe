import { Box, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

function page() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box>
      <Typography>Login page</Typography>
    </Box>
  );
}

export default page;
