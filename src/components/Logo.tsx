import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo2.png"
      alt="Description"
      width={200}
      height={88}
      style={{ objectFit: "cover" }}
    />
  );
};

export default Logo;
