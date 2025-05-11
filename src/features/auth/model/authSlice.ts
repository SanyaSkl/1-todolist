import { LoginArgs } from "../api/authApi.types"
import { Dispatch } from "redux"
import { setAppStatusAC } from "app/app-reducer"
import { ResultCode } from "common/enums/enums"
import { handleAppErrors } from "common/handleAppErrors"
import { handleHttpErrors } from "common/handleHttpErrors"
import { createSlice } from "@reduxjs/toolkit"
import { authApi } from "../api/authApi.ts"


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    })
  })
})

export const { setIsLoggedIn, setIsInitialized } = authSlice.actions

export const authReducer = authSlice.reducer

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi.login(data).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setAppStatusAC("succeeded"))
      localStorage.setItem("sn-token", res.data.data.token)
    } else {
      handleAppErrors(dispatch, res.data)
    }
  })
    .catch((err) => {
      handleHttpErrors(err, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
      } else {
        handleAppErrors(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleHttpErrors(error, dispatch)
    })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else {
        handleAppErrors(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleHttpErrors(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
      dispatch(setAppStatusAC("succeeded"))
    })
}


// --------------------------------------------------------------

//import { LoginArgs } from "../api/authApi.types"
// import { Dispatch } from "redux"
// import { setAppStatusAC } from "app/app-reducer"
// import { authApi } from "../api/authApi.ts"
// import { ResultCode } from "common/enums/enums"
// import { handleAppErrors } from "common/handleAppErrors"
// import { handleHttpErrors } from "common/handleHttpErrors"
// import { createSlice, PayloadAction } from "@reduxjs/toolkit"
//
//
//
// type InitialStateType = typeof initialState
//
// const initialState = {
//   isLoggedIn: false,
//   isInitialized: false
// }
//
// export const authSlice = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case "SET_IS_LOGGED_IN":
//       return { ...state, isLoggedIn: action.payload.isLoggedIn }
//
//     case "SET_IS_INITIALIZED":
//       return { ...state, isInitialized: action.payload.isInitialized }
//
//     default:
//       return state
//   }
// }
// // Action creators
// const setIsLoggedInAC = (isLoggedIn: boolean) => {
//   return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
// }
// const setIsInitializedAC = (isInitialized: boolean) => {
//   return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const
// }
//
// // Actions types
// type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>
//
// // thunks
// export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC("loading"))
//   authApi.login(data).then((res) => {
//     if (res.data.resultCode === ResultCode.Success) {
//       dispatch(setIsLoggedInAC(true))
//       dispatch(setAppStatusAC("succeeded"))
//       localStorage.setItem("sn-token", res.data.data.token)
//     } else {
//       handleAppErrors(dispatch, res.data)
//     }
//   })
//     .catch((err) => {
//       handleHttpErrors(err, dispatch)
//     })
// }
//
// export const logoutTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC("loading"))
//   authApi
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatusAC("succeeded"))
//         dispatch(setIsLoggedInAC(false))
//         localStorage.removeItem("sn-token")
//       } else {
//         handleAppErrors(dispatch, res.data)
//       }
//     })
//     .catch((error) => {
//       handleHttpErrors(error, dispatch)
//     })
// }
//
// export const initializeAppTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC("loading"))
//   authApi
//     .me()
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatusAC("succeeded"))
//         dispatch(setIsLoggedInAC(true))
//       } else {
//         handleAppErrors(dispatch, res.data)
//       }
//     })
//     .catch((error) => {
//       handleHttpErrors(error, dispatch)
//     })
//     .finally(() => {
//       dispatch(setIsInitializedAC(true))
//       dispatch(setAppStatusAC("succeeded"))
//     })
// }


//=====================================================================================

//======================================================================================

// import { LoginArgs } from "../api/authApi.types"
// import { Dispatch } from "redux"
// import { setAppStatusAC } from "app/app-reducer"
// import { authApi } from "../api/authApi.ts"
// import { ResultCode } from "common/enums/enums"
// import { handleAppErrors } from "common/handleAppErrors"
// import { handleHttpErrors } from "common/handleHttpErrors"
// import { createSlice } from "@reduxjs/toolkit"
//
//
// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoggedIn: false,
//     isInitialized: false
//   },
//   reducers: (create) => ({
//     setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
//       state.isLoggedIn = action.payload.isLoggedIn
//     }),
//     setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
//       state.isInitialized = action.payload.isInitialized
//     })
//   })
// })
//
// export const { setIsLoggedIn, setIsInitialized } = authSlice.actions
//
// export const authReducer = authSlice.reducer
//
// // thunks
// export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC("loading"))
//   authApi.login(data).then((res) => {
//     if (res.data.resultCode === ResultCode.Success) {
//       dispatch(setIsLoggedIn({ isLoggedIn: true }))
//       dispatch(setAppStatusAC("succeeded"))
//       localStorage.setItem("sn-token", res.data.data.token)
//     } else {
//       handleAppErrors(dispatch, res.data)
//     }
//   })
//     .catch((err) => {
//       handleHttpErrors(err, dispatch)
//     })
// }
//
// export const logoutTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC("loading"))
//   authApi
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatusAC("succeeded"))
//         dispatch(setIsLoggedIn({ isLoggedIn: false }))
//         localStorage.removeItem("sn-token")
//       } else {
//         handleAppErrors(dispatch, res.data)
//       }
//     })
//     .catch((error) => {
//       handleHttpErrors(error, dispatch)
//     })
// }
//
// export const initializeAppTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC("loading"))
//   authApi
//     .me()
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatusAC("succeeded"))
//         dispatch(setIsLoggedIn({ isLoggedIn: true }))
//       } else {
//         handleAppErrors(dispatch, res.data)
//       }
//     })
//     .catch((error) => {
//       handleHttpErrors(error, dispatch)
//     })
//     .finally(() => {
//       dispatch(setIsInitialized({ isInitialized: true }))
//       dispatch(setAppStatusAC("succeeded"))
//     })
// }