import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import HowItWorks from "./components/HowItWorks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Payment from "./components/Payment";
import Contact from "./components/Contact";
import ApiTest from "./components/ApiTest";
import AddProductForm from "./components/AddProductForm";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ApiTest" element={<ApiTest />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProductForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
