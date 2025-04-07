import Carousel from "@/components/my-components/home/Carousel";
import FirstInfoSection from "@/components/my-components/home/FirstInfoSection";
import HomeNewsletter from "@/components/my-components/home/HomeNewsletter";
import HomeTestimonials from "@/components/my-components/home/HomeTestimonials";
import SecondInfoSection from "@/components/my-components/home/SecondInfoSection";
import ThirdInfoSection from "@/components/my-components/home/ThirdInfoSection";



export default function Home() {
  return (
    <div>
      <Carousel />
      <FirstInfoSection />
      <SecondInfoSection />
      <ThirdInfoSection />
      <HomeTestimonials />
      <HomeNewsletter />
    </div>
  );
}
