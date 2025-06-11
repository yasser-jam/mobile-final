"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
interface LoginFormValues {
  phone: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    defaultValues: { phone: "", password: "" },
  });

  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: LoginFormValues) => {
    // handle login logic here
    try {
      setLoading(true)
      const response = await api('/auth/login', {
        method: 'POST',
        body: {
          mobile_phone_number: values.phone,
          password: values.password
        }
      })

      Cookies.set('teacher-access-token', response?.access_token)

      if (router) router.replace('/')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="phone"
              rules={{ required: "Mobile phone is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Mobile Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2 bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
} 