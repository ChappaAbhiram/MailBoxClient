import { createSlice } from "@reduxjs/toolkit";

const initialInboxState = {
    mails: []
}

const inboxSlice = createSlice({
    name : 'inbox',
    initialState : initialInboxState,
    reducers:{
updateInbox(state,action){
    state.mails = action.payload
}
    }
})

export const inboxAction=inboxSlice.actions;
export default inboxSlice.reducer;