"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  ShoppingBag,
  UserPlus,
  Download,
  ArrowUpDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const customers = [
  {
    id: "CUST-001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    orders: 12,
    spent: "$1,245.89",
    status: "Active",
    joinDate: "2022-05-12",
  },
  {
    id: "CUST-002",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, USA",
    orders: 8,
    spent: "$879.50",
    status: "Active",
    joinDate: "2022-06-23",
  },
  {
    id: "CUST-003",
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, USA",
    orders: 5,
    spent: "$432.75",
    status: "Active",
    joinDate: "2022-07-15",
  },
  {
    id: "CUST-004",
    name: "James Rodriguez",
    email: "james@example.com",
    phone: "+1 (555) 456-7890",
    location: "Miami, USA",
    orders: 3,
    spent: "$198.25",
    status: "Inactive",
    joinDate: "2022-08-03",
  },
  {
    id: "CUST-005",
    name: "Olivia Smith",
    email: "olivia@example.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, USA",
    orders: 15,
    spent: "$1,876.45",
    status: "Active",
    joinDate: "2022-04-18",
  },
  {
    id: "CUST-006",
    name: "Noah Williams",
    email: "noah@example.com",
    phone: "+1 (555) 678-9012",
    location: "Boston, USA",
    orders: 2,
    spent: "$145.99",
    status: "Inactive",
    joinDate: "2022-09-05",
  },
  {
    id: "CUST-007",
    name: "Sophia Brown",
    email: "sophia@example.com",
    phone: "+1 (555) 789-0123",
    location: "Los Angeles, USA",
    orders: 9,
    spent: "$967.30",
    status: "Active",
    joinDate: "2022-03-27",
  },
  {
    id: "CUST-008",
    name: "Liam Jones",
    email: "liam@example.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, USA",
    orders: 1,
    spent: "$89.99",
    status: "New",
    joinDate: "2023-01-15",
  },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      customer.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            You have a total of {customers.length} customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="new">New</option>
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Customer
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Orders
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Spent
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <tr
                      key={customer.id}
                      className="border-b last:border-0"
                      style={{
                        opacity: 1,
                        transform: "translateY(0)",
                        transition: `opacity 0.2s, transform 0.2s ${index * 0.05}s`,
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {customer.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {customer.location}
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {customer.spent}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            customer.status === "Active"
                              ? "default"
                              : customer.status === "New"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="mr-2 h-4 w-4" />
                              Send email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Phone className="mr-2 h-4 w-4" />
                              Call customer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              View orders
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              Edit customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredCustomers.length}</strong> of{" "}
              <strong>{customers.length}</strong> customers
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
