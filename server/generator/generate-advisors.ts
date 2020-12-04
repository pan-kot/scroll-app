import faker from 'faker';

import { TAdvisorCard } from './types';

function generateAdvisors(n: number): TAdvisorCard[] {
  const advisors = [];

  for (let i = 0; i < n; i += 1) {
    advisors.push(generateOneAdvisor());
  }

  return advisors;
}

function generateOneAdvisor() {
  const id = generateId();
  const name = generateName();
  const contact = generateContact(name);
  const appearance = generateAppearance();
  const presence = generatePresence();
  const features = generateFeatures();
  const feedback = generateFeedback();

  return { id, name, contact, appearance, presence, features, feedback };
}

function generateId() {
  return faker.random.uuid();
}

function generateName() {
  return faker.name.findName();
}

function generateContact(name: string) {
  const email = generateEmail(name);

  return { email };
}

function generateEmail(name: string) {
  const randomEmail = faker.internet.email();
  const [, domain] = randomEmail.split('@');

  return (name.split(' ').join('.') + '@' + domain).toLowerCase();
}

function generateAppearance() {
  const about = faker.lorem.paragraph();
  const avatar = faker.internet.avatar();
  const color = faker.internet.color();

  return { about, avatar, color };
}

function generatePresence() {
  const isOnline = randomInt(1, 10) === 1;

  return { isOnline };
}

function generateFeatures() {
  const languages = generateLanguages();

  return { languages };
}

// Imitating 1 to 3 languages with priority
function generateLanguages() {
  const languages = [
    repeat('EN', 10),
    repeat('DE', 5),
    repeat('ES', 5),
    repeat('FR', 3),
    repeat('IT', 3),
    repeat('RU', 2),
    repeat('AR', 1),
  ].reduce((acc, it) => [...acc, ...it], []);

  function takeRandom() {
    return languages[randomInt(0, languages.length - 1)];
  }

  return unique([takeRandom(), takeRandom(), takeRandom()]).sort();
}

function generateFeedback() {
  const reviews = randomInt(0, 555);

  return { reviews };
}

function randomInt(min: number, max: number) {
  return faker.random.number({ min, max });
}

function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

function repeat<T>(it: T, n: number): T[] {
  return Array(n).fill(it);
}

const data = generateAdvisors(10000);

// tslint:disable-next-line:no-console
console.log(JSON.stringify(data));
