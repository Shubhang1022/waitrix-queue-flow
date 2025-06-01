
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Users, MapPin, LogOut } from "lucide-react";

interface UserDashboardProps {
  onLogout: () => void;
}

interface Vendor {
  id: string;
  name: string;
  category: string;
  waitTime: number;
  queueLength: number;
  rating: number;
  location: string;
  isOpen: boolean;
}

const UserDashboard = ({ onLogout }: UserDashboardProps) => {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Joe's Coffee Shop",
      category: "Food & Beverage",
      waitTime: 15,
      queueLength: 8,
      rating: 4.5,
      location: "Downtown",
      isOpen: true,
    },
    {
      id: "2",
      name: "Quick Cuts Salon",
      category: "Beauty & Wellness",
      waitTime: 25,
      queueLength: 5,
      rating: 4.8,
      location: "Mall Plaza",
      isOpen: true,
    },
    {
      id: "3",
      name: "City Bank Branch",
      category: "Banking",
      waitTime: 10,
      queueLength: 12,
      rating: 4.2,
      location: "Financial District",
      isOpen: true,
    },
  ]);

  const [currentQueue, setCurrentQueue] = useState<string | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  const joinQueue = (vendorId: string) => {
    setCurrentQueue(vendorId);
    setPosition(vendors.find(v => v.id === vendorId)?.queueLength || 0);
    // In real app, this would send request to Firebase
    console.log("Joined queue for vendor:", vendorId);
  };

  const leaveQueue = () => {
    setCurrentQueue(null);
    setPosition(null);
    console.log("Left queue");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Available Vendors</h1>
          <Button onClick={onLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {currentQueue && (
          <Card className="mb-6 bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">You're in Queue!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-green-700">
                    Position: <span className="font-bold text-2xl">{position}</span>
                  </p>
                  <p className="text-green-600">
                    Estimated wait: {(position || 0) * 3} minutes
                  </p>
                </div>
                <Button onClick={leaveQueue} variant="destructive">
                  Leave Queue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <p className="text-sm text-gray-600">{vendor.category}</p>
                  </div>
                  <Badge variant={vendor.isOpen ? "default" : "secondary"}>
                    {vendor.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{vendor.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{vendor.waitTime} min wait</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{vendor.queueLength} in queue</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{vendor.rating}/5</span>
                  </div>
                  
                  <Button 
                    onClick={() => joinQueue(vendor.id)}
                    disabled={!vendor.isOpen || currentQueue === vendor.id}
                    className="w-full mt-4"
                  >
                    {currentQueue === vendor.id ? "You're in this queue" : "Join Queue"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
