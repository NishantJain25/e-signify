import React, { useEffect, useState } from "react";
import "./dropdown.css";

const Dropdown = ({ lineWidth, setLineWidth }) => {
  const items = Array.from({ length: 4 }, (_, i) => ({
    value: 2 ** i,
    label: `${2 ** i}px`,
  }));

  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsDropdownOpen(false);
    });

    return () =>
      document.removeEventListener("click", () => setIsDropdownOpen(false));
  }, []);

  const handleDropdownClick = (value) => {
    setLineWidth(value);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setError(null);
    if (isNaN(e.target.value)) {
      return;
    }
    if (parseInt(e.target.value) > 20) {
      setError("Maximum width is 20");
      return;
    }
    setLineWidth(e.target.value);
  };

  const handleFocus = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(true);
  };

  return (
    <div>
      <p>Line Width</p>
      {error && <p id="error">{error}</p>}
      <div id="input-row">
        <input
          id="input"
          value={lineWidth}
          onChange={handleInputChange}
          onClick={(e) => handleFocus(e)}
        />
        <div
          id="demo-line"
          style={{
            width: "20px",
            height: `${lineWidth}px`,
            backgroundColor: "black",
          }}
        ></div>
        {isDropdownOpen && (
          <div id="options">
            {items.map((item, i) => (
              <div
                className="option"
                key={i}
                style={{
                  backgroundColor: `${
                    item.value === lineWidth ? "rgb(220,220,220)" : "white"
                  }`,
                }}
                onClick={() => handleDropdownClick(item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
