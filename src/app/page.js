import Banner from "@/components/Banner";

import SuccessStories from "@/components/SuccessStories";
import WhyAdopt from "@/components/WhyAdopt";
import DashboardPage from "./(main)/allPets/page";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      
     <WhyAdopt></WhyAdopt>
     <DashboardPage></DashboardPage>
     <SuccessStories></SuccessStories>
    </div>
  );
}