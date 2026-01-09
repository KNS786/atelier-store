import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
      setOrder(res.data);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  const downloadInvoice = () => {
    window.open(
      `http://localhost:5000/api/orders/invoice/${orderId}`,
      '_blank'
    );
  };

  if (loading)
    return <p className="p-6 text-gray-600">Loading order...</p>;

  if (!order)
    return <p className="p-6 text-gray-600">Order not found</p>;

  const { shippingAddress } = order;

  return (<>
  <Header/>

   <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 px-4">

        {/* LEFT - ORDER ITEMS */}
        <div className="col-span-8 bg-white rounded-xl shadow-sm p-8">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Order #{order._id}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6">
            {order.items.map((item:any) => (
              <div
                key={item._id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <p className="text-lg font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-orange-600">
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-500">Total Amount</span>
                <span className="text-lg font-semibold text-gray-900">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>

            <hr className="my-5" />

            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-900 mb-2">
                Shipping Address
              </p>
              <p>{order.firstName} {order.lastName}</p>
              <p>{shippingAddress.addressLine1}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state}
              </p>
              <p>
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              <p className="mt-2">📞 {order.phone}</p>
            </div>

            <button
              onClick={downloadInvoice}
              className="w-full mt-6 py-3 rounded-lg border border-orange-600 text-orange-600 font-medium hover:bg-orange-50 transition"
            >
              Download Invoice (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
   
  );
};

export default OrderDetailsPage;
