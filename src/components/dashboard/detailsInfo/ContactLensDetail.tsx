import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import type { FC } from "react";
import type { ContactLens } from "../../../types/interface";

interface ContactLensDetailProps {
  contactLens: ContactLens;
}

const ContactLensDetail: FC<ContactLensDetailProps> = ({ contactLens }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full  mx-auto p-4"
    >
      <Card className="shadow-xl border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
        {/* --- Header Section --- */}
        <CardHeader className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-gray-50 to-white p-6">
          {/* --- Image --- */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center bg-white rounded-xl p-4 border border-gray-100"
          >
            <img
              src={contactLens.images?.[0] || "/placeholder-contact-lens.png"}
              alt={contactLens.name}
              className="w-full max-h-80 object-contain rounded-lg"
            />
          </motion.div>

          {/* --- Info --- */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                {contactLens.name}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                {contactLens.brand} • {contactLens.type}
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">
                ৳{contactLens.salesPrice}
                { (contactLens.purchasePrice !== null && contactLens.purchasePrice) > (contactLens.salesPrice !== null && contactLens.salesPrice) && (
                  <span className="ml-3 text-sm text-gray-400 line-through">
                    ৳{contactLens.purchasePrice}
                  </span>
                )}
              </p>
              { contactLens.offer !== null && contactLens.offer > 0 && (
                <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                  -{contactLens.offer}% OFF
                </Badge>
              )}
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>Color: <span className="font-medium capitalize">{contactLens.color}</span></p>
              <p>Material: {contactLens.material}</p>
              <p>Water Content: {contactLens.waterContent}</p>
              <p>Stock: {contactLens.stock ? "✅ Available" : "❌ Out of Stock"}</p>
              <p>Sold: {contactLens.sold}</p>
            </div>
          </div>
        </CardHeader>

        {/* --- Details Section --- */}
        <CardContent className="p-6 space-y-6 text-sm md:text-base">
          <section>
            <h3 className="font-semibold text-gray-800 mb-2">Technical Details</h3>
            <ul className="text-gray-600 grid sm:grid-cols-2 gap-x-8 gap-y-2">
              <li>Diameter: {contactLens.diameter}mm</li>
              <li>Base Curve: {contactLens.baseCurve}</li>
              <li>Power Range: {contactLens.powerRange}</li>
              <li>UV Protection: {contactLens.uvProtection ? "Yes ☀️" : "No"}</li>
              <li>Rating: ⭐ {contactLens.rating?.toFixed(1) || 0}/5</li>
              <li>Quantity in Stock: {contactLens.quantity}</li>
            </ul>
          </section>

          {contactLens.features?.length > 0 && (
            <section>
              <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {contactLens.features.map((feature, i) => (
                  <Badge key={i} variant="outline" className="capitalize bg-gray-50">
                    {feature}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {contactLens.description && (
            <section>
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {contactLens.description}
              </p>
            </section>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactLensDetail;
