function Ad() {
  return (
    <>
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-CsUte27etp4ZgLkv"
        data-ad-width="320"
        data-ad-height="50"
      ></ins>
      <script
        type="text/javascript"
        src="//t1.daumcdn.net/kas/static/ba.min.js"
        async
      ></script>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2342554377743949"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default Ad;
