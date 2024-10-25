import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductProvider>
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
          <GoogleOAuthProvider clientId = "568147975166-9mjv1p20b7t0di9o8nbhrqb1v854eccu.apps.googleusercontent.com">
           <App />
           </GoogleOAuthProvider>
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </ProductProvider>
  </BrowserRouter>
);
