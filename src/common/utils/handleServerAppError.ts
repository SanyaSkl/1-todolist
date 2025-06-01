import { setAppError, setAppStatus } from "app/appSlice"
import { AppDispatch } from "app/store"
import { BaseResponse } from "common/types"


export const handleServerAppError = <T>(dispatch: AppDispatch, data: BaseResponse<T>) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: "Some error occurred" }))
  }
  dispatch(setAppStatus({ status: "failed" }))
}

