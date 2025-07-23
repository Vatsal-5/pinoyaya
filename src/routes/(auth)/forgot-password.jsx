import Logo from "@/assets/logo";
import Img from "@/components/common/Img";
import Input from "@/components/common/inputs/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { H3, H4, P } from "@/components/ui/Typography";
import { AUTH_SIDE_IMG } from "@/constants/images";
import { LoginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Route as LoginRoute } from "./login";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/(auth)/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const forgotPasswordForm = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(LoginSchema.pick({ email: true })),
  });

  const onSubmit = (e) => {
    console.log(e);
    navigate({ to: LoginRoute.fullPath });
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
            <H3 text="Forgot your password?" />
            <P text="Enter your email so that we can send you a new password." />
          </div>
        </div>
        <Form {...forgotPasswordForm}>
          <form noValidate onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}>
            <Input
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
            />
            <Button
              type="submit"
              className="w-full py-2.5 mt-10 mb-8 rounded-xl"
            >
              Submit
            </Button>
            <Link
              to={LoginRoute.fullPath}
              className="flex items-center gap-x-2 text-text-7 text-sm"
            >
              <ChevronLeft className="size-4" />
              Back to Login
            </Link>
          </form>
        </Form>
      </div>
      <div className="h-full hidden md:block md:w-1/2">
        <Img
          className="w-full h-full object-cover"
          src={AUTH_SIDE_IMG}
          alt="forgot password"
        />
      </div>
    </div>
  );
}
