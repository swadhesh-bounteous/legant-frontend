"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrderSummary from "./OrderSummary";
import OrderComplete from "./OrderComplete";
import { Typography } from "@/components";
import { CheckCheckIcon } from "lucide-react";
import useOrderStore from "@/store/useOrderStore";

const CheckoutPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("summary");
  const { orderDetails } = useOrderStore();

  const handleTabChange = (value: string) => {
    if (value === "summary" || (value === "complete" && orderDetails)) {
      setCurrentTab(value);
    }
  };

  return (
    <div>
      <div className="p-4 h-fit flex flex-col">
        <Typography
          variant="h1"
          className="text-center text-2xl md:text-4xl font-normal mb-8 py-4"
        >
          Checkout
        </Typography>
        <Tabs value={currentTab} className="flex-1">
          <TabsList className="flex justify-center gap-x-6 bg-white">
            <TabsTrigger
              value="summary"
              className={`text-lg pb-2 border-b-2 rounded-none ${
                currentTab === "summary"
                  ? "border-black font-semibold"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => handleTabChange("summary")}
            >
              {orderDetails ? (
                <div className="flex items-center space-x-2">
                  <CheckCheckIcon className="h-5 w-5 text-green-500" />
                  <Typography variant="span">Checkout Details</Typography>
                </div>
              ) : (
                "Order Summary"
              )}
            </TabsTrigger>
            <TabsTrigger
              value="complete"
              className={`text-lg pb-2 border-b-2 rounded-none ${
                currentTab === "complete"
                  ? "border-black font-semibold"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => handleTabChange("complete")}
              disabled={!orderDetails}
            >
              {orderDetails ? (
                <span className="flex items-center space-x-2">
                  <span>Order Complete</span>
                </span>
              ) : (
                "Order Complete"
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <OrderSummary />
          </TabsContent>
          <TabsContent value="complete" className="flex justify-center">
            <OrderComplete />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CheckoutPage;
