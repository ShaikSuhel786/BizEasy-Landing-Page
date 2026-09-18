"use client";

import { MessageCircle, Receipt, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Features() {
  const features = [
    {
      title: "Automated WhatsApp Ordering",
      description: "Convert your WhatsApp catalog into a seamless ordering experience. Customers browse, select, and checkout without human intervention.",
      icon: MessageCircle,
    },
    {
      title: "Instant UPI Payments",
      description: "Collect payments instantly via UPI. We generate dynamic payment links directly inside the chat for frictionless checkout.",
      icon: IndianRupee,
    },
    {
      title: "Automated GST Invoicing",
      description: "Generate compliant GST invoices the moment a payment succeeds, and send them automatically to the customer as a PDF.",
      icon: Receipt,
    },
  ];

  return (
    <section id="features" className="relative py-32 overflow-hidden bg-[#FAFAFA] scroll-mt-20">
      {/* High-Performance Ambient Radial Glows (Using radial gradients instead of expensive CSS blur) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(96,165,250,0.15)_0%,transparent_70%)] transform-gpu will-change-transform" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(192,132,252,0.15)_0%,transparent_70%)] transform-gpu will-change-transform" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(56,189,248,0.15)_0%,transparent_70%)] transform-gpu will-change-transform" style={{ transform: 'translateZ(0)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Everything you need to scale.
          </h2>
          <p className="text-lg text-gray-500">
            A complete suite of tools to automate your commerce, all happening natively inside WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EXPO_OUT }}
                className="relative group p-8 rounded-[32px] bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 active:scale-[0.98] transition-[transform,box-shadow] duration-200 ease-out cursor-default select-none will-change-transform"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-gray-900 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-250 ease-out">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
