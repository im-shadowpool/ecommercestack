import Carousel from "@/app/components/my-components/home/Carousel";
import FirstInfoSection from "@/app/components/my-components/home/FirstInfoSection";
import HomeNewsletter from "@/app/components/my-components/home/HomeNewsletter";
import HomeTestimonials from "@/app/components/my-components/home/HomeTestimonials";
import SecondInfoSection from "@/app/components/my-components/home/SecondInfoSection";
import ThirdInfoSection from "@/app/components/my-components/home/ThirdInfoSection";

export default function TestingHome(){
  return (
    <div>
      <Carousel />
      <FirstInfoSection />
      <SecondInfoSection />
      <ThirdInfoSection />
      <HomeTestimonials />
      <HomeNewsletter />
    </div>
  )
}