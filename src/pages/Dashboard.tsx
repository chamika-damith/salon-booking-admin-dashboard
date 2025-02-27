import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    ArrowUpRight,
    Calendar,
    DollarSign,
    MessageSquare,
    Scissors,
    TrendingDown,
    TrendingUp,
    Users
} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";

export default function Dashboard() {
    const stats = [
        {
            title: "Total Bookings",
            value: "120",
            icon: Calendar,
            trend: "+12%",
            trendUp: true,
            color: "bg-blue-50 text-blue-700",
            iconColor: "text-blue-600 bg-blue-100",
        },
        {
            title: "Total Revenue",
            value: "$5,240",
            icon: DollarSign,
            trend: "+8%",
            trendUp: true,
            color: "bg-green-50 text-green-700",
            iconColor: "text-green-600 bg-green-100",
        },
        {
            title: "Active Services",
            value: "15",
            icon: Scissors,
            trend: "+2",
            trendUp: true,
            color: "bg-purple-50 text-purple-700",
            iconColor: "text-purple-600 bg-purple-100",
        },
        {
            title: "Total Customers",
            value: "284",
            icon: Users,
            trend: "+24",
            trendUp: true,
            color: "bg-orange-50 text-orange-700",
            iconColor: "text-orange-600 bg-orange-100",
        },
    ];

    const appointments = [
        {
            name: "Sarah Johnson",
            service: "Haircut & Styling",
            time: "10:00 AM",
            stylist: "Michael K.",
            status: "confirmed"
        },
        {
            name: "David Chen",
            service: "Color Treatment",
            time: "11:30 AM",
            stylist: "Jessica T.",
            status: "pending"
        },
        {
            name: "Emma Williams",
            service: "Blowout",
            time: "2:15 PM",
            stylist: "Michael K.",
            status: "confirmed"
        }
    ];

    const popularServices = [
        {name: "Haircut & Styling", count: 48, trend: "+12%"},
        {name: "Color Treatment", count: 36, trend: "+8%"},
        {name: "Blowout", count: 24, trend: "+2%"},
    ];

    return (
        <div className="space-y-8 animate-slideIn">
            <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h2>
                        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
                    </div>
                    <div className="flex gap-3">
                        <Badge variant="outline"
                               className="px-3 py-1.5 border-indigo-200 text-indigo-600 bg-indigo-50 flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5"/>
                            <span>February 27, 2025</span>
                        </Badge>
                        <Badge variant="outline"
                               className="px-3 py-1.5 border-green-200 text-green-600 bg-green-50 flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5"/>
                            <span>5 New Messages</span>
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className={`overflow-hidden border-0 shadow-md ${stat.color}`}>
                        <div className="absolute top-0 right-0 w-20 h-15 rounded-full bg-white/10 -mt-10 -mr-10"></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-lg ${stat.iconColor}`}>
                                <stat.icon className="h-5 w-5"/>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <div className="flex items-center mt-2">
                                <div className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full ${
                                    stat.trendUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}>
                                    {stat.trendUp ? <TrendingUp className="h-3 w-3"/> :
                                        <TrendingDown className="h-3 w-3"/>}
                                    {stat.trend}
                                </div>
                                <p className="text-xs text-gray-500 ml-2">from last month</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="md:col-span-2 border-0 shadow-md">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold">Today's Appointments</CardTitle>
                            <Badge className="bg-blue-500 hover:bg-blue-600">{appointments.length} Total</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {appointments.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {appointments.map((appointment, index) => (
                                    <div key={index}
                                         className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium">
                                                {appointment.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{appointment.name}</p>
                                                <p className="text-sm text-gray-500">{appointment.service} • {appointment.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm text-gray-500">{appointment.stylist}</p>
                                            <Badge className={appointment.status === 'confirmed' ?
                                                "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" :
                                                "bg-amber-100 text-amber-800 hover:bg-amber-200"}>
                                                {appointment.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 p-4">No appointments scheduled for today.</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold">Popular Services</CardTitle>
                            <ArrowUpRight className="h-4 w-4 text-gray-400"/>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {popularServices.length > 0 ? (
                            <div className="space-y-4">
                                {popularServices.map((service, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                        ${index === 0 ? "bg-purple-100 text-purple-600" :
                                                index === 1 ? "bg-blue-100 text-blue-600" :
                                                    "bg-green-100 text-green-600"}`}>
                                                <span className="font-medium">{index + 1}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{service.name}</p>
                                                <p className="text-xs text-gray-500">{service.count} bookings</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline"
                                               className="text-green-600 border-green-200 bg-green-50">
                                            {service.trend}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No services data available.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
