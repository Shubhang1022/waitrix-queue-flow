
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, TrendingUp, LogOut, Bell } from "lucide-react";

interface VendorDashboardProps {
  onLogout: () => void;
}

interface QueueCustomer {
  id: string;
  name: string;
  joinTime: string;
  waitTime: number;
  status: 'waiting' | 'serving' | 'completed';
}

const VendorDashboard = ({ onLogout }: VendorDashboardProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [queue, setQueue] = useState<QueueCustomer[]>([
    { id: "1", name: "John Doe", joinTime: "10:30 AM", waitTime: 15, status: "serving" },
    { id: "2", name: "Jane Smith", joinTime: "10:35 AM", waitTime: 12, status: "waiting" },
    { id: "3", name: "Mike Johnson", joinTime: "10:40 AM", waitTime: 8, status: "waiting" },
    { id: "4", name: "Sarah Wilson", joinTime: "10:45 AM", waitTime: 5, status: "waiting" },
  ]);

  const [avgServiceTime, setAvgServiceTime] = useState(8);
  const [dailyCustomers, setDailyCustomers] = useState(45);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(4.6);

  const markCustomerServed = (customerId: string) => {
    setQueue(prev => prev.filter(customer => customer.id !== customerId));
    setDailyCustomers(prev => prev + 1);
    console.log("Customer served:", customerId);
  };

  const notifyCustomer = (customerId: string) => {
    console.log("Notifying customer:", customerId);
    // In real app, this would send push notification
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Vendor Dashboard</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant={isOpen ? "destructive" : "default"}
            >
              {isOpen ? "Close Queue" : "Open Queue"}
            </Button>
            <Button onClick={onLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Queue Length</p>
                  <p className="text-2xl font-bold">{queue.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Avg Service Time</p>
                  <p className="text-2xl font-bold">{avgServiceTime}m</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Daily Customers</p>
                  <p className="text-2xl font-bold">{dailyCustomers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                  <p className="text-2xl font-bold">{customerSatisfaction}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Current Queue</CardTitle>
              <Badge variant={isOpen ? "default" : "secondary"}>
                {isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {queue.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No customers in queue</p>
            ) : (
              <div className="space-y-3">
                {queue.map((customer, index) => (
                  <Card key={customer.id} className={customer.status === 'serving' ? 'bg-blue-50 border-blue-200' : ''}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{customer.name}</p>
                            <p className="text-sm text-gray-600">Joined: {customer.joinTime}</p>
                            <p className="text-sm text-gray-600">Waiting: {customer.waitTime} min</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={customer.status === 'serving' ? 'default' : 'secondary'}>
                            {customer.status}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => notifyCustomer(customer.id)}
                          >
                            <Bell className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => markCustomerServed(customer.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Served
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;
