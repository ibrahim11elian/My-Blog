import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userName: localStorage.getItem("user") || "",
  loading: false,
  accessToken: localStorage.getItem("token") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      if (payload.userName !== undefined) {
        state.userName = payload.userName;
      }
    },
    logoutUser: (state) => {
      state.userName = "";
      state.accessToken = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        // If login is successful, store the token in localStorage.
        if (payload.status === 200) {
          const { accessToken } = payload.data;
          state.accessToken = accessToken;
          state.error = "";
          localStorage.setItem("token", accessToken);
          localStorage.setItem("user", state.userName);
        }
      })
      .addCase(login.rejected, (state, { error }) => {
        error = JSON.parse(error.message);

        state.loading = false;
        state.error = error.data;
      })
      .addCase(updateUserDate.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserDate.fulfilled, (state, { payload }) => {
        state.loading = false;
        // If user updated successfully, store the token in localStorage.
        if (payload.status === 200) {
          const { accessToken, userName } = payload.data;
          state.accessToken = accessToken;
          state.userName = userName;
          localStorage.setItem("token", accessToken);
          localStorage.setItem("user", userName);
        }
      })
      .addCase(updateUserDate.rejected, (state, { error }) => {
        error = JSON.parse(error.message);

        state.loading = false;
        state.error = error.data;
      });
  },
});

// Redux action using createAsyncThunk
export const login = createAsyncThunk(
  "user/login",
  async ({ userName, password }) => {
    try {
      // Send login request to the server
      const response = await axios.post(`http://localhost:3000/api/login`, {
        user_name: userName,
        pass_hash: password,
      });

      return { status: response.status, data: response.data };
    } catch (error) {
      throw new Error(JSON.stringify(error.response));
    }
  }
);

export const updateUserDate = createAsyncThunk(
  "user/updateUserAsync",
  async ({ userData, accessToken }) => {
    const { userName, oldPassword, newPassword } = userData;
    const newData = {
      pass_hash: oldPassword,
    };
    if (userName) {
      newData.user_name = userName;
    }
    if (newPassword) {
      newData.newPassword = newPassword;
    }
    try {
      // Send login request to the server
      const response = await axios.put(
        `http://localhost:3000/api/user`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return { status: response.status, data: response.data };
    } catch (error) {
      throw new Error(JSON.stringify(error.response));
    }
  }
);

export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
