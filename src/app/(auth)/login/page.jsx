"use client";

import React from "react";
import { Card } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Check } from "@gravity-ui/icons";
import Link from "next/link";

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      redirect("/");
    }

    if (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF0DD] flex items-center justify-center px-6 py-10">
      <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-16 bg-[#99CBB8] text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back
            <br />
            <span className="text-cyan-400">Wanderlust</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-8">
            Continue exploring amazing destinations, manage your bookings,
            and plan your next unforgettable journey with Wanderlust.
          </p>

          <div className="space-y-5 mt-12">
            <div className="flex items-center gap-3">
              <Check className="text-cyan-400" />
              <span>Access your bookings</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-cyan-400" />
              <span>Explore new destinations</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-cyan-400" />
              <span>Fast & secure login</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center items-center p-8 md:p-12 bg-white">
          <Card className="shadow-none w-full max-w-md border-none">

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-2">
                Login to continue your adventure.
              </p>
            </div>

            <Form
              className="flex flex-col gap-5"
              render={(props) => <form {...props} />}
              onSubmit={onSubmit}
            >
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input
                  className="rounded-xl"
                  placeholder="john@example.com"
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }

                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain one uppercase letter";
                  }

                  if (!/[0-9]/.test(value)) {
                    return "Password must contain one number";
                  }

                  return null;
                }}
              >
                <Label>Password</Label>

                <Input
                  className="rounded-xl"
                  placeholder="********"
                />

                <Description>
                  Enter your account password.
                </Description>

                <FieldError />
              </TextField>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-cyan-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold mt-2"
              >
                Login
              </Button>
            </Form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>

              <span className="px-4 text-gray-500 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              variant="bordered"
              className="w-full h-12 rounded-xl border-gray-300 hover:bg-gray-100"
            >
              <FaGoogle className="text-red-500 text-lg" />
              Continue with Google
            </Button>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?
              <span className="text-cyan-600 font-semibold cursor-pointer ml-1 hover:underline">
              <Link href={'/signup'}>Create Account</Link>
                
              </span>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;