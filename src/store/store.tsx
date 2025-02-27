import { configureStore } from "@reduxjs/toolkit";
import ServiceSlice from "@/redux/ServiceSlice.ts";
import customerSlice from "@/redux/customerSlice.ts";
import appointmentSlice from "@/redux/appointmentSlice.ts";


export const store = configureStore({
    reducer: {
        service:ServiceSlice,
        customer:customerSlice,
        appointment:appointmentSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
