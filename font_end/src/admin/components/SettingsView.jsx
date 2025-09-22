import React from 'react';
import { Settings } from 'lucide-react';

const SettingsView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-white">ตั้งค่าระบบ</h2>
    </div>

    <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
      <div className="text-center py-16">
        <Settings className="text-slate-400 mx-auto mb-4" size={64} />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">หน้าตั้งค่า</h3>
        <p className="text-slate-500">ฟีเจอร์นี้จะพัฒนาในอนาคต</p>
      </div>
    </div>
  </div>
);

export default SettingsView;

