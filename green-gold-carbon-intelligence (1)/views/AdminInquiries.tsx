import React, { useState, useEffect } from 'react';

interface Inquiry {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  urgency: 'Normal' | 'Urgent' | 'Critical';
  status: 'New' | 'Read' | 'Replied';
  timestamp: string;
  replies: { text: string; timestamp: string; author: string }[];
}

const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Load inquiries from storage + hardcoded mock data
  useEffect(() => {
    const mockInquiries: Inquiry[] = [
      {
        id: 'INQ-101',
        senderName: 'Michael Chen',
        senderEmail: 'm.chen@carehomes.co.uk',
        subject: 'Enterprise Consultation',
        message: 'We are looking to expand our sustainability monitoring to 15 new sites across the Midlands. Can you provide a bulk pricing structure?',
        urgency: 'Urgent',
        status: 'New',
        timestamp: '2024-11-20 09:15',
        replies: []
      },
      {
        id: 'INQ-102',
        senderName: 'Sarah Jenkins',
        senderEmail: 'sjenkins@horizon.ai',
        subject: 'API & Integration Support',
        message: 'Need help connecting our smart meter API with your dashboard. The tokens keep expiring every 24 hours.',
        urgency: 'Normal',
        status: 'Read',
        timestamp: '2024-11-19 14:30',
        replies: []
      },
      {
        id: 'INQ-103',
        senderName: 'Dr. Robert Blake',
        senderEmail: 'r.blake@greenpath.org',
        subject: 'Regulatory Compliance Query',
        message: 'Our annual ESG audit is coming up. Does your platform generate report v4.2 specifically for the healthcare sector?',
        urgency: 'Critical',
        status: 'Replied',
        timestamp: '2024-11-18 11:00',
        replies: [
          { text: 'Yes, Dr. Blake. Our v4.2 reports are compliant with latest UK healthcare standards.', timestamp: '2024-11-18 13:45', author: 'Admin Director' }
        ]
      }
    ];

    const localStr = localStorage.getItem('ggci_local_inquiries') || '[]';
    const localInquiries = JSON.parse(localStr);
    
    // Merge local first so latest ones appear top
    setInquiries([...localInquiries, ...mockInquiries]);
  }, []);

  const handleOpenInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    if (inquiry.status === 'New') {
      const updated = inquiries.map(iq => iq.id === inquiry.id ? { ...iq, status: 'Read' as const } : iq);
      setInquiries(updated);
      syncStorage(updated);
    }
  };

  const syncStorage = (allInquiries: Inquiry[]) => {
    // Only save the ones that were originally from the contact form (we can track by checking if ID exists in original storage or just save all)
    // To keep it simple, we save the delta or just persist the state
    const localInquiries = allInquiries.filter(iq => iq.id.startsWith('INQ-') && !['INQ-101', 'INQ-102', 'INQ-103'].includes(iq.id));
    localStorage.setItem('ggci_local_inquiries', JSON.stringify(localInquiries));
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedInquiry) return;
    
    setIsReplying(true);
    // Simulate API delay
    setTimeout(() => {
      const updatedReplies = [...selectedInquiry.replies, { text: replyText, timestamp: new Date().toLocaleString(), author: 'Admin Director' }];
      const updatedInquiry = { ...selectedInquiry, replies: updatedReplies, status: 'Replied' as const };
      
      const updatedList = inquiries.map(iq => iq.id === selectedInquiry.id ? updatedInquiry : iq);
      setInquiries(updatedList);
      syncStorage(updatedList);
      
      setSelectedInquiry(updatedInquiry);
      setReplyText('');
      setIsReplying(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enterprise Inquiries</h2>
          <p className="text-gray-500">Manage communication with users and sustainability leads.</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {inquiries.filter(i => i.status === 'New').length} New Messages
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-250px)]">
        {/* Inbox List */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-50 bg-slate-50">
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {inquiries.map(iq => (
              <button
                key={iq.id}
                onClick={() => handleOpenInquiry(iq)}
                className={`w-full p-4 border-b border-gray-50 text-left hover:bg-gray-50 transition-all relative ${selectedInquiry?.id === iq.id ? 'bg-purple-50' : ''}`}
              >
                {iq.status === 'New' && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                )}
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{iq.id}</span>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    iq.urgency === 'Critical' ? 'bg-red-100 text-red-700' :
                    iq.urgency === 'Urgent' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {iq.urgency}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm truncate">{iq.subject}</h4>
                <p className="text-xs text-gray-500 truncate mb-2">{iq.senderName}</p>
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>{iq.timestamp.split(',')[0]}</span>
                  <span className={`px-1.5 py-0.5 rounded ${
                    iq.status === 'Replied' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400'
                  }`}>
                    {iq.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Detail */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          {selectedInquiry ? (
            <>
              <div className="p-6 border-b border-gray-50 bg-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                    {selectedInquiry.senderName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedInquiry.senderName}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-tighter">{selectedInquiry.senderEmail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inquiry ID</p>
                  <p className="text-sm font-mono text-purple-600 font-bold">{selectedInquiry.id}</p>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {/* Original Message */}
                <div className="flex flex-col items-start">
                  <div className="max-w-[80%] bg-gray-50 p-5 rounded-[2rem] rounded-tl-none border border-gray-100">
                    <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-2">{selectedInquiry.subject}</p>
                    <p className="text-sm text-gray-800 leading-relaxed">{selectedInquiry.message}</p>
                    <p className="text-[10px] text-gray-400 mt-4 font-bold">{selectedInquiry.timestamp}</p>
                  </div>
                </div>

                {/* Replies */}
                {selectedInquiry.replies.map((reply, i) => (
                  <div key={i} className="flex flex-col items-end">
                    <div className="max-w-[80%] bg-purple-600 text-white p-5 rounded-[2rem] rounded-tr-none shadow-lg shadow-purple-100">
                      <p className="text-sm leading-relaxed">{reply.text}</p>
                      <p className="text-[10px] text-purple-200 mt-4 font-bold">Replied by {reply.author} at {reply.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Area */}
              <div className="p-6 border-t border-gray-50">
                <form onSubmit={handleSendReply} className="flex gap-3">
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your official response..."
                    className="flex-grow p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 text-sm transition-all resize-none h-14"
                  />
                  <button 
                    type="submit"
                    disabled={isReplying || !replyText.trim()}
                    className="bg-purple-600 text-white px-8 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                  >
                    {isReplying ? '...' : 'Send'}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-12 text-gray-400">
              <span className="text-6xl mb-4">📬</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Conversation</h3>
              <p className="max-w-xs text-sm">Choose an inquiry from the sidebar to view details and send your reply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;