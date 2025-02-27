import Customer from "@/models/Customer.ts";
import Service from "@/models/Service.ts";

export default interface Appointment {
    id: string;
    customer: Customer;
    service: Service;
    date: string;
    time: string;
    status: string;
};