import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Appointment from "@/models/Appointment.ts";

const initialState: Appointment[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/appointment",
});

// Save Appointment
export const saveAppointment = createAsyncThunk(
    "appointment/saveAppointment",
    async (appointment: Appointment) => {
        try {
            console.log(appointment);
            const response = await api.post("/add", appointment);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

// Get All Appointments
export const getAllAppointments = createAsyncThunk(
    "appointment/getAllAppointments",
    async () => {
        try {
            const response = await api.get("/get");
            console.log(response.data);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

// Delete Appointment
export const deleteAppointment = createAsyncThunk(
    "appointment/deleteAppointment",
    async (appointmentId: string) => {
        try {
            const response = await api.delete(`/delete/${appointmentId}`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

// Get Appointment by ID
export const getAppointment = createAsyncThunk(
    "appointment/getAppointment",
    async (appointmentId: string) => {
        try {
            const response = await api.get(`/${appointmentId}`);
            return response.data as Appointment;
        } catch (err) {
            console.error("Error fetching appointment:", err);
            throw err;
        }
    }
);

// Update Appointment
export const updateAppointment = createAsyncThunk(
    "appointment/updateAppointment",
    async (appointment: Appointment) => {
        console.log("edit appointment - ", appointment)
        try {
            const response = await api.put("/update", appointment);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Save Appointment
            .addCase(saveAppointment.pending, () => {
                console.log("Pending save appointment");
            })
            .addCase(saveAppointment.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveAppointment.rejected, () => {
                console.log("Save appointment rejected");
            })
            // Get All Appointments
            .addCase(getAllAppointments.pending, () => {
                console.log("Pending get all appointments");
            })
            .addCase(getAllAppointments.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getAllAppointments.rejected, () => {
                console.log("Get all appointments rejected");
            })
            // Delete Appointment
            .addCase(deleteAppointment.pending, () => {
                console.log("Pending delete appointment");
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                return state.filter((appointment) => appointment.id !== action.payload.appointmentId);
            })
            .addCase(deleteAppointment.rejected, () => {
                console.log("Delete appointment rejected");
            })
            // Update Appointment
            .addCase(updateAppointment.pending, () => {
                console.log("Pending update appointment");
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (appointment) => appointment.id === action.payload.appointmentId
                );
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateAppointment.rejected, () => {
                console.log("Update appointment rejected");
            })
            // Get Appointment
            .addCase(getAppointment.pending, () => {
                console.log("Pending get appointment");
            })
            .addCase(getAppointment.fulfilled, (_, action) => {
                console.log("Appointment data fetched successfully:", action.payload);
            })
            .addCase(getAppointment.rejected, () => {
                console.log("Fetching appointment failed");
            });
    },
});

export default appointmentSlice.reducer;
