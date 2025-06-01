
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Store, TrendingUp, LogOut, Plus, Edit, Trash2 } from "lucide-react";

interface AdminPanelProps {
  onLogout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  type: 'customer' | 'vendor';
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Vendor {
  id: string;
  name: string;
  category: string;
  owner: string;
  status: 'approved' | 'pending' | 'rejected';
  queueLength: number;
}

const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'vendors'>('overview');
  
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@email.com", type: "customer", status: "active", joinDate: "2024-01-15" },
    { id: "2", name: "Jane Smith", email: "jane@email.com", type: "customer", status: "active", joinDate: "2024-01-20" },
    { id: "3", name: "Joe's Coffee", email: "joe@coffee.com", type: "vendor", status: "active", joinDate: "2024-01-10" },
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([
    { id: "1", name: "Joe's Coffee Shop", category: "Food & Beverage", owner: "Joe Martinez", status: "approved", queueLength: 8 },
    { id: "2", name: "Quick Cuts Salon", category: "Beauty & Wellness", owner: "Sarah Johnson", status: "approved", queueLength: 5 },
    { id: "3", name: "Tech Repair Hub", category: "Electronics", owner: "Mike Chen", status: "pending", queueLength: 0 },
  ]);

  const totalUsers = users.filter(u => u.type === 'customer').length;
  const totalVendors = vendors.length;
  const activeQueues = vendors.filter(v => v.queueLength > 0).length;
  const pendingApprovals = vendors.filter(v => v.status === 'pending').length;

  const approveVendor = (vendorId: string) => {
    setVendors(prev => prev.map(v => 
      v.id === vendorId ? { ...v, status: 'approved' as const } : v
    ));
  };

  const rejectVendor = (vendorId: string) => {
    setVendors(prev => prev.map(v => 
      v.id === vendorId ? { ...v, status: 'rejected' as const } : v
    ));
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { 
        ...u, 
        status: u.status === 'active' ? 'inactive' as const : 'active' as const 
      } : u
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <Button onClick={onLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'users' ? 'default' : 'outline'}
            onClick={() => setActiveTab('users')}
          >
            Users
          </Button>
          <Button
            variant={activeTab === 'vendors' ? 'default' : 'outline'}
            onClick={() => setActiveTab('vendors')}
          >
            Vendors
          </Button>
        </div>

        {activeTab === 'overview' && (
          <div>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold">{totalUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Total Vendors</p>
                      <p className="text-2xl font-bold">{totalVendors}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600">Active Queues</p>
                      <p className="text-2xl font-bold">{activeQueues}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-600">Pending Approvals</p>
                      <p className="text-2xl font-bold">{pendingApprovals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-600">Joined: {user.joinDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.type === 'vendor' ? 'default' : 'secondary'}>
                            {user.type}
                          </Badge>
                          <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                            {user.status}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'vendors' && (
          <Card>
            <CardHeader>
              <CardTitle>Vendor Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendors.map((vendor) => (
                  <Card key={vendor.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{vendor.name}</p>
                          <p className="text-sm text-gray-600">{vendor.category}</p>
                          <p className="text-sm text-gray-600">Owner: {vendor.owner}</p>
                          <p className="text-sm text-gray-600">Queue: {vendor.queueLength} customers</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={
                              vendor.status === 'approved' ? 'default' : 
                              vendor.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {vendor.status}
                          </Badge>
                          {vendor.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => approveVendor(vendor.id)}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => rejectVendor(vendor.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
