import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SignInformSchema } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useSignIN,
} from "@/lib/react-query/queries-mutation";
import { useAuth } from "@/context/AuthContext";

const SignInForm = () => {
  const { checkAuthUser } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: signInUser,isPending:isLoading } = useSignIN();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignInformSchema>>({
    resolver: zodResolver(SignInformSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  }); 

  async function onSubmit(values: z.infer<typeof SignInformSchema>) {

    const { email, password } = values;
    const user = await signInUser({ email, password });
    if (!user) {
      return toast({ title: "Signing In" });
    }

    const IsLoggedIn = await checkAuthUser();

    if (IsLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Error Signing In" });
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="" />

        <h2 className="h3-bold md:h2-bold sm:pt-1">Login your account</h2>
        <p className="text-light-3 small-medium md:base-regular ">
          To use Snapgram enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full mt-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Email"
                    type="email"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-primary-600 font-thin" />
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
                  <Input
                    placeholder="Enter password"
                    type="password"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-primary-600 font-thin" />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
            {isLoading ? (
              <div className="flex-center gap-1">
                <Loader />
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="font-semibold">
            I don't have an Account{" "}
            <Link to="/sign-up">
              <span className="text-primary-500 font-light cursor-pointer">
                Sign Up
              </span>{" "}
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
