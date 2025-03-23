"use client";

import { useState } from "react";
import {
  Calendar,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  FileText,
  Trash2,
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const orders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    date: "2023-03-15",
    amount: "$125.00",
    status: "Completed",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    email: "michael@example.com",
    date: "2023-03-14",
    amount: "$89.99",
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Emma Wilson",
    email: "emma@example.com",
    date: "2023-03-14",
    amount: "$245.50",
    status: "Completed",
    items: 4,
  },
  {
    id: "ORD-004",
    customer: "James Rodriguez",
    email: "james@example.com",
    date: "2023-03-13",
    amount: "$32.99",
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Olivia Smith",
    email: "olivia@example.com",
    date: "2023-03-12",
    amount: "$178.50",
    status: "Completed",
    items: 2,
  },
  {
    id: "ORD-006",
    customer: "Noah Williams",
    email: "noah@example.com",
    date: "2023-03-12",
    amount: "$65.99",
    status: "Cancelled",
    items: 1,
  },
  {
    id: "ORD-007",
    customer: "Sophia Brown",
    email: "sophia@example.com",
    date: "2023-03-11",
    amount: "$112.00",
    status: "Shipped",
    items: 2,
  },
  {
    id: "ORD-008",
    customer: "Liam Jones",
    email: "liam@example.com",
    date: "2023-03-10",
    amount: "$54.25",
    status: "Completed",
    items: 1,
  },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
          <p className="text-muted-foreground">View and manage all your orders</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Filter by date
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            You have a total of {orders.length} orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-0"
                      style={{
                        opacity: 1,
                        transform: "translateY(0)",
                        transition: `opacity 0.2s, transform 0.2s ${index * 0.05}s`,
                      }}
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-xs text-muted-foreground">
                            {order.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.date}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.items}
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : order.status === "Processing"
                                ? "secondary"
                                : order.status === "Shipped"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status}
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
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <FileText className="mr-2 h-4 w-4" />
                              Download invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel order
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
              Showing <strong>{filteredOrders.length}</strong> of{" "}
              <strong>{orders.length}</strong> orders
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
