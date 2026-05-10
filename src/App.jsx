import './styles.css'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills, Experience, Education } from './components/SkillsExperienceEducation'
import { Achievements, About, Contact, Footer } from './components/AchievementsAboutContactFooter'

function App() {

  return (
    <div className="App container">
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Achievements />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}


export default App
