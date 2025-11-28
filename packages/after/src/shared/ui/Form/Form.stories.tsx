import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./Form";
import { Button } from "../Button";

const meta = {
  title: "UI/Form",
  component: Form,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  age: z.coerce.number().min(18, "Must be at least 18 years old"),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const BasicForm: Story = {
  render: () => {
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        age: undefined,
        bio: "",
      },
    });

    const onSubmit = (data: FormValues) => {
      console.log("Form submitted:", data);
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="w-full px-2 py-2 text-base border rounded-sm bg-white"
                    placeholder="Enter username"
                  />
                </FormControl>
                <FormDescription>
                  This will be your public display name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="email"
                    className="w-full px-2 py-2 text-base border rounded-sm bg-white"
                    placeholder="user@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="number"
                    className="w-full px-2 py-2 text-base border rounded-sm bg-white"
                    placeholder="18"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio (Optional)</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full px-2 py-2 text-base border rounded-sm bg-white"
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  Maximum 200 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </Form>
    );
  },
};

export const WithValidationErrors: Story = {
  render: () => {
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "ab", // Too short
        email: "invalid-email", // Invalid email
        age: 15, // Too young
      },
    });

    const onSubmit = (data: FormValues) => {
      console.log("Form submitted:", data);
    };

    // Trigger validation on mount
    form.trigger();

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="w-full px-2 py-2 text-base border rounded-sm bg-white"
                    placeholder="Enter username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="email"
                    className="w-full px-2 py-2 text-base border rounded-sm bg-white"
                    placeholder="user@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="number"
                    className="w-full px-2 py-2 text-base border rounded-sm bg-white"
                    placeholder="18"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </Form>
    );
  },
};

export const LoginForm: Story = {
  render: () => {
    const loginSchema = z.object({
      email: z.string().email("Please enter a valid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    });

    type LoginValues = z.infer<typeof loginSchema>;

    const form = useForm<LoginValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const onSubmit = (data: LoginValues) => {
      console.log("Login:", data);
      alert("Login submitted!");
    };

    return (
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      className="w-full px-2 py-2 text-base border rounded-sm bg-white"
                      placeholder="user@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="password"
                      className="w-full px-2 py-2 text-base border rounded-sm bg-white"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant="primary" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    );
  },
};
