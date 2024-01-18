import { createSlice } from "@reduxjs/toolkit";

const initialInboxState = {
    mails: [],
    unRead : 0
}

const inboxSlice = createSlice({
    name : 'inbox',
    initialState : initialInboxState,
    reducers:{
updateInbox(state,action){
    state.mails = action.payload
},
updateUnread(state,action){
    state.unRead=action.payload
}
    }
})

export const inboxAction=inboxSlice.actions;
export default inboxSlice.reducer;