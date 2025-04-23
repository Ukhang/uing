import Link from "next/link";
import Image from "next/image";
import MacModalSection from "./components/macmodal-section";
import MagneticButtonSection from "./components/magneticbutton-section";
import TextRevealSection from "./components/textreveal-section";

export default function Home() {
  return (
    <div className="max-w-2xl lg:max-w-3xl w-full mx-auto">
      <section className="flex flex-col gap-4 px-4">
        <h1 className="text-xl leading-normal md:text-2xl md:leading-[52px] text-custom-foreground md:mt-[80px] lg:mt-[150px] mt-18 text-left justify-start font-medium text-custom-primary">
          Copy and use beautifully animated React components :)
        </h1>
        <p className="text-custom-primary max-w-[480px] text-base w-full">
          Fluid, natural animations with Framer Motion and Tailwind CSS for
          exceptional user experiences.
        </p>
        <div className="flex gap-2 items-center justify-start">
          <Image
            src="/ukhang.png"
            alt="ukhang"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="text-sm">
            <span className="text-muted-foreground">by</span>{" "}
            <Link
              href="https://ukhangmarma.vercel.app"
              target="_blank"
              className="text-custom-primary"
            >
              Ukhang Marma
            </Link>
          </div>
        </div>
      </section>

      <MagneticButtonSection />
      <MacModalSection />
      <TextRevealSection />
    </div>
  );
}
