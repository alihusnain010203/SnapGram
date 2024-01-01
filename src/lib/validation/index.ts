 import * as z from "zod"

export const SignUpformSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    name:z.string().min(2 ,{message:"Name Too Short"}),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
  })

export const SignInformSchema=z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
})