
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserLogin from "@/components/UserLogin";
import VendorLogin from "@/components/VendorLogin";
import UserDashboard from "@/components/UserDashboard";
import VendorDashboard from "@/components/VendorDashboard";
import AdminPanel from "@/components/AdminPanel";

export type UserType = 'user' | 'vendor' | 'admin' | null;

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userType: UserType) => {
    setCurrentUser(userType);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    if (currentUser === 'user') {
      return <UserDashboard onLogout={handleLogout} />;
    } else if (currentUser === 'vendor') {
      return <VendorDashboard onLogout={handleLogout} />;
    } else if (currentUser === 'admin') {
      return <AdminPanel onLogout={handleLogout} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
            WAITRIX
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Smart Queue Management System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white text-center">Customer Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <UserLogin onLogin={() => handleLogin('user')} />
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white text-center">Vendor Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <VendorLogin onLogin={() => handleLogin('vendor')} />
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white text-center">Admin Panel</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => handleLogin('admin')}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Admin Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
