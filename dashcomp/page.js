'use client'
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import AdminDashboardPage from "./adminDashboard";
import UserDashboardPage from "./userDashboard";

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div>
      <div className="flex justify-end mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {isAdmin ? "Admin View" : "Customer View"}
          </span>
          <Switch
            checked={isAdmin}
            onCheckedChange={setIsAdmin}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-indigo-600"
          />
        </div>
      </div>

      {isAdmin ? <AdminDashboardPage /> : <UserDashboardPage />}
    </div>
  );
}
