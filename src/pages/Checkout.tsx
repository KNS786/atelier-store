import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, Check } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { createOrder, payOrder } from '../services/api';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail ] = useState('');
  const [phone, setPhone] = useState('');
 const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
    const [state, setState] = useState('');
      const [postalCode, setPostalCode] = useState('');








  const shippingCost = totalPrice >= 200 ? 0 : 15;
  const total = totalPrice + shippingCost;


  const payNow = async (orderId: string ) => {
  const res = await payOrder(orderId)

  const { payuUrl, params } = res.data;

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = payuUrl;

  Object.entries(params).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();

  
};


  const handlePlaceOrder = async () => {
    try {
      const order = await createOrder({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        shippingAddress: {
          addressLine1:  address,
          city: city,
          state: state,
          postalCode: postalCode,
          country: 'India'
        }
      });

      console.log('Order created:', order);
      await payNow(order._id);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Order failed');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    await handlePlaceOrder()
    // clearCart();

    toast({
      title: 'Order placed successfully!',
      description: 'Thank you for your purchase. You will receive a confirmation email shortly.',
    });
    navigate('/');
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold text-foreground mb-4">
            Your cart is empty
          </h1>
          <Link to="/" className="text-primary hover:underline">
            Return to shop
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-10">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to cart
        </Link>

        <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Contact Information
                </h2>
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={firstName} onChange={(e) => {
                        setFirstName(e.target.value);
                      }} required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input value={lastName} onChange={(e) => {
                        setLastName(e.target.value)
                      }} id="lastName" required className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} type="email" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input value={phone} onChange={(e) => {
                        setPhone(e.target.value);
                    }} id="phone" type="tel" required className="mt-1.5" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Shipping Address
                </h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input value={address} onChange={(e) => {
                        setAddress(e.target.value);
                    }} id="address" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input  id="apartment" className="mt-1.5" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input value={city} onChange={(e) => {
                        setCity(e.target.value);
                      }} id="city" required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input value={state} onChange={(e) => {
                        setState(e.target.value);
                      }} id="state" required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input value={postalCode} onChange={(e) => {
                        setPostalCode(e.target.value)
                      }} id="zip" required className="mt-1.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              {/* <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Payment
                </h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        required
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        required
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-28">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-display font-semibold">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-full font-medium mt-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
