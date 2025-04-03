import React, { useState } from "react";

const [productDetails, setProductDetails] = useState({
  name: "",
  description: "",
  price: "",
  category: "",
  startingPrice: "",
  reservePrice: "",
  auctionType: "",
  startDate: null,
  endDate: null,
  isAuction: false
});

// Update the handleDetailsChange function to handle new fields:
const handleDetailsChange = (e) => {
  const { name, value } = e.target;
  setProductDetails((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// Update the Copilot actions to include auction fields
useCopilotAction({
  name: "updateProductDetails",
  description: "Update the product details and move to the next step if appropriate",
  parameters: [
    {
      name: "details",
      type: "object",
      description: "The new product details.",
      attributes: [
        // Existing fields...
        {
          name: "startingPrice",
          type: "string",
          description: "The starting price for auctions.",
          required: false,
        },
        {
          name: "reservePrice",
          type: "string",
          description: "The minimum acceptable price for auctions.",
          required: false,
        },
        {
          name: "isAuction",
          type: "boolean",
          description: "Whether this is an auction listing.",
          required: false,
        },
        {
          name: "auctionType",
          type: "string",
          description: "Type of auction (static or live).",
          required: false,
        },
        {
          name: "startDate",
          type: "string",
          description: "Start date for live auctions.",
          required: false,
        },
        {
          name: "endDate",
          type: "string",
          description: "End date for auctions.",
          required: false,
        },
      ],
    },
    // Rest of the action...
  ],
  // Rest of the action...
});

// Update the completeProductUpload action to handle auction fields
useCopilotAction({
  name: "completeProductUpload",
  description: "Finalize the product upload process, including auction details if applicable.",
  parameters: [
    {
      name: "productDetails",
      type: "object",
      description: "The complete product details to be uploaded.",
      attributes: [
        // Existing fields...
        {
          name: "startingPrice",
          type: "string",
          description: "The starting price for auctions.",
          required: false,
        },
        {
          name: "reservePrice",
          type: "string",
          description: "The minimum acceptable price for auctions.",
          required: false,
        },
        {
          name: "isAuction",
          type: "boolean",
          description: "Whether this is an auction listing.",
          required: false,
        },
        {
          name: "auctionType",
          type: "string",
          description: "Type of auction (static or live).",
          required: false,
        },
        {
          name: "startDate",
          type: "string",
          description: "Start date for live auctions.",
          required: false,
        },
        {
          name: "endDate",
          type: "string",
          description: "End date for auctions.",
          required: false,
        },
      ],
    },
    // ...existing code...
  ],
  // ...existing code...
});