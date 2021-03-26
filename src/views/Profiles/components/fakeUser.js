import erwinProfile from 'assets/img/faces/erwinProfile.jpg';

const user = {
  id: 1933,
  img: erwinProfile,
  social: {
    fb: 'https://www.facebook.com/elgatoylacaja/',
    ig: 'https://www.instagram.com/elgatoylacaja/?hl=en',
    tw:
      'https://twitter.com/ElGatoyLaCaja?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
  },
  name: 'Erwin Rudolf Josef Alexander Schrödinger',
  role: 'teacher',
  bio: `Erwin Rudolf Josef Alexander Schrödinger (UK: /ˈʃrɜːdɪŋər/, US: /ˈʃroʊ-, ˈʃreɪ-/;[3] German: [ˈɛɐ̯viːn ˈʃʁøːdɪŋɐ]; 12 August 1887 – 4 January 1961), sometimes written as Erwin Schrodinger or Erwin Schroedinger, was a Nobel Prize-winning Austrian-Irish physicist who developed a number of fundamental results in quantum theory: the Schrödinger equation provides a way to calculate the wave function of a system and how it changes dynamically in time. In addition, he was the author of many works on various aspects of physics: statistical mechanics and thermodynamics, physics of dielectrics, colour theory, electrodynamics, general relativity, and cosmology, and he made several attempts to construct a unified field theory. In his book What Is Life? Schrödinger addressed the problems of genetics, looking at the phenomenon of life from the point of view of physics. He paid great attention to the philosophical aspects of science, ancient and oriental philosophical concepts, ethics, and religion. He also wrote on philosophy and theoretical biology. He is also known for his "Schrödinger's cat" thought experiment.`,
  activity: [
    {
      id: 1,
      action: `Has desaprobado el curso de Termodinamica I`,
      type: 'warning',
    },
    {
      id: 2,
      action: `Has sido enrolado en Statistical Thermodynamics`,
      type: 'info',
    },
    { id: 3, action: `Has aprobado Teoria de Cuerdas I`, type: 'success' },
    {
      id: 4,
      action: `Te has inscripto en Statistical Thermodynamics`,
      type: 'info',
    },
    {
      id: 5,
      action: `El curso Space-Time Structure ha cerrado`,
      type: 'error',
    },
    { id: 6, action: `Te has registrado correctamente`, type: 'success' },
  ],
  courses: [
    { id: 1, title: `The interpretation of Quantum Mechanics` },
    { id: 2, title: `Statistical Thermodynamics` },
    { id: 3, title: `Expanding Universes` },
    { id: 4, title: `My View of the World` },
    { id: 5, title: `Space-Time Structure` },
    { id: 6, title: `What Is Life? & Mind and Matter` },
  ],
  favourites: [
    { id: 1, title: `Quantisierung als Eigenwertproblem` },
    { id: 2, title: `Schrödinger's equation ` },
    { id: 3, title: `Lehre von der strahlenden Energie` },
    {
      id: 4,
      title: `Grundlinien einer Theorie der Farbenmetrik im Tagessehen`,
    },
    { id: 5, title: `Theorie der Pigmente von größter Leuchtkraft` },
    { id: 6, title: `Handbook of Electricity and Magnetism` },
  ],
  teacherIn: [
    { id: 1, title: 'Indian influences on Quantum Dynamics' },
    { id: 2, title: 'Erwin Schrödinger and the Quantum Revolution' },
    { id: 3, title: 'Searching for the Man Behind the Cat' },
    { id: 4, title: 'Models and Modelers of Hydrogen' },
    { id: 5, title: 'Zur kinetischen Theorie des Magnetismus' },
    {
      id: 6,
      title: 'Notiz über die Theorie der anomalen elektrischen Dispersion',
    },
  ],
};

export default user;
