import { useState } from 'react';

export default function StorageDataScreen() {
  const [autoDownload, setAutoDownload] = useState(localStorage.getItem('cn_auto_dl') === '1');
  return <main className="screen-page"><h2>Storage and Data</h2><div className="announcement">Media cache and usage analytics are available in backend phase.</div><button className="settings-item" onClick={()=>{ const v=!autoDownload; setAutoDownload(v); localStorage.setItem('cn_auto_dl', v ? '1' : '0'); }}><span>Auto download media</span><span>{autoDownload?'ON':'OFF'}</span></button><button className="settings-item" onClick={()=>localStorage.clear()}><span>Clear local cache</span><span>Run</span></button></main>;
}
