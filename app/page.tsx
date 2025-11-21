import Heropage from "./components/heropage";
import Skillspage from "./components/skillspage";
import Educationpage from "./components/educationpage";
import Experiencepage from "./components/experiencepage";
import Projectspage from "./components/projectspage";
import Contactmepage from "./components/contactmepage";
import Footer from "./components/footer";
import DockNav from "./components/doc-nav";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="flex-1">
        <section id="home">
          <Heropage />
        </section>
        <section id="skills">
          <Skillspage />
        </section>
        <section id="education">
          <Educationpage />
        </section>
        <section id="experience">
          <Experiencepage />
        </section>
        <section id="projects">
          <Projectspage />
        </section>
        <section id="contact">
          <Contactmepage />
        </section>
        <Footer />
      </div>

      {/* Sleek Glass Dock */}
      <DockNav />
    </main>
  );
}
