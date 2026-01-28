"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequest } from "@/lib/types/login";

const loginSchema = z.object({
    email: z.email("pjo oy trov format email ke moa bro"),
    password: z
        .string()
        .min(8, "password dak moa 8 k,tung lerng ban yor")
        .regex(/[A-Z]/, "password bro dak capital letter 1 moa")
        .regex(/[a-z]/, "dak small letter 1 phg bro")
        .regex(/[0-9]/, "dak number 1 moa")
        .regex(/[^a-zA-Z0-9]/, "symbol 1 mos ban hx bro yy men"),
});
export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({ resolver: zodResolver(loginSchema) });
    const onSubmit: SubmitHandler<LoginRequest> = (data) => console.log(data);

    return (
        <div>
            <Card className="w-4xl max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    placeholder="m@example.com"
                                />
                                <p className="text-red-500">
                                    {errors.email?.message}
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                />
                                <p className="text-red-500">
                                    {errors.password?.message}
                                </p>
                            </div>
                        </div>
                        <CardFooter className="flex-col gap-2 mt-5">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
