import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonnar";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/LoginPage";
import Signup from "./pages/Auth/SignUp";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>

          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/order-details/:orderId' element={<OrderDetailsPage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </CartProvider>
 
  </QueryClientProvider>
);

export default App;
