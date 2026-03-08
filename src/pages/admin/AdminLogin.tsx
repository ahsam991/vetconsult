import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, PawPrint } from "lucide-react";

const ADMIN_PIN = "admin123";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("admin_auth", "true");
      navigate("/admin");
    } else {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-3 shadow-md">
              <PawPrint className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Vet & Pet Care</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Admin Portal</p>
          </div>

          {/* Login Box */}
          <div className="text-center mb-6">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Enter Admin Password</h2>
            <p className="text-xs text-muted-foreground mt-1">Only authorized staff can access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={pin}
                onChange={e => setPin(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className={`w-full h-11 px-4 pr-10 rounded-xl border text-sm bg-background focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? "border-destructive focus:ring-destructive/30 animate-shake"
                    : "border-input focus:ring-primary/30"
                }`}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-destructive text-center font-medium">
                ❌ Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Login to Admin Portal
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-5 p-3 bg-muted/50 rounded-xl border border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">🔑 Demo Credentials</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Password:</span>
              <code className="bg-background border border-border px-2 py-0.5 rounded font-mono font-bold text-foreground">admin123</code>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          <a href="/" className="hover:text-foreground transition-colors">← Back to Website</a>
        </p>
      </div>
    </div>
  );
}
