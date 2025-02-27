import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Customer from "@/models/Customer.ts";

const initialState: Customer[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/customer",
});

// Save Customer
export const saveCustomer = createAsyncThunk(
    "customer/saveCustomer",
    async (customer: Customer) => {
        try {
            const response = await api.post("/add", customer);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

// Get All Customers
export const getAllCustomers = createAsyncThunk(
    "customer/getAllCustomers",
    async () => {
        try {
            const response = await api.get("/get");
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

// Delete Customer
export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (customerId: string) => {
        try {
            const response = await api.delete(`/delete/${customerId}`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

// Get Customer by ID
export const getCustomer = createAsyncThunk(
    "customer/getCustomer",
    async (customerId: string) => {
        try {
            const response = await api.get(`/${customerId}`);
            return response.data as Customer;
        } catch (err) {
            console.error("Error fetching customer:", err);
            throw err;
        }
    }
);

// Update Customer
export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async (customer: Customer) => {
        try {
            const response = await api.put("/update", customer);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Save Customer
            .addCase(saveCustomer.pending, () => {
                console.log("Pending save customer");
            })
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCustomer.rejected, () => {
                console.log("Save customer rejected");
            })
            // Get All Customers
            .addCase(getAllCustomers.pending, () => {
                console.log("Pending get all customers");
            })
            .addCase(getAllCustomers.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getAllCustomers.rejected, () => {
                console.log("Get all customers rejected");
            })
            // Delete Customer
            .addCase(deleteCustomer.pending, () => {
                console.log("Pending delete customer");
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                return state.filter((customer) => customer.id !== action.payload.customerId);
            })
            .addCase(deleteCustomer.rejected, () => {
                console.log("Delete customer rejected");
            })
            // Update Customer
            .addCase(updateCustomer.pending, () => {
                console.log("Pending update customer");
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (customer) => customer.id === action.payload.customerId
                );
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateCustomer.rejected, () => {
                console.log("Update customer rejected");
            })
            // Get Customer
            .addCase(getCustomer.pending, () => {
                console.log("Pending get customer");
            })
            .addCase(getCustomer.fulfilled, (_, action) => {
                console.log("Customer data fetched successfully:", action.payload);
            })
            .addCase(getCustomer.rejected, () => {
                console.log("Fetching customer failed");
            });
    },
});

export default customerSlice.reducer;
