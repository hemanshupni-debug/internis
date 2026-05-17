import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/forgot-password",
        { email }
      );

      toast.success(res.data.message);

      alert("New Password: " + res.data.newPassword);

    } catch (error: any) {

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[400px]"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-3 rounded mb-4 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Reset Password
        </button>

      </form>

    </div>
  );
};

export default ForgotPassword;