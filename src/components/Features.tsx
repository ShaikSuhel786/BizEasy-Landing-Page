"use client";

import { MessageCircle, Receipt, IndianRupee } from "lucide-react";

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
    <section className="relative py-32 overflow-hidden bg-[#FAFAFA]">
      {/* Ambient Mesh Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[100px] animate-blob mix-blend-multiply" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-300/30 rounded-full blur-[100px] animate-blob mix-blend-multiply" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-sky-300/30 rounded-full blur-[100px] animate-blob mix-blend-multiply" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Everything you need to scale.
          </h2>
          <p className="text-lg text-gray-500">
            A complete suite of tools to automate your commerce, all happening natively inside WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx}
                className="relative group p-8 rounded-[32px] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-gray-900 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
