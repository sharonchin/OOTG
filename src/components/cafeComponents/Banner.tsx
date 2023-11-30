import Image from "next/image";
import UMS from "../../public/assets/UMS.png";

export default function Banner() {
  return (
    <div className="pt-20 pl-10 bg-[#C2D7F3] w-full h-20">
      <div style={{ height: "100%", width: "100%" }}>
        <Image src={UMS} alt={"UMS"} objectFit="cover" />
      </div>
    </div>
  );
}
