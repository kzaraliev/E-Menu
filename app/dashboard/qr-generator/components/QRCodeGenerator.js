"use client";

import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { useQRCode } from "next-qrcode";

export default function QRCodeGenerator({ restaurants = [] }) {
  const { Canvas, SVG } = useQRCode();
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [qrData, setQrData] = useState("");
  const [qrType, setQrType] = useState("url"); // 'url', 'wifi'
  const [qrSize, setQrSize] = useState(300);
  const qrLevel = "H"; // Най-високо качество за оптимална error correction

  const [qrFgColor, setQrFgColor] = useState("#000000");
  const qrBgColor = "#FFFFFF"; // Фиксиран бял фон за оптимална работа
  const [includeMargin, setIncludeMargin] = useState(true);
  const [logoSrc, setLogoSrc] = useState("");
  const [logoOptions, setLogoOptions] = useState({
    width: 60,
    height: 60,
    excavate: true,
  });

  const [wifiConfig, setWifiConfig] = useState({
    ssid: "",
    password: "",
    security: "WPA",
  });
  const canvasRef = useRef(null);

  // Генериране на URL за ресторант
  const generateRestaurantURL = (restaurant) => {
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "https://e-menu.bg";
    return `${baseURL}/${restaurant.slug}`;
  };

  // Генериране на WiFi конфигурация
  const generateWifiQR = () => {
    const { ssid, password, security } = wifiConfig;
    return `WIFI:T:${security};S:${ssid};P:${password};;`;
  };

  // Генериране на QR данни въз основа на типа
  const generateQRData = () => {
    const restaurant = restaurants.find((r) => r.id == selectedRestaurant);

    switch (qrType) {
      case "url":
        if (restaurant && selectedRestaurant !== "") {
          return generateRestaurantURL(restaurant);
        }
        return ""; // Не показвай QR код ако няма избран ресторант

      case "wifi":
        if (wifiConfig.ssid.trim()) {
          return generateWifiQR();
        }
        return ""; // Не показвай QR код ако няма WiFi име

      default:
        return "";
    }
  };

  // Auto-update QR data when key dependencies change
  useEffect(() => {
    setQrData(generateQRData());
  }, [
    selectedRestaurant,
    qrType,
    wifiConfig.ssid,
    wifiConfig.password,
    wifiConfig.security,
    restaurants,
    generateQRData,
  ]);

  // Качване на лого файл
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Премахване на лого
  const removeLogo = () => {
    setLogoSrc("");
  };

  // Изтегляне като PNG
  const downloadPNG = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qr-code-${Date.now()}.png`;
      link.href = url;
      link.click();
    }
  };

  const selectedRestaurantData = restaurants.find(
    (r) => r.id == selectedRestaurant
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Създайте QR код
            </h2>
            <p className="text-sm text-gray-600">
              Изберете тип QR код и настройте дизайна според нуждите ви
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Настройки за QR код */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Тип QR код
            </label>
            <select
              value={qrType}
              onChange={(e) => {
                setQrType(e.target.value);
              }}
              className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
            >
              <option value="url">🌐 URL за ресторант</option>
              <option value="wifi">📶 WiFi настройки</option>
            </select>

            {/* Инструкции */}
            <div className="mt-2 text-xs text-gray-500">
              {qrType === "url"
                ? "💡 Клиентите ще отворят директно менюто на ресторанта в браузъра си"
                : "💡 Клиентите ще се свържат автоматично към WiFi мрежата"}
            </div>
          </div>

          {/* Ресторант селекция */}
          {qrType === "url" && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Изберете ресторант
              </label>
              <select
                value={selectedRestaurant}
                onChange={(e) => {
                  setSelectedRestaurant(e.target.value);
                }}
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
              >
                <option value="" className="text-gray-600">Избери ресторант...</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* WiFi настройки */}
          {qrType === "wifi" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  WiFi мрежа (SSID)
                </label>
                <input
                  type="text"
                  value={wifiConfig.ssid}
                  onChange={(e) => {
                    setWifiConfig((prev) => ({
                      ...prev,
                      ssid: e.target.value,
                    }));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Име на WiFi мрежата"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Парола
                </label>
                <input
                  type="password"
                  value={wifiConfig.password}
                  onChange={(e) => {
                    setWifiConfig((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="WiFi парола"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Тип сигурност
                </label>
                <select
                  value={wifiConfig.security}
                  onChange={(e) => {
                    setWifiConfig((prev) => ({
                      ...prev,
                      security: e.target.value,
                    }));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Без парола</option>
                </select>
              </div>
            </div>
          )}

          {/* Стилови настройки */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-4">
              Настройки за дизайн
            </h4>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Размер
              </label>
              <select
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
              >
                <option value={300}>Малък (300px)</option>
                <option value={400}>Среден (400px)</option>
                <option value={450}>Голям (450px)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Качеството винаги е най-високо за оптимална четимост
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Цвят на кода
              </label>
              <input
                type="color"
                value={qrFgColor}
                onChange={(e) => setQrFgColor(e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Фонът винаги е бял за оптимална четимост
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Лого (опционално)
              </label>

              {!logoSrc ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-700"
                  >
                    📎 Качете лого файл
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG до 2MB</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={logoSrc}
                        alt="Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-sm text-gray-700">
                        Лого добавено
                      </span>
                    </div>
                    <button
                      onClick={removeLogo}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Премахни
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Размер на логото
                    </label>
                    <select
                      value={logoOptions.width}
                      onChange={(e) => {
                        const size = parseInt(e.target.value);
                        setLogoOptions((prev) => ({
                          ...prev,
                          width: size,
                          height: size,
                        }));
                      }}
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value={40}>Малко (40px)</option>
                      <option value={60}>Средно (60px)</option>
                      <option value={80}>Голямо (80px)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeMargin}
                  onChange={(e) => setIncludeMargin(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Включи граници</span>
              </label>
            </div>
          </div>
        </div>

        {/* Преглед на QR код */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Преглед</h4>
            <div
              ref={canvasRef}
              className="flex justify-center items-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 overflow-auto"
              style={{ minHeight: "300px", maxHeight: "600px" }}
            >
              {qrData ? (
                <div className="max-w-full max-h-full flex justify-center items-center">
                  <Canvas
                    text={qrData}
                    options={{
                      errorCorrectionLevel: qrLevel,
                      margin: includeMargin ? 3 : 0,
                      scale: 4,
                      width: qrSize,
                      color: {
                        dark: qrFgColor,
                        light: qrBgColor,
                      },
                    }}
                    logo={
                      logoSrc
                        ? {
                            src: logoSrc,
                            options: logoOptions,
                          }
                        : undefined
                    }
                    style={{
                      maxWidth: "100%",
                      maxHeight: "550px", 
                      height: "auto",
                      width: "auto",
                    }}
                  />
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium">
                    QR код ще се генерира автоматично
                  </p>
                  <p className="text-xs mt-1">
                    {qrType === "url"
                      ? "Изберете ресторант за започване"
                      : "Въведете WiFi мрежа за започване"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Информация */}
          {qrType === "url" && selectedRestaurantData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">
                Информация за ресторанта
              </h5>
              <div className="text-sm text-blue-800 space-y-1">
                <p>
                  <strong>Име:</strong> {selectedRestaurantData.name}
                </p>
                {selectedRestaurantData.description && (
                  <p>
                    <strong>Описание:</strong>{" "}
                    {selectedRestaurantData.description}
                  </p>
                )}
                {selectedRestaurantData.address && (
                  <p>
                    <strong>Адрес:</strong> {selectedRestaurantData.address}
                  </p>
                )}
                {selectedRestaurantData.phone && (
                  <p>
                    <strong>Телефон:</strong> {selectedRestaurantData.phone}
                  </p>
                )}
                <p>
                  <strong>URL:</strong>{" "}
                  {generateRestaurantURL(selectedRestaurantData)}
                </p>
              </div>
            </div>
          )}

          {qrType === "wifi" && wifiConfig.ssid && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-medium text-green-900 mb-2">
                WiFi Информация
              </h5>
              <div className="text-sm text-green-800 space-y-1">
                <p>
                  <strong>Мрежа:</strong> {wifiConfig.ssid}
                </p>
                <p>
                  <strong>Сигурност:</strong> {wifiConfig.security}
                </p>
                <p className="text-xs text-green-600 mt-2">
                  Клиентите ще могат да се свържат автоматично към WiFi мрежата,
                  като сканират този QR код.
                </p>
              </div>
            </div>
          )}

          {/* Важна забележка за тестване */}
          {qrData && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h5 className="font-medium text-orange-900 mb-2">
                ⚠️ Важно: Тествайте QR кода
              </h5>
              <div className="text-sm text-orange-800 space-y-1">
                <p>
                  <strong>Преди печат или разпространение:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Сканирайте QR кода с телефон</li>
                  <li>Проверете дали отваря правилния URL</li>
                  <li>Тествайте от различни разстояния</li>
                </ul>
              </div>
            </div>
          )}

          {/* Действия */}
          {qrData && (
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">Изтегляне</h5>
              <button
                onClick={downloadPNG}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                📸 Изтегли като изображение
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
