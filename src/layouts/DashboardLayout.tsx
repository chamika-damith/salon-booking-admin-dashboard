"use client"

import { useNavigate, useLocation, Outlet } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { BarChart3, Calendar, LogOut, Scissors, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      path: "/dashboard",
    },
    {
      title: "Services",
      icon: Scissors,
      path: "/services",
    },
    {
      title: "Customers",
      icon: Users,
      path: "/customers",
    },
    {
      title: "Appointments",
      icon: Calendar,
      path: "/appointments",
    },
  ]

  return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <Sidebar className="border-r border-slate-200 dark:border-slate-700">
            <SidebarHeader className="border-b border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Salon Admin" />
                  <AvatarFallback className="bg-primary text-primary-foreground">SA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Salon Admin</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">admin@salon.com</span>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent className="px-2 py-4">
              <SidebarGroup>
                <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Menu
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => {
                      const isActive = location.pathname === item.path
                      return (
                          <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton asChild>
                              <Button
                                  variant="ghost"
                                  className={cn(
                                      "w-full justify-start gap-4 px-3 py-2 transition-colors",
                                      isActive
                                          ? "bg-primary/10 text-primary font-medium"
                                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                                  )}
                                  onClick={() => navigate(item.path)}
                              >
                                <item.icon
                                    className={cn(
                                        "h-5 w-5",
                                        isActive ? "text-primary" : "text-slate-500 dark:text-slate-400",
                                    )}
                                />
                                <span>{item.title}</span>
                                {isActive && <div className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-full" />}
                              </Button>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mt-auto border-t border-slate-200 p-4 dark:border-slate-700">
              <Button
                  variant="ghost"
                  className="w-full justify-start gap-4 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={() => navigate("/login")}
              >
                <LogOut className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                <span>Logout</span>
              </Button>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 overflow-auto">
            <div className="sticky top-0 z-10 flex h-16 items-center border-b border-slate-200 bg-white/80 px-6 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {menuItems.find((item) => item.path === location.pathname)?.title || "Dashboard"}
              </h1>
            </div>
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
  )
}

