"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Registration failed");

      setSuccess(true);
      setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "user" });

      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Register</h2>
          <p className="text-gray-400">Create your account</p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            
            <div>
              <Label htmlFor="name" className="text-gray-300">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                className="bg-gray-700 text-white border-gray-600"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="bg-gray-700 text-white border-gray-600"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="bg-gray-700 text-white border-gray-600"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="********"
                className="bg-gray-700 text-white border-gray-600"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="admin"
                type="checkbox"
                className="w-5 h-5"
                checked={formData.role === "admin"}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, role: prev.role === "user" ? "admin" : "user" }))
                }
              />
              <Label htmlFor="admin" className="text-gray-300">Register as Admin</Label>
            </div>
          </CardContent>

          <CardFooter className="flex mt-3 justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <CheckCircle className="w-6 h-6" />
          <span>Registered Successfully!</span>
          <button onClick={() => setSuccess(false)} className="text-white hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
