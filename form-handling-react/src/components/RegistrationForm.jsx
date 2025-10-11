import React, { useState } from "react";

// Mock API: simulates a POST /register endpoint with a delay
export const mockRegisterApi = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (String(data.email).toLowerCase().includes("fail")) {
                reject({ message: "Simulated registration failure" });
            } else {
                resolve({ id: Date.now(), ...data });
            }
        }, 900);
    });
};

function ControlledRegistrationForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const validate = () => {
        const e = {};
        if (!username.trim()) e.username = "Username is required";
        if (!email) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Email is invalid";
        if (!password) e.password = "Password is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };
    
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setStatus(null);
        if (!validate()) return;
        setLoading(true);
        try {
            const res = await mockRegisterApi({ username, email, password });
            setStatus({ type: "success", message: `Registered (id: ${res.id})` });
            setUsername("");
            setEmail("");
            setPassword("");
            setErrors({});
        } catch (err) {
            setStatus({ type: "error", message: err.message || "Registration failed" });
        } finally {
            setLoading(false);
        }
    };

return(
    <form onSubmit={handleSubmit} className="space-y-3">
        <div>
            <label className="block text-sm font-medium">Username</label>
            <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded border px-2 py-1"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : undefined}
            />
            {errors.username && (
            <div id="username-error" className="text-red-600 text-sm">{errors.username}</div>
            )}
        </div>
        <div>
            <label className="block text-sm font-medium">Email</label>
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded border px-2 py-1"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
            <div id="email-error" className="text-red-600 text-sm">{errors.email}</div>
            )}
        </div>
        <div>
            <label className="block text-sm font-medium">Password</label>
            <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded border px-2 py-1"
            type="password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
            <div id="password-error" className="text-red-600 text-sm">{errors.password}</div>
            )}
        </div>
        <div>
            <button
            type="submit"
            className="px-4 py-2 rounded border"
            disabled={loading}
            >
            {loading ? "Submitting..." : "Register"}
            </button>
        </div>
        {status && (
            <div className={`mt-2 text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>{status.message}</div>
        )}
    </form>
);
}

export default ControlledRegistrationForm;
    
    
        
       
            
           
                
        
