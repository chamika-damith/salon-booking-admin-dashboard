import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Appointment from "@/models/Appointment.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store.tsx";
import { deleteAppointment, getAllAppointments, saveAppointment, updateAppointment } from "@/redux/appointmentSlice.ts";
import { toast } from "sonner";
import { getAllCustomers, getCustomer } from "@/redux/customerSlice.ts";
import Customer from "@/models/Customer.ts";
import { getAllServices, getService } from "@/redux/ServiceSlice.ts";
import Service from "@/models/Service.ts";

export default function Appointments() {
    const appointments = useSelector((state: RootState) => state.appointment);
    const customers = useSelector((state: RootState) => state.customer);
    const services = useSelector((state: RootState) => state.service);
    const dispatch = useDispatch<AppDispatch>();
    const [isAddingAppointment, setIsAddingAppointment] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        dispatch(getAllAppointments());
        dispatch(getAllCustomers());
        dispatch(getAllServices());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        id: "",
        customerId: "",
        serviceId: "",
        date: "",
        time: "",
        status: "scheduled",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingAppointment) {
                // Update existing appointment
                const newCustomer = await dispatch(getCustomer(formData.customerId)).unwrap();
                const newService = await dispatch(getService(formData.serviceId)).unwrap();

                const newAppointment: Appointment = {
                    id: formData.id,
                    customer: newCustomer,
                    service: newService,
                    date: formData.date,
                    time: formData.time,
                    status: formData.status,
                };

                await dispatch(updateAppointment(newAppointment))
                    .unwrap()
                    .then(() => {
                        dispatch(getAllAppointments());
                        toast.success("The appointment has been updated successfully.");
                    });
            } else {
                const newCustomer = await dispatch(getCustomer(formData.customerId)).unwrap();
                const newService = await dispatch(getService(formData.serviceId)).unwrap();

                const newAppointment: Appointment = {
                    id: formData.id,
                    customer: newCustomer,
                    service: newService,
                    date: formData.date,
                    time: formData.time,
                    status: formData.status,
                };
                await dispatch(saveAppointment(newAppointment));
                dispatch(getAllAppointments());
                toast.success("New appointment has been added successfully.");
            }

            setIsAddingAppointment(false);
            setEditingAppointment(null);
            resetForm();
        } catch (error) {
            toast.error("Failed to save appointment");
        }
    };

    const resetForm = () => {
        setFormData({
            id: "",
            customerId: "",
            serviceId: "",
            date: "",
            time: "",
            status: "scheduled",
        });
    };

    const handleEdit = (appointment: Appointment) => {
        setEditingAppointment(appointment);
        setFormData({
            id: appointment.id,
            customerId: appointment.customer.id,
            serviceId: appointment.service.id,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
        });
        setIsAddingAppointment(true);
    };

    const handleDelete = async (id: string) => {
        await dispatch(deleteAppointment(id));
        dispatch(getAllAppointments());
        toast.success("The appointment has been deleted successfully.");
    };

    return (
        <div className="space-y-8 animate-slideIn">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
                    <p className="text-muted-foreground">Manage customer appointments</p>
                </div>
                <Button onClick={() => setIsAddingAppointment(true)}>
                    <Plus className="mr-2" />
                    Add Appointment
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {appointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="flex items-center justify-between p-4 border rounded-lg"
                            >
                                <div>
                                    <h3 className="font-semibold">{appointment.customer?.name || "Unknown Customer"}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {appointment.service?.name || "Unknown Service"} - {appointment.date} at {appointment.time}
                                    </p>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${
                                            appointment.status === "completed"
                                                ? "bg-green-100 text-green-800"
                                                : appointment.status === "cancelled"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-blue-100 text-blue-800"
                                        }`}
                                    >
                                        {appointment.status}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(appointment)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(appointment.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Sheet
                open={isAddingAppointment}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsAddingAppointment(false);
                        setEditingAppointment(null);
                        resetForm();
                    }
                }}
            >
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            {editingAppointment ? "Edit Appointment" : "Add New Appointment"}
                        </SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Customer
                            </label>
                            <select
                                value={formData.customerId}
                                onChange={(e) =>
                                    setFormData({ ...formData, customerId: e.target.value })
                                }
                                className="w-full p-2 border rounded-md"
                                required
                            >
                                <option value="" disabled>Select a customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Service</label>
                            <select
                                value={formData.serviceId}
                                onChange={(e) =>
                                    setFormData({ ...formData, serviceId: e.target.value })
                                }
                                className="w-full p-2 border rounded-md"
                                required
                            >
                                <option value="" disabled>Select a service</option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                }
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Time</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) =>
                                    setFormData({ ...formData, time: e.target.value })
                                }
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.value as "scheduled" | "completed" | "cancelled",
                                    })
                                }
                                className="w-full p-2 border rounded-md"
                                required
                            >
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full">
                            {editingAppointment ? "Update Appointment" : "Add Appointment"}
                        </Button>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}