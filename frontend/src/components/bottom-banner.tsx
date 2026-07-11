import React from "react";

interface BottomBannerProps {
  text?: string;
  link?: string;
  backgroundColor?: string;
  textColor?: string;
}

const BottomBanner: React.FC<BottomBannerProps> = ({
  text = "Made with 🩵 by Aaron at Devtiro",
  link = "https://www.youtube.com/@devtiro",
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-black text-white shadow-lg z-99 border-t`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href={link}
          className="flex-1 text-center text-sm hover:underline"
          target="_blank"
        >
          {text}
        </a>
      </div>
    </div>
  );
};

export default BottomBanner;
