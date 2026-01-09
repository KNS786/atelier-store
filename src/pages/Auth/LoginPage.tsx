import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../../services/api/auth/auth";
import PasswordInput from "./PasswordInput";
// import type { IsignupLoginPayload } from "../../utils/security/encryption.interface";
import { toast } from "sonner";
import { loginUser } from "../../services/api";

interface FormState {
  email: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      email: form.email?.trim(),
      password: form.password?.trim()
    };

    const res = await loginUser(payload);

    console.log("Login response:", res.data);

    sessionStorage.setItem("accessToken", res.accessToken);
    sessionStorage.setItem("email", form.email);
    sessionStorage.setItem("user_id", res.userId);
    toast.success(res.message || "Login successful");
    
    navigate("/")

  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || error.detail || "Login failed");
  } finally {
    setLoading(false);
  }
};



  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 shadow-md rounded-2xl">
          <h2 className="text-3xl font-semibold text-center mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              onChange={handleChange("email")}
              required
            />
            <PasswordInput
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange("password")}
            />
            <div className="flex justify-end mt-4 text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}