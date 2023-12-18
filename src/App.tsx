import { NavBar } from "./components/NavBar/NavBar";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { NotFound } from "./components/NotFound/NotFound";
import { Auth } from "./pages/Auth/Auth";
import { Feed } from "./pages/Feed/Feed";
import { Footer } from "./components/Footer/Footer";
import { Toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthProvider } from "./context/auth-context";
import { AuthContextType } from "./context/types";
import { Search } from "./components/Search/Search";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { LinkList } from "./components/LinkList/LinkList";
function App() {
  const { pathname } = useLocation();
  const { setToken, token } = useAuthProvider() as AuthContextType;
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken!);
    }
  }, []);
  return (
    <>
      <Toaster />
      <NavBar />
      <Search />
      <Routes>
        {token && (
          <Route element={<Navigate to={"/"} replace />} path="/auth" />
        )}
        <Route element={<Navigate replace to={"/new/1"} />} path="/" />
        <Route element={<Feed />} path="/new/:page" />
        <Route element={<Feed />} path="/top" />
        <Route element={<Auth />} path="/auth" />
        <Route element={<Feed />} path="/" />
        <Route element={<NotFound />} path="*" />
        <Route element={<SearchPage />} path="/search/:key" />
      </Routes>
      {pathname.includes("auth") || <Footer />}
    </>
  );
}

export default App;
