import { v4 as uuid } from 'uuid';

import profile1 from 'assets/img/faces/christian.jpg';
import profile2 from 'assets/img/faces/kendall.jpg';
import profile3 from 'assets/img/faces/marc.jpg';

import quiz1 from 'assets/img/quiz/quiz1.jpg';
import quiz2 from 'assets/img/quiz/quiz2.jpg';
import quiz3 from 'assets/img/quiz/quiz3.jpg';
import quiz4 from 'assets/img/quiz/quiz4.jpg';

const data = [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description:
      'El gato de Schrödinger es un experimento mental, a veces descrito como una paradoja, ideado por el físico austriaco-irlandés Erwin Schrödinger en 1935,​ durante el curso de discusiones con Albert Einstein. ​ Ilustra lo que él vio como el problema de la interpretación de Copenhague de la mecánica cuántica.',
    schoolName: 'U. of Munich',
    subjectName: 'Fisica Cuantica I',
    media: quiz1,
    quizName: 'Los gatos y la fisica Cuantica',
    totalStudents: '4242',
    tags: ['Matematica', 'Fisica', 'Quimica', 'Cuantica', 'Gatos'],
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description:
      'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    schoolName: 'Colegio San Jose',
    subjectName: 'Fisica 1°B',
    media: quiz2,
    quizName: 'Fisica 2ndo parcial',
    totalStudents: '625',
    tags: ['Informatica', 'Programacion'],
  },
  {
    id: uuid(),
    createdAt: '03/04/2019',
    description:
      'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    schoolName: 'UTN FRTDF',
    subjectName: 'Quimica Organica',
    media: quiz3,
    quizName: 'Practica Qca. Organica II',
    totalStudents: '857',
    tags: ['Etica', 'Derecho', 'Economia'],
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description:
      'Lyft is an on-demand transportation company based in San Francisco, California.',
    schoolName: 'UNTDF',
    subjectName: 'Estadistica y Administracion',
    media: quiz4,
    quizName: 'Estadistica examen',
    totalStudents: '406',
    tags: ['Matematica', 'Fisica', 'Quimica', 'Administracion'],
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description:
      'GitHub is a web-based hosting service for version control of code using Git.',
    schoolName: 'UTNLP',
    subjectName: 'Analisis Mametico II',
    media: profile3,
    quizName: 'Integracion 2nda parte',
    totalStudents: '835',
    tags: ['Etica', 'Derecho', 'Economia'],
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description:
      'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    schoolName: 'some school',
    subjectName: 'some subject',
    media: profile2,
    quizName: 'Born-Habber',
    totalStudents: '835',
    tags: ['Informatica', 'Programacion'],
  },
];

export default data;
