import React from "react";
import "./FeatureCardsLayout.css";

function FeatureCardsLayout({ children, cols = 3, className = "" }) {
  return (
    <div className={`feature-cards-layout cols-${cols} ${className}`.trim()}>
      {children}
    </div>
  );
}

export default FeatureCardsLayout;
