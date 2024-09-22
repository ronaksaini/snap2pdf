import React, { useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQRCodeUrl] = useState('');

  // Generate QR Code
  const generateQRCode = async (value) => {
    try {
      const url = await QRCode.toDataURL(value);
      setQRCodeUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (value) {
      generateQRCode(value); // Generate QR code whenever text changes
    } else {
      setQRCodeUrl('');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={handleInputChange}
        style={{ padding: '10px', width: '300px', marginBottom: '20px'}}
      />
      <br />
      {qrCodeUrl && (
        <img src={qrCodeUrl} alt="QR Code" style={{ marginTop: '20px' , backgroundColor:"red", color:"red"}} />
      )}
    </div>
  );
};

export default QRCodeGenerator;
