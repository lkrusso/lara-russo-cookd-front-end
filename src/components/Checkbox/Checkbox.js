import "./Checkbox.scss";
import { useState } from "react";

function Checkbox({ type, id, name, checkedStatus, className }) {
  const [isChecked, setIsChecked] = useState(checkedStatus);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <input
      type={type}
      id={id}
      name={name}
      checked={isChecked}
      className={className}
      onChange={handleCheckboxClick}
    />
  );
}

export default Checkbox;
