import Logo from "@/assets/logo";
import Img from "@/components/common/Img";
import { H3, H4, P } from "@/components/ui/Typography";
import { AUTH_SIDE_IMG } from "@/constants/images";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/schema";
import Input from "@/components/common/inputs/input";
import { Form } from "@/components/ui/form";
import Password from "@/components/common/inputs/password";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Route as ForgotPasswordRoute } from "./forgot-password";
import { Route as DashboardRoute } from "../_protected/dashboard";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate()

  const loginForm = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (e) => {
    console.log(e);
    navigate({ to: DashboardRoute.fullPath })
  };
  return (
    <div className="w-full h-dvh flex items-center justify-center overflow-hidden">
      <div className="w-full md:w-1/2 max-w-lg mx-auto px-5">
        <div className="space-y-20 mb-8">
          <div className="flex items-center gap-x-3">
            <Logo className="w-full max-w-[65px] aspect-square" />
            <div className="w-full flex flex-col">
              <H3 text="Pinoyaya" />
              <H4 text="Trusted care with ease." />
            </div>
          </div>
          <div className="space-y-2">
            <H3 text="Pinoyaya Admin Panel" />
            <P text="Internal Dashboard Access" />
          </div>
        </div>
        <Form {...loginForm}>
          <form noValidate onSubmit={loginForm.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <Input
                name="email"
                label="Email Address"
                placeholder="Enter your email address"
              />
              <Password
                name="password"
                label="Password"
                placeholder="Your password"
              />
            </div>
            <div className="mt-5 mb-10 flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <Checkbox
                  id="remember-me"
                  className="size-5"
                  iconClassName="size-4.5"
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm font-normal text-text-1"
                >
                  Remember Me
                </Label>
              </div>
              <Link
                to={ForgotPasswordRoute.fullPath}
                className="text-text-7 text-sm"
              >
                Forgot your password?
              </Link>
            </div>
            <Button type="submit" className="w-full py-2.5 rounded-xl">
              Log In
            </Button>
          </form>
        </Form>
      </div>
      <div className="h-full hidden md:block md:w-1/2">
        <Img
          className="w-full h-full object-cover rounded-l-[30px]"
          src={AUTH_SIDE_IMG}
          alt="login"
        />
      </div>
    </div>
  );
}
