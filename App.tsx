import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import InspectionForm from './components/InspectionForm';
import SummaryDashboard from './components/SummaryDashboard';
import { InspectionRecord } from './types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 space-y-8">
      <div className="text-center space-y-2">
         <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
         </div>
         <h1 className="text-3xl font-bold text-gray-900">ระบบตรวจสภาพรถบรรทุกอ้อย</h1>
         <p className="text-gray-500">มิตรผล (อำนาจเจริญ)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
        <button 
          onClick={() => navigate('/inspect')}
          className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <span className="text-lg font-medium text-gray-900">บันทึกการตรวจ</span>
          <span className="text-sm text-gray-500 mt-1">กรอกแบบฟอร์มใหม่</span>
        </button>

        <button 
           onClick={() => navigate('/summary')}
           className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow group"
        >
           <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-lg font-medium text-gray-900">ดูรายงานสรุป</span>
          <span className="text-sm text-gray-500 mt-1">Dashboard ผลการตรวจ</span>
        </button>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  // Central State for all inspections in this session
  const [inspections, setInspections] = useState<InspectionRecord[]>([]);
  const navigate = useNavigate();

  const handleInspectionSubmit = (record: InspectionRecord) => {
    setInspections(prev => [...prev, record]);
    alert("บันทึกข้อมูลเรียบร้อย!");
    navigate('/summary');
  };

  // Share functionality
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: 'Mitr Phol Inspection',
      text: 'ลิงค์สำหรับเข้าใช้งานระบบตรวจสภาพรถบรรทุกอ้อย',
      url: url,
    };

    // Check if Web Share API is supported (Mobile/Tablet usually support this)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('User canceled share');
      }
    } else {
      // Fallback for Desktop: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('คัดลอกลิ้งค์เรียบร้อย! \nคุณสามารถส่งลิ้งค์นี้ไปเปิดบน Tablet ได้ทันที');
      } catch (err) {
        alert('ลิ้งค์: ' + url);
      }
    }
  };

  // Calculate stats to pass to the inspection form
  const passedCount = inspections.filter(r => r.overallPassed).length;
  const failedCount = inspections.length - passedCount;
  const sessionStats = {
      total: inspections.length,
      passed: passedCount,
      failed: failedCount
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <span className="font-bold text-xl text-blue-900">Mitr Phol Inspect</span>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Navigation Links */}
                <div className="hidden md:flex space-x-4">
                  <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">หน้าแรก</Link>
                  <Link to="/inspect" className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">ตรวจรถ</Link>
                </div>

                {/* Share Button */}
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-medium transition-colors"
                  title="แชร์ / ส่งเข้า Tablet"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="hidden sm:inline">แชร์ลิ้งค์</span>
                </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/inspect" 
            element={
              <InspectionForm 
                onSubmit={handleInspectionSubmit} 
                onCancel={() => navigate('/')} 
                sessionStats={sessionStats}
              />
            } 
          />
          <Route 
            path="/summary" 
            element={
              <SummaryDashboard 
                records={inspections} 
                onBack={() => navigate('/')}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}