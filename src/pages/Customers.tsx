
import {useEffect, useState} from "react";
import { useToast } from "@/components/use-toast.ts";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import Customer from "@/models/Customer.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store.tsx";
import {toast} from "sonner";
import {deleteCustomer, getAllCustomers, saveCustomer, updateCustomer} from "@/redux/customerSlice.ts";


export default function Customers() {
  const customers = useSelector((state:RootState)=>state.customer);
  const dispatch = useDispatch<AppDispatch>();
  // const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const [formData, setFormData] = useState({
    id:"",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      // Update existing customer
      // setCustomers(customers.map(customer =>
      //   customer.id === editingCustomer.id
      //     ? { ...formData, id: editingCustomer.id }
      //     : customer
      // ));
      await dispatch(updateCustomer(formData));
      dispatch(getAllCustomers())
      toast.success("Customer information has been updated successfully.");
    } else {
      await dispatch(saveCustomer(formData));
      dispatch(getAllCustomers())
      toast.success("New customer has been added successfully.");
    }

    setIsAddingCustomer(false);
    setEditingCustomer(null);
    setFormData({
      id:"",
      name: "",
      email: "",
      phone: "",
      notes: "",
    });
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setIsAddingCustomer(true);
  };

  const handleDelete = async (id: string) => {
    // setCustomers(customers.filter(customer => customer.id !== id));
    await dispatch(deleteCustomer(id));
    dispatch(getAllCustomers())
    toast.success("The customer has been deleted successfully.");
  };

  return (
    <div className="space-y-8 animate-slideIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">View and manage your customers.</p>
        </div>
        <Button onClick={() => setIsAddingCustomer(true)}>
          <Plus className="mr-2" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {customer.email} • {customer.phone}
                  </p>
                  {customer.notes && (
                    <p className="text-sm text-muted-foreground">
                      Notes: {customer.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(customer)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(customer.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Sheet
        open={isAddingCustomer}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingCustomer(false);
            setEditingCustomer(null);
            setFormData({
              id:"",
              name: "",
              email: "",
              phone: "",
              notes: "",
            });
          }
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {editingCustomer ? "Edit Customer" : "Add New Customer"}
            </SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="(555) 123-4567"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Add any relevant notes about the customer"
              />
            </div>
            <Button type="submit" className="w-full">
              {editingCustomer ? "Update Customer" : "Add Customer"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
