
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserLoginProps {
  onLogin: () => void;
}

const UserLogin = ({ onLogin }: UserLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Firebase auth would go here
    console.log("User login:", { email, password, isSignUp });
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="user-email" className="text-white">Email</Label>
        <Input
          id="user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <Label htmlFor="user-password" className="text-white">Password</Label>
        <Input
          id="user-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
          placeholder="Enter your password"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
      >
        {isSignUp ? "Sign Up" : "Login"}
      </Button>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full text-white hover:bg-white/10"
      >
        {isSignUp ? "Already have an account? Login" : "Need an account? Sign up"}
      </Button>
    </form>
  );
};

export default UserLogin;
