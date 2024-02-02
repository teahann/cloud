declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}

interface Command {
  id: number;
  name: string;
  url: string;
  show: boolean;
}

interface Compound {
  id: number;
  pid: number;
  name: string;
  url: string;
  category: string;
}

interface Celestial {
  id: number;
  its_id?: string;
  name: string;
  region: string;
  about: string;
  photo?: string;
  url: string;
  sun_au: number;
  sidereal_orbit: number;
}

interface Greeting {
  id: number;
  greeting: string;
  language: string;
}

interface Image {
  id: number;
  filename: string;
  name: string;
  ext: string;
  x: number;
  y: number;
  show: boolean;
}

interface Job {
  id: number;
  name: string;
  salary: number;
  training: string;
}

interface Language {
  id: number;
  name: string;
  category: string;
  note: string;
  year: number;
  url: string;
}