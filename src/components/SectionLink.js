// SectionLink.js
import React from 'react';
import '../styles/SectionLink.css'; 

function SectionLink({ title, link, imageSrc }) {
  const fallbackImageSrc = "https://www.google.com/search?sca_esv=561640084&sxsrf=AB5stBiAt3ZV03xz_F845m8-Pn4X-NKNmg:1693500483894&q=dogs&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjXrpP2rIeBAxWll2oFHQ5LCOwQ0pQJegQIDBAB&biw=1439&bih=758&dpr=2#imgrc=0_qyZ-_-oXEuEM";

  return (
    <div className="section-card" onClick={() => window.location.href = link}>
      <img src={imageSrc || fallbackImageSrc} alt="fallback" />
      <h3>{title}</h3>
    </div>
  );
}

export default SectionLink;