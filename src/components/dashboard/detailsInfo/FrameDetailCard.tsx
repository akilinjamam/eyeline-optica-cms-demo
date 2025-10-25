/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import type { IFrame } from "../../../types/interface";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import type { FC } from "react";



interface FrameDetailCardProps {
  product: IFrame;
}

const FrameDetailCard: FC<FrameDetailCardProps> = ({ product }) => {
    console.log(product)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full  mx-auto p-4"
    >
      <Card className="shadow-lg rounded-2xl overflow-hidden">
        {/* Header section with main image */}
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-full md:w-1/2">
            <motion.img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-80 object-contain rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="w-full md:w-1/2 space-y-3">
            <CardTitle className="text-2xl font-semibold">{product.name}</CardTitle>

            {product.badge && (
              <Badge variant="secondary" className="text-sm capitalize">
                {product.badge}
              </Badge>
            )}

            <div className="text-lg font-semibold text-gray-700">
              ৳{product.salesPrice}
              {product.discount > 0 && (
                <span className="ml-2 text-sm line-through text-gray-400">
                  ৳{product.purchase}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600">
              <p>Brand: <span className="font-medium">{product.brand}</span></p>
              <p>Color: <span className="font-medium">{product.color}</span></p>
              <p>Type: <span className="capitalize">{product.type}</span></p>
              <p>Stock: {product.stock ? "Available ✅" : "Out of stock ❌"}</p>
            </div>
          </div>
        </CardHeader>

        <Separator />

        {/* Details Section */}
        <CardContent className="p-6 space-y-4 text-sm md:text-base">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Specifications</h3>
              <ul className="text-gray-600 space-y-1">
                <li>Material: {product.materialsCategory}</li>
                <li>Frame: {product.frameCategory}</li>
                <li>Size: {product.sizeCategory}</li>
                <li>Shape: {product.shapeCategory}</li>
                <li>For: {product.biologyCategory}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Additional Info</h3>
              <ul className="text-gray-600 space-y-1">
                <li>Barcode: {product.barcode}</li>
                <li>Quantity: {product.quantity}</li>
                <li>Sold: {product.sold}</li>
                <li>Weekly Deals: {product.weeklyDeals ? "Yes" : "No"}</li>
                <li>Date Added: {new Date(product.date).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>

          {/* Optional Features */}
          {product.features?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map((f:any, i:any) => (
                  <Badge key={i} variant="outline" className="capitalize">
                    {f}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FrameDetailCard;
