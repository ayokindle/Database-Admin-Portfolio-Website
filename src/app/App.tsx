import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Profile } from "./components/Profile";
import { Services } from "./components/Services";
import { Deployments } from "./components/Deployments";
import { Log } from "./components/Log";
import { Playground } from "./components/Playground";
import { Connect } from "./components/Connect";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Profile />
      <Services />
      <Deployments />
      <Log />
      <Playground />
      <Connect />
      <Footer />
    </div>
  );
}
