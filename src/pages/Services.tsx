import { useEffect, useState } from "react";
import { Plus, Pencil } from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store.tsx";
import { deleteService, getAllServices, saveService, updateService } from "@/redux/ServiceSlice.ts";

export default function Services() {
  const services = useSelector((state: RootState) => state.service);
  const dispatch = useDispatch<AppDispatch>();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      id: editingService?.id || "",
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
      description: formData.get("description") as string,
      image: imageFile ? URL.createObjectURL(imageFile) : editingService?.image || "",
    };

    try {
      if (editingService) {
        await dispatch(updateService(serviceData)).unwrap();
        toast.success("Service updated successfully");
      } else {
        await dispatch(saveService(serviceData)).unwrap();
        toast.success("Service added successfully");
      }
      dispatch(getAllServices());
    } catch {
      toast.error(`Failed to ${editingService ? "update" : "add"} service`);
    }

    setEditingService(null);
    setImageFile(null);
    setIsSheetOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteService(id)).unwrap();
      dispatch(getAllServices());
      toast.success("Service deleted successfully");
    } catch {
      toast.error("Failed to delete service");
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsSheetOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
      <div className="space-y-8 animate-slideIn">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button onClick={() => setEditingService(null)}>
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
                <Label htmlFor="image">Service Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                <Label htmlFor="name">Service Name</Label>
                <Input id="name" name="name" defaultValue={editingService?.name} required />
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" name="price" type="number" min="0" step="0.01" defaultValue={editingService?.price} required />
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" name="duration" type="number" min="0" defaultValue={editingService?.duration} required />
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" defaultValue={editingService?.description} />
                <Button type="submit" className="w-full">{editingService ? "Update" : "Add"} Service</Button>
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
                  No services added yet.
                </p>
            ) : (
                <div className="grid gap-4">
                  {services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          {service.image && <img src={service.image} alt={service.name} className="w-20 h-20 object-cover rounded-lg" />}
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">${service.price} • {service.duration} minutes</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                            <Pencil className="w-4 h-4 mr-1" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>Delete</Button>
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
