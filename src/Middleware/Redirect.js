import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const [Count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    Count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [Count, navigate]);
  return (
    <div className="check-role">
      ທ່ານບໍ່ສິດເຂົ້າເຖິງຂໍ້ມູນສ່ວນນີ້ {Count} ວິນາທີ !!!
    </div>
  );
};

export default Redirect;
