import { Route, Routes } from "react-router-dom";
import SignInForm from "./_auth/forms/SignInForm";
import { Toaster } from "./components/ui/toaster.tsx";
import SignUpForm from "./_auth/forms/SignUpForm";
import { Home } from "./_root/pages";
import Layout from "./_auth/Auth.layout";
import HomeLayout from "./_root/Home.layout.tsx";
const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<HomeLayout />}>
          <Route index path="/" element={<Home />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
