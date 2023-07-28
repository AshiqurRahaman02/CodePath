import React, { useState, useRef } from 'react';

import "../styles/PopUp.css"

// Type for the ref object of the input element
type InputRef = {
  current: HTMLInputElement | null;
};
interface PopupProps {
  onClose: () => void;
  onOtpSubmit: (otp: number) => void; // Update the type to string
}

const Popup = ({ onClose, onOtpSubmit }:PopupProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<InputRef[]>([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = Number(otp.join(''));
    onOtpSubmit(enteredOtp);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const maxLength = 1;

    if (value.length <= maxLength) {
      handleOtpChange(index, value);
      if (index < inputRefs.current.length - 1 && value.length >= maxLength) {
        inputRefs.current[index + 1].current?.focus();
      }
    }
  };

  const handleInputKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1].current?.focus();
      }
    }
  };

  return (
    <div id='popupdiv'>
      <div id="popup" className="popup openpopup">
        <h1>OTP <br /> VERIFICATION</h1>
        <h3>Check your Email for OPT</h3>

        <form onSubmit={handleOtpSubmit}>
          <div id="otpInput">
            <h3>Enter Your OTP</h3>
            {otp.map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleInputKeyDown(index, e)}
                maxLength={1}
                ref={inputRefs.current[index]}
                style={{ marginRight: index < otp.length - 1 ? '5px' : 0 }}
              />
            ))}
          </div>
          <button type="submit"  id="otpButton">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
