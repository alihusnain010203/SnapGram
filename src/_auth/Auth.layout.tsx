import { Outlet, Navigate } from "react-router-dom";

const layout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <>
          <Navigate to="/" />
        </>
      ) : (
        <>
          <section className="flex justify-center flex-1 items-center flex-col p-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/side-img.svg"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
            alt=""
          />
        </>
      )}
    </>
  );
};

export default layout;
