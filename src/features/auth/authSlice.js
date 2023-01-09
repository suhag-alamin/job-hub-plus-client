import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  email: "",
  role: "",
  isLoading: true,
  isError: false,
  isSuccess: false,
  error: "",
};

// signup
export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data?.user?.email;
  }
);

// login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data?.user?.email;
  }
);

// google login
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);
  return data.user.email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleIsSuccess: (state) => {
      state.isSuccess = !state.isSuccess;
    },
    toggleIsLoading: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.email = "";
      state.role = "";
    },
    setUser: (state, { payload }) => {
      state.email = payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.error = "";
        state.email = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error.message;
        state.email = "";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.error = "";
        state.email = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error.message;
        state.email = "";
      })
      .addCase(googleLogin.pending, (state) => {
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = "";
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.email = payload;
        state.role = "";
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.error = "";
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleIsSuccess, logout, setUser, toggleIsLoading } =
  authSlice.actions;

export default authSlice.reducer;
