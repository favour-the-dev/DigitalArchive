import Hero from "@/app/components/index/Hero";
import Features from "@/app/components/index/Features";
import UserRoles from "@/app/components/index/UserRoles";
import Banner from "@/app/components/index/Banner";
function HomePage() {
  return (
    <section className="w-full pt-5">
      <Hero />
      <Features />
      <UserRoles />
      <Banner />
    </section>
  );
}

export default HomePage;
