import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import HowItWorks from "./components/HowItWorks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PaymentPage from "./components/PaymentPage";
import Contact from "./components/Contact";
import AddProductForm from "./components/AddProductForm";
import Profile from "./components/Profile";
import ProductDetails from "./components/ProductDetails";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap everything with AuthProvider */}
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/addProduct" element={<AddProductForm />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;