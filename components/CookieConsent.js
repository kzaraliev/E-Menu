"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Приемам всички"
      declineButtonText="Приемам само необходимите"
      enableDeclineButton
      cookieName="e-menu-cookie-consent"
      style={{
        background: "linear-gradient(to right, #1f2937, #374151)",
        fontSize: "13px",
        fontFamily: "Arial, sans-serif",
        padding: "12px 16px",
        alignItems: "center",
      }}
      buttonStyle={{
        background: "#10b981",
        color: "#ffffff",
        fontSize: "12px",
        fontWeight: "600",
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        marginLeft: "8px",
        marginTop: "8px",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#ffffff",
        fontSize: "12px",
        fontWeight: "500",
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid #9ca3af",
        cursor: "pointer",
        marginLeft: "8px",
        marginTop: "8px",
      }}
      expires={365}
      onAccept={() => {
        // Accept all cookies
        console.log("User accepted all cookies");
      }}
      onDecline={() => {
        // Accept only essential cookies
        console.log("User accepted only essential cookies");
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div className="mb-2 sm:mb-0 sm:mr-4">
          <span className="text-white font-medium text-sm">
            🍪 Използваме бисквитки
          </span>
          <div className="text-gray-300 text-xs sm:text-sm mt-1">
            Използваме бисквитки за подобряване на вашето изживяване.
            <Link
              href="/cookies-policy"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Научете повече
            </Link>
          </div>
        </div>
      </div>
    </CookieConsent>
  );
}
