import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authreducer'
import EmailReducer from './EmailReducer'

const store=configureStore({
    reducer:{auth:authReducer, mail:EmailReducer}
})

export default store