import React from 'react';

// Reusable internal components for DOM discipline
const MessageBubble: React.FC<{ sender: 'customer' | 'merchant'; children: React.ReactNode; className?: string }> = ({ sender, children, className = '' }) => {
  const isCustomer = sender === 'customer';
  return (
    <div className={`flex w-full ${isCustomer ? 'justify-start' : 'justify-end'} ${className}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm sm:text-base shadow-sm ${
        isCustomer ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' : 'bg-emerald-500 text-white rounded-tr-none'
      }`}>
        {children}
      </div>
    </div>
  );
};

const TransactionCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden flex flex-col ${className}`}>
      <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {title}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

const NarrativeSection: React.FC = () => {
  return (
    // The main container acts as the scroll timeline.
    // We give it a large height so the user can scroll through the story.
    <section className="relative w-full bg-slate-50 h-[400vh]">
      
      // The pin container will be pinned by GSAP. It takes up exactly one viewport.
      <div className="pin-container sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Editorial Statement */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center pointer-events-none">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
            <span className="block opacity-0 translate-y-8 editorial-line-1">EVERY WHATSAPP ORDER</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-normal text-slate-500 mt-2 mb-2 opacity-0 translate-y-8 editorial-line-2">starts with</span>
            <span className="block opacity-0 translate-y-8 editorial-line-3">A CONVERSATION.</span>
          </h2>
        </div>

        {/* 11:47 PM Timestamp (Hidden initially) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 timestamp-indicator text-slate-400 font-medium tracking-widest text-sm">
          11:47 PM
        </div>

        {/* The Spatial Canvas - Where the narrative unfolds */}
        <div className="relative w-full max-w-5xl h-full mx-auto p-4 sm:p-8 flex items-center justify-center">
          
          {/* Conversation Anchor */}
          <div className="absolute z-30 w-full max-w-sm flex flex-col gap-4 conversation-container opacity-0 translate-y-12">
            <MessageBubble sender="customer" className="msg-1">
              Is the blue shirt available in L?
            </MessageBubble>
            
            <MessageBubble sender="merchant" className="msg-2">
              Yes, L is available.
            </MessageBubble>
            
            <MessageBubble sender="customer" className="msg-3">
              What's the price?
            </MessageBubble>
            
            <MessageBubble sender="merchant" className="msg-4">
              ₹1,499.
            </MessageBubble>

            {/* Unanswered message (appears later) */}
            <MessageBubble sender="customer" className="msg-unanswered hidden">
              Is this available?
            </MessageBubble>
          </div>

          {/* Scattered Manual Interventions (Hidden initially, absolutely positioned around the chat) */}
          <div className="absolute inset-0 pointer-events-none z-20 manual-interventions">
            
            {/* Product Check */}
            <TransactionCard title="Check Availability" className="absolute top-[15%] left-[5%] w-64 opacity-0 scale-95 intervention-card-1">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-md"></div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">Blue Shirt - L</div>
                  <div className="text-emerald-600 font-semibold text-sm">In Stock (12)</div>
                </div>
              </div>
            </TransactionCard>

            {/* Order Generation */}
            <TransactionCard title="Create Order" className="absolute top-[35%] right-[5%] w-64 opacity-0 scale-95 intervention-card-2">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-slate-800">Order #ORD-8821</div>
                <div className="text-xs text-slate-500">Customer: +91 98765 43210</div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-sm font-bold">₹1,499</span>
                </div>
              </div>
            </TransactionCard>

            {/* Payment Verification */}
            <TransactionCard title="Verify Payment" className="absolute bottom-[20%] left-[10%] w-64 opacity-0 scale-95 intervention-card-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  ✓
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800">UPI Payment Received</div>
                  <div className="text-xs text-slate-500">Txn: UPI982374982</div>
                </div>
              </div>
            </TransactionCard>

            {/* Invoice Generation */}
            <TransactionCard title="Generate Invoice" className="absolute bottom-[10%] right-[10%] w-64 opacity-0 scale-95 intervention-card-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">GST Invoice</div>
                  <div className="text-xs text-slate-500">INV-2026-104</div>
                </div>
                <button className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-medium">Send</button>
              </div>
            </TransactionCard>
          </div>

          {/* The AI Takeover (Resolution State) - Hidden initially */}
          <div className="absolute inset-0 pointer-events-none z-40 automated-flow hidden flex-col items-center justify-center gap-6">
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 ai-takeover-text opacity-0">
              Your AI agent takes over.
            </h3>
            
            {/* The Connected Transaction Graph */}
            <div className="flex flex-col md:flex-row items-stretch gap-4 w-full max-w-4xl mx-auto opacity-0 connected-graph">
              {/* Product */}
              <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="w-full h-32 bg-blue-50 rounded-lg mb-3"></div>
                <div className="font-medium">Blue Shirt</div>
                <div className="text-sm text-slate-500">Size L</div>
                <div className="font-bold mt-1">₹1,499</div>
              </div>
              
              {/* Order -> Payment -> Invoice Flow */}
              <div className="flex-[2] flex flex-col gap-3">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                  <span className="font-medium text-sm">Order Created</span>
                  <span className="text-emerald-600 text-xs font-bold px-2 py-1 bg-emerald-50 rounded-full">Automated</span>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                  <span className="font-medium text-sm">Payment Link Sent</span>
                  <span className="text-emerald-600 text-xs font-bold px-2 py-1 bg-emerald-50 rounded-full">Automated</span>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                  <span className="font-medium text-sm">GST Invoice Shared</span>
                  <span className="text-emerald-600 text-xs font-bold px-2 py-1 bg-emerald-50 rounded-full">Automated</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NarrativeSection;
