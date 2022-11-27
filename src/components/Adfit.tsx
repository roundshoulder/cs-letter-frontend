import { useEffect } from 'react';

function Adfit() {
  useEffect(() => {
    let ins = document.createElement('ins');
    let script = document.createElement('script');
    ins.className = 'kakao_ad_area';
    script.async = true;
    script.type = 'text/javascriptipt';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
    ins.setAttribute('style', 'display:none;');
    ins.setAttribute('data-ad-width', '320');
    ins.setAttribute('data-ad-height', '50');
    ins.setAttribute('data-ad-unit', 'DAN-9i0UsJ1YNLkRxEWh');
    document.querySelector('.adfit')?.appendChild(ins);
    document.querySelector('.adfit')?.appendChild(script);
  }, []);

  return <div className="adfit" />;
}

export default Adfit;
