import React from "react";

const CircularProgressBar = ({
  percentage,
  radiusInput = 45,
  strokeInput = 10,
  size = 250, // Size of the container and SVG
  showtext = true,
  title
}) => {
  const radius = radiusInput; // Radius of the circle
  const strokeWidth = strokeInput; // Width of the stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (percentage / 100) * circumference; // Offset for progress
  console.log('Percentage',percentage);
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="circular-progress-bar"
      >
        {/* Background circle */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth={strokeWidth}
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
        ></circle>

        {/* Progress circle */}
        <circle
          className="text-indigo-500 stroke-current"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        ></circle>

        {/* Center text */}
        {
          showtext && <text
            x="50"
            y="50"
            fontFamily="Verdana"
            fontSize="13"
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            className="circletext"
          >

            {percentage}%


          </text>
        }

      </svg>
    </div>
  );
};

export default CircularProgressBar;
