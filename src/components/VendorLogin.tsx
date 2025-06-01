
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VendorLoginProps {
  onLogin: () => void;
}

const VendorLogin = ({ onLogin }: VendorLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Firebase auth would go here
    console.log("Vendor login:", { email, password, isSignUp });
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="vendor-email" className="text-white">Business Email</Label>
        <Input
          id="vendor-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
          placeholder="Enter business email"
          required
        />
      </div>
      <div>
        <Label htmlFor="vendor-password" className="text-white">Password</Label>
        <Input
          id="vendor-password"
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
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      >
        {isSignUp ? "Register Business" : "Vendor Login"}
      </Button>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full text-white hover:bg-white/10"
      >
        {isSignUp ? "Already registered? Login" : "Register your business"}
      </Button>
    </form>
  );
};

export default VendorLogin;
