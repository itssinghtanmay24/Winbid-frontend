import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Home from "./Page/Home";
import Products from "./Page/Products";
import HowItWorks from "./Page/HowItWorks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import PaymentPage from "./components/PaymentPage";
import Contact from "./Page/Contact";
import AddProductForm from "../src/Page/AddProductForm";
import ProfilePage from "./Page/ProfilePage";
import ProductDetails from "./components/ProductDetails";
import { AuthProvider } from "./components/AuthContext";
import { WishlistProvider } from "./components/WishlistContext";
import ProtectedRoute from "./components/ProtectedRoute";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <WishlistProvider>
          <Router>
          <div className="app-container">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/howitworks" element={<HowItWorks />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Protected Routes */}
                <Route path="/products" element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                } />
                
                <Route path="/products/:id" element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                } />
                
                <Route path="/payment" element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/addProduct" element={
                  <ProtectedRoute>
                    <AddProductForm />
                  </ProtectedRoute>
                } />
                
                <Route path="/profile/:Id" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
























// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Page/Home";
// import Products from "./Page/Products";
// import HowItWorks from "./Page/HowItWorks";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import LoginPage from "./Page/LoginPage";
// import RegisterPage from "./Page/RegisterPage";
// import PaymentPage from "./components/PaymentPage";
// import Contact from "./Page/Contact";
// import AddProductForm from "./components/AddProductForm";
// import ProfilePage from "./Page/ProfilePage";
// import ProductDetails from "./components/ProductDetails";
// import { AuthProvider } from "./components/AuthContext";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="app-container">
//           <Header />
//           <main className="main-content">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/howitworks" element={<HowItWorks />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/products" element={<Products />} />
//               <Route path="/products/:id" element={<ProductDetails />} />
//               <Route path="/payment" element={<PaymentPage />} />
//               <Route path="/addProduct" element={<AddProductForm />} />
//               <Route path="/profile/:Id" element={<ProfilePage />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
