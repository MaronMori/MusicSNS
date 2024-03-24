import Image from "next/image";

export const Logo = () => {
  return (
    <div className={"ml-6 flex"}>
      <Image
        width={300}
        height={300}
        src={"/RhytheMotion-2-removebg.png"}
        alt={"Logo"}
      />
    </div>
  );
};
