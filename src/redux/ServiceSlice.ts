import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Service from "@/models/Service.ts";

const initialState: Service[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/service",
});

export const saveService = createAsyncThunk(
    "service/saveService",
    async (s: Service) => {
        try {
            const response = await api.post("/add", s);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

export const getAllServices = createAsyncThunk(
    "service/getAllServices",
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

export const deleteService = createAsyncThunk(
    "service/deleteService",
    async (serviceId: string) => {
        try {
            const response = await api.delete(`/delete/${serviceId}`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

export const getService = createAsyncThunk(
    "service/getService",
    async (serviceId: string) => {
        try {
            const response = await api.get(`/${serviceId}`);
            return response.data as Service;
        } catch (err) {
            console.error("Error fetching service:", err);
            throw err;
        }
    }
);

export const updateService = createAsyncThunk(
    "service/updateService",
    async (s: Service) => {
        try {
            const response = await api.put("/update", s);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

const ServiceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Save Service
            .addCase(saveService.pending, () => {
                console.log("Pending save service");
            })
            .addCase(saveService.fulfilled, (state, action) => {
                state.push(action.payload);
                console.log("success save service");
            })
            .addCase(saveService.rejected, () => {
                console.log("Save service rejected");
            })
            // Get All Services
            .addCase(getAllServices.pending, () => {
                console.log("Pending get all services");
            })
            .addCase(getAllServices.fulfilled, (_, action) => {
                console.log("success getAll service");
                return action.payload;
            })
            .addCase(getAllServices.rejected, () => {
                console.log("Get all services rejected");
            })
            // Delete Service
            .addCase(deleteService.pending, () => {
                console.log("Pending delete service");
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                console.log("success delete service");
                return state.filter((service) => service.id !== action.payload.serviceId);
            })
            .addCase(deleteService.rejected, () => {
                console.log("Delete service rejected");
            })
            // Update Service
            .addCase(updateService.pending, () => {
                console.log("Pending update service");
            })
            .addCase(updateService.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (service) => service.id === action.payload.serviceId
                );
                if (index !== -1) {
                    console.log("success update service");
                    state[index] = action.payload;
                }
            })
            .addCase(updateService.rejected, () => {
                console.log("Update service rejected");
            })
            // Get Service
            .addCase(getService.pending, () => {
                console.log("Pending get service");
            })
            .addCase(getService.fulfilled, (_, action) => {
                console.log("Service data fetched successfully:", action.payload);
            })
            .addCase(getService.rejected, () => {
                console.log("Fetching service failed");
            });
    },
});

export default ServiceSlice.reducer;
