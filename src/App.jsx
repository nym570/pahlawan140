import { Route, Routes, useNavigate } from "react-router-dom";
import BackToTop from "./components/BackToTop";
import Beranda from "./pages/beranda";
import MyOffice from "./pages/myoffice";
import Berita from "./pages/berita";
import Profil from "./pages/profil";
import AyoMagang from "./pages/ayomagang";
import MasukAM from "./pages/masukam";
import DaftarAM from "./pages/daftaram";
import BerandaMasuk from "./pages/berandamasuk";
import BerhasilDaftar from "./pages/berhasildaftar";
import Formulir from "./pages/formmagang";
import Konfirmasi from "./pages/konfirmasimagang";
import BerhasilMagang from "./pages/berhasilmagang";
import RuangBaca from "./pages/ruangbaca";
import TemanLuki from "./pages/temanluki";
import Aduan from "./pages/aduan";
import SDI from "./pages/sdi";
import Login from "./pages/login";
import DashboardAdmin from "./pages/admin/dashboard";
import MenuAdmin from "./pages/admin/menu";
import BerandaAdmin from "./pages/admin/beranda";
import TemanLukiAdmin from "./pages/admin/temanluki";
import SDIAdmin from "./pages/admin/sdi";
import BeritaAdmin from "./pages/admin/berita";
import RuangBacaAdmin from "./pages/admin/ruangbaca";
import MyOfficeAdmin from "./pages/admin/myoffice";
import AyoMagangAdmin from "./pages/admin/ayomagang";
import { NextUIProvider } from "@nextui-org/react";
import PrivateRoute from "./components/PrivateRoute";
import MPrivateRoute from "./components/PrivateRoute/magang";
import MRoute from "./components/PrivateRoute/magangAll";
import RoleBasedRoute from "./components/RoleBasedRoute";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <div className="flex flex-col w-full">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route
            path="/myoffice"
            element={
              <PrivateRoute>
                <MyOffice />
              </PrivateRoute>
            }
          />
          <Route path="/profil" element={<Profil />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/ayomagang" element={<MRoute><AyoMagang /></MRoute>} />
          <Route path="/masukam" element={<MRoute><MasukAM /></MRoute>} />
          <Route path="/daftaram" element={<MRoute><DaftarAM /></MRoute>} />
          <Route path="/berandamasuk" element={ <MPrivateRoute><BerandaMasuk /></MPrivateRoute>} />
          <Route path="/berhasildaftar" element={<MRoute><BerhasilDaftar /></MRoute>} />
          <Route path="/formulir" element={<MPrivateRoute><Formulir /></MPrivateRoute>} />
          <Route path="/berhasilmagang" element={<MPrivateRoute><BerhasilMagang /></MPrivateRoute>} />
          <Route path="/konfirmasi" element={<Konfirmasi />} />

          <Route path="/dashboard" element={<RoleBasedRoute allowedRoles="admin"><DashboardAdmin /></RoleBasedRoute>} />
          <Route path="/menu" element={<RoleBasedRoute allowedRoles="admin"><MenuAdmin /></RoleBasedRoute>} />
          <Route path="/beranda_adm" element={<RoleBasedRoute allowedRoles="admin"><BerandaAdmin /></RoleBasedRoute>} />
          <Route path="/temanluki_adm" element={<RoleBasedRoute allowedRoles="admin"><TemanLukiAdmin /></RoleBasedRoute>} />
          <Route path="/sdi_adm" element={<RoleBasedRoute allowedRoles="admin"><SDIAdmin /></RoleBasedRoute>} />
          <Route path="/berita_adm" element={<RoleBasedRoute allowedRoles="admin"><BeritaAdmin /></RoleBasedRoute>} />
          <Route path="/ruangbaca_adm" element={<RoleBasedRoute allowedRoles="admin"><RuangBacaAdmin /></RoleBasedRoute>} />
          <Route path="/myoffice_adm" element={<RoleBasedRoute allowedRoles="admin"><MyOfficeAdmin /></RoleBasedRoute>} />
          <Route path="/ayomagang_adm" element={<RoleBasedRoute allowedRoles="admin"><AyoMagangAdmin /></RoleBasedRoute>} />

          <Route
            path="/ruangbaca"
            element={
              <>
                <RuangBaca />
                <BackToTop />
              </>
            }
          />
          <Route
            path="/temanluki"
            element={
              <>
                <TemanLuki />
                <BackToTop />
              </>
            }
          />
          <Route
            path="/aduan"
            element={
              <>
                <Aduan />
                <BackToTop />
              </>
            }
          />
          <Route
            path="/sdi"
            element={
              <>
                <SDI />
                <BackToTop />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
        </Routes>
        <BackToTop />
      </div>
    </NextUIProvider>
  );
}

export default App;
