import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ mail, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:6005/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    // Clear localStorage
    localStorage.removeItem('userMail');
    return null;
  }
);

// Initialize user from localStorage if available
const getInitialUser = () => {
  const userMail = localStorage.getItem('userMail');
  if (userMail) {
    // For admin, set the user object
    if (userMail === 'admin@admin.com') {
      return { name: 'Admin', mail: 'admin@admin.com', _id: 'admin' };
    }
    // For regular users, we'd need to fetch from server, but for now return null
    // In a real app, you'd want to validate the session
    return null;
  }
  return null;
};

const initialState = {
  user: getInitialUser(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // Store in localStorage for persistence
        localStorage.setItem('userMail', action.payload.mail);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('userMail');
      });
  },
});

export const { setUser, clearUser, setError } = authSlice.actions;
export default authSlice.reducer;
