const CardCustom = ({ bgColor, iconColor, icon, title, description, link }) => {
  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col justify-between w-full h-full p-5 overflow-hidden bg-white rounded-2xl" style={{ boxShadow: `0 1px 4px rgba(0, 0, 0, 0.2)` }}>
        <div>
          <div className="flex items-center mb-4">
            <div
              className="w-[40px] h-[40px] rounded-2xl absolute -top-5 left-1/2 transform -translate-x-1/2 z-5 flex justify-center items-center"
              style={{ backgroundColor: bgColor }}
            >
              {icon}
            </div>
            <h2 className="font-bold text-pdarkblue text-[12px] mt-2 text-center">
              {title}
            </h2>
          </div>
          <p className="text-[#5A5858] text-[12px] text-justify mb-4 font-assistant">
            {description}
          </p>
        </div>
        <a target="_blank" href={link} className="text-porange font-bold underline text-[12px]">
          Selengkapnya
        </a>
      </div>
    </div>
  );
};

export default CardCustom;
