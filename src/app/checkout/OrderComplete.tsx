import React from "react";
import useOrderStore from "@/store/useOrderStore";
import Typography from "@/components/common/Typography";

const OrderComplete: React.FC = () => {
  const { orderDetails } = useOrderStore();

  if (!orderDetails) {
    return <div>No order details available.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-200 text-gray-800 p-8 rounded-lg shadow-lg my-12 border-green-800">
      <Typography variant="h2" className="text-3xl font-semibold mb-6 text-center">Order Complete</Typography>
      <Typography variant="p" className="text-lg font-medium mb-4">Order ID: {orderDetails.orderId}</Typography>
      <Typography variant="p" className="text-lg font-medium mb-6 text-green-500">
        Total Amount: ${orderDetails.totalAmount.toFixed(2)}
      </Typography>
      <Typography variant="h3" className="text-2xl font-semibold mb-4">Items:</Typography>
      <ul className="list-disc list-inside space-y-2">
        {orderDetails.items.map((item) => (
          <li key={item.id} className="text-lg">
            {item.name} (Quantity: {item.quantity}) - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderComplete;
