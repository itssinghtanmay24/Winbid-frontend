import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Products from "./Page/Products";
import HowItWorks from "./Page/HowItWorks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import PaymentPage from "./components/PaymentPage";
import Contact from "./Page/Contact";
import AddProductForm from "./components/AddProductForm";
import ProfilePage from "./Page/ProfilePage";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
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
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/addProduct" element={<AddProductForm />} />
            <Route path="/profile/:email" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
