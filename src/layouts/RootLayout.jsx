import { Outlet, useLoaderData } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typewriter } from "react-simple-typewriter";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

const RootLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const lod = useLoaderData();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col ">
        <header className="w-11/12 mx-auto sticky top-0 z-50 ">
          <Header />
        </header>

        <div className="text-2xl text-center flex gap-4 items-start w-11/12 mx-auto my-5">
          <span>I am a </span>
          <span style={{ color: "green", fontWeight: "bold" }}>
            <Typewriter
              words={["Developer", "Designer", "Coder", "Freelancer"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </div>

        <main
          className="w-11/12 mx-auto "
          style={{
            minHeight: "calc(100vh - 165px)",
          }}
        >
          <Outlet />
        </main>
        <footer className="w-11/12 mx-auto">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default RootLayout;
