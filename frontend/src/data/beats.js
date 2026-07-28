const LICENSE_TIERS = [
  {
    id: 'mp3',
    name: 'MP3 Lease',
    description: 'Tagged MP3 for non-profit use. 50k stream cap.',
    multiplier: 1,
  },
  {
    id: 'wav',
    name: 'WAV Lease',
    description: 'Untagged WAV. 150k stream cap. Music videos allowed.',
    multiplier: 2,
  },
  {
    id: 'exclusive',
    name: 'Exclusive',
    description: 'Full ownership. Beat removed from store after purchase.',
    multiplier: 15,
  },
];

const withDefaults = (beat) => {
  const basePrice = parseFloat(beat.price);
  return {
    ...beat,
    bpm: beat.bpm ?? null,
    key: beat.key ?? null,
    genre: beat.genre ?? 'Hip Hop',
    mood: beat.mood ?? null,
    tags: beat.tags ?? [],
    description:
      beat.description ??
      'A hard-hitting instrumental built for vocals. Full metadata coming soon.',
    licenses: LICENSE_TIERS.map((tier) => ({
      ...tier,
      price: (basePrice * tier.multiplier).toFixed(2),
    })),
  };
};

export const featuredBeats = [
  withDefaults({
    id: 1,
    title: 'Faded',
    artist: '2Dan',
    price: '12.99',
    audioUrl: 'https://audio.jukehost.co.uk/GqMYrYDrkvgtYMYcZiB1TbDiHJQv5UjC',
    image: '/images/fadedcover.png',
    bpm: 135,
    key: 'G min',
    mood: 'Melodic',
    tags: ['melodic', 'emotional'],
  }),
  withDefaults({
    id: 2,
    title: 'My Own',
    artist: '2Dan',
    price: '12.99',
    audioUrl: 'https://audio.jukehost.co.uk/zlwgIStvlr2UQhh5VXLMI90AKVfoOB9s',
    image: '/images/mycover.png',
    bpm: 113,
    key: 'E min',
    mood: 'Dark',
    tags: ['dark', 'trap'],
  }),
  withDefaults({
    id: 3,
    title: 'We Did It',
    artist: '2Dan',
    price: '12.99',
    audioUrl: 'https://audio.jukehost.co.uk/CZ0FMCkAyI4wUA0NJfSqDS43wDf9k5hF',
    image: '/images/wedicover.png',
    bpm: 133,
    mood: 'Energetic',
    tags: ['energetic', 'bounce'],
  }),
];

export const browseBeats = [
  withDefaults({ id: 4, title: 'We Got Sticks', artist: '2Dan', price: '19.99', audioUrl: 'https://audio.jukehost.co.uk/6LzGulHOSmVc6cxam0tYAFNdC36O1X8G', image: '/images/WegotCov.png', bpm: 146, key: 'G# min', mood: 'Aggressive', tags: ['hard', 'drill'] }),
  withDefaults({ id: 5, title: 'Check Us', artist: '2Dan', price: '14.99', audioUrl: 'https://audio.jukehost.co.uk/pFjA7xm8YGg10a7AyLTqcwMaY9KuTgTf', image: '/images/Checkuscov.png', bpm: 133, key: 'G min', mood: 'Bouncy', tags: ['bounce', 'club'] }),
  withDefaults({ id: 6, title: 'Cant Go Without It', artist: '2Dan', price: '14.99', audioUrl: 'https://audio.jukehost.co.uk/48JxHX6NgvLqEUstRuGDfig4lxF3BxE3', image: '/images/cantgowicov.png', bpm: 142, key: 'G min', mood: 'Smooth', tags: ['r&b', 'smooth'] }),
  withDefaults({ id: 7, title: 'Fresh', artist: '2Dan', price: '12.99', audioUrl: 'https://audio.jukehost.co.uk/JK5mI4S0Py8M8WTf3cKVstdiYxSzsJ9j', image: '/images/freshcov.png', bpm: 140, key: 'E min', mood: 'Upbeat', tags: ['upbeat', 'summer'] }),
  withDefaults({ id: 8, title: 'Licks', artist: '2Dan', price: '10.99', audioUrl: 'https://audio.jukehost.co.uk/uvEj3f77CnUGbeudybgOZ1UiYiRJQHHE', image: '/images/lickscov.png', bpm: 143, key: 'D# min', mood: 'Gritty', tags: ['gritty', 'street'] }),
];

export const allBeats = [...featuredBeats, ...browseBeats];

export const getBeatById = (id) =>
  allBeats.find((beat) => beat.id === Number(id));

export const getRelatedBeats = (beat, limit = 3) =>
  allBeats
    .filter((b) => b.id !== beat.id)
    .sort((a, b) => {
      const aMatch = a.genre === beat.genre || a.mood === beat.mood ? 1 : 0;
      const bMatch = b.genre === beat.genre || b.mood === beat.mood ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, limit);
