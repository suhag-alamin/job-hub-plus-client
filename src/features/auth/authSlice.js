import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user: {
    email: "",
    role: "",
  },
  isLoading: true,
  isError: false,
  isSuccess: false,
  error: "",
};

let URL;

if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:5000";
} else {
  URL = "https://job-hub-plus.onrender.com";
}

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

// get user
export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`${URL}/user/${email}`);
  const data = await res.json();
  if (data.status) {
    return data;
  } else {
    return email;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleIsSuccess: (state) => {
      state.isSuccess = false;
    },
    toggleIsLoading: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = { email: "", role: "" };
    },
    setUser: (state, { payload }) => {
      state.user.email = payload;
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
        state.user.email = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error.message;
        state.user.email = "";
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
        state.user.email = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error.message;
        state.user.email = "";
      })
      .addCase(googleLogin.pending, (state) => {
        state.user.email = "";
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = "";
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.user.email = payload;
        state.role = "";
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.error = "";
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.user.email = "";
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.user.email = "";
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        if (payload.status) {
          state.user = payload.data;
        } else {
          state.user.email = payload;
        }
        state.role = "";
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = {};
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
