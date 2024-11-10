"use client";
import { useAppDispatch } from "@/lib/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { login } from "../../../../reducers/AuthSlice";

type FormValues = {
  email: string;
  password: string;
};

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const handleSubmit = async (data: FormValues) => {
    try {
      const action = login(data);
      const resultAction = await dispatch(action);
      if (resultAction.payload !== null) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Error during login request: ", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Login</Typography>
      <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
        <Box>
          <TextField
            label="Email"
            {...form.register("email")}
            error={Boolean(form.formState.errors.email)}
            helperText={form.formState.errors.email?.message}
          />
        </Box>

        <Box>
          <TextField
            label="Password"
            type="password"
            {...form.register("password")}
            error={Boolean(form.formState.errors.password)}
            helperText={form.formState.errors.password?.message}
          />
        </Box>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Page;
