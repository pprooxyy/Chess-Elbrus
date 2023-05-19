import React from "react";
import "./Button.css";

type ButtonProps = {
  text: string;
  p?: string;
  icon?: string;
  width?: string;
  height?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({
  text,
  icon,
  p,
  width,
  height,
  className,
  onClick,
}: ButtonProps) {
  const buttonStyle = {
    width,
    height,
  };

  const iconStyles = {
    width: 50,
    height: 50,
  };

  return (
    <button
      onClick={onClick}
      className={`button-19 ${className}`}
      style={buttonStyle}
    >
      {icon && <img style={iconStyles} src={icon} alt="icon" />}
      <div className="button-text-wrapper">
        <h2>{text}</h2>
        <p>{p}</p>
      </div>
    </button>
  );
}

export default Button;
