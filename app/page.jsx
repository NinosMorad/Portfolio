import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

// components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <section className="min-h-full w-full overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24 py-8 gap-8">
          
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none w-full xl:w-auto">
            <span className="text-lg md:text-xl">
              Software Developer
            </span>

            <h1 className="h1 mb-6 text-4xl md:text-5xl xl:text-6xl">
              Hello I'm <br />
              <span className="text-[#00ff99]">
                Ninos Morad
              </span>
            </h1>

            <p className="max-w-[500px] mx-auto xl:mx-0 mb-9 text-white/80 text-sm md:text-base">
              I excel at crafting elegant digital experiences and I am
              proficient in various programming languages and technologies.
            </p>

            {/* button and socials */}
            <div className="flex flex-col md:flex-row items-center justify-center xl:justify-start gap-6 md:gap-8">
              
              <a href="/assets/CV-NinosMorad-2025.pdf" download>
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>

              <div>
                <Social
                  containerStyles="flex gap-4 md:gap-6"
                  iconStyles="w-9 h-9 border border-[#00ff99] rounded-full flex justify-center items-center text-[#00ff99] text-base hover:bg-[#00ff99] hover:text-[#1c1c22] hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-4 xl:mb-0 max-w-full">
            <Photo />
          </div>
        </div>
      </div>

      <Stats />
    </section>
  );
};

export default Home;