
import {useEffect, useState} from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Service from "@/models/Service.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store.tsx";
import {deleteService, getAllServices, saveService, updateService} from "@/redux/ServiceSlice.ts";



export default function Services() {
  const services = useSelector((state:RootState)=>state.service);
  const dispatch = useDispatch<AppDispatch>();
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      id: editingService?.id || "",
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
      description: formData.get("description") as string,
    };

    if (editingService) {
      // setServices(services.map(s => s.id === editingService.id ? serviceData : s));
      await dispatch(updateService(serviceData))
          .unwrap()
          .then(() => {
            dispatch(getAllServices())
            toast.success("Service updated successfully");
          })
          .catch(() => {
            toast.error("Failed to update service");
          });
    } else {
      //setServices([...services, serviceData]);
      dispatch(saveService(serviceData));
      toast.success("Service added successfully");
    }
    setEditingService(null);
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteService(id))
        .unwrap()
        .then(() => {
          dispatch(getAllServices())
          toast.success("Service deleted successfully");
        })
        .catch(() => {
          toast.error("Failed to delete service");
        });
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
  };

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  return (
    <div className="space-y-8 animate-slideIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground">Manage your salon services here.</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2" />
              Add Service
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{editingService ? "Edit" : "Add"} Service</SheetTitle>
              <SheetDescription>
                {editingService ? "Update the" : "Add a new"} service to your salon.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingService?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={editingService?.price}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="0"
                  defaultValue={editingService?.duration}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingService?.description}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingService ? "Update" : "Add"} Service
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No services added yet. Click the "Add Service" button to add your first service.
            </p>
          ) : (
            <div className="grid gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${service.price} • {service.duration} minutes
                    </p>
                    {service.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(service)}
                        >
                          Edit
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Edit Service</SheetTitle>
                          <SheetDescription>
                            Update the service details.
                          </SheetDescription>
                        </SheetHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Service Name</Label>
                            <Input
                              id="name"
                              name="name"
                              defaultValue={editingService?.name}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              min="0"
                              step="0.01"
                              defaultValue={editingService?.price}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Input
                              id="duration"
                              name="duration"
                              type="number"
                              min="0"
                              defaultValue={editingService?.duration}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              name="description"
                              defaultValue={editingService?.description}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Update Service
                          </Button>
                        </form>
                      </SheetContent>
                    </Sheet>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
