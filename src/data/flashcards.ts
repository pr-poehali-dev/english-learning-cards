export interface Flashcard {
  id: number;
  word: string;
  translation: string;
  pronunciation: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  example: string;
  exampleTranslation: string;
  difficulty: number;
  learned: boolean;
  reviewDate?: Date;
}

export const flashcardsData: Flashcard[] = [
  // Beginner - Basic Vocabulary
  {
    id: 1,
    word: 'Hello',
    translation: 'Привет',
    pronunciation: '/həˈloʊ/',
    category: 'Greetings',
    level: 'beginner',
    example: 'Hello, how are you?',
    exampleTranslation: 'Привет, как дела?',
    difficulty: 1,
    learned: false
  },
  {
    id: 2,
    word: 'Thank you',
    translation: 'Спасибо',
    pronunciation: '/θæŋk juː/',
    category: 'Greetings',
    level: 'beginner',
    example: 'Thank you for your help',
    exampleTranslation: 'Спасибо за помощь',
    difficulty: 1,
    learned: false
  },
  {
    id: 3,
    word: 'Water',
    translation: 'Вода',
    pronunciation: '/ˈwɔːtər/',
    category: 'Food & Drink',
    level: 'beginner',
    example: 'I drink water every day',
    exampleTranslation: 'Я пью воду каждый день',
    difficulty: 1,
    learned: false
  },
  {
    id: 4,
    word: 'Book',
    translation: 'Книга',
    pronunciation: '/bʊk/',
    category: 'Objects',
    level: 'beginner',
    example: 'I read a book',
    exampleTranslation: 'Я читаю книгу',
    difficulty: 1,
    learned: false
  },
  {
    id: 5,
    word: 'House',
    translation: 'Дом',
    pronunciation: '/haʊs/',
    category: 'Places',
    level: 'beginner',
    example: 'This is my house',
    exampleTranslation: 'Это мой дом',
    difficulty: 1,
    learned: false
  },

  // Intermediate - Everyday Situations
  {
    id: 6,
    word: 'Schedule',
    translation: 'Расписание',
    pronunciation: '/ˈʃedʒuːl/',
    category: 'Time',
    level: 'intermediate',
    example: 'What\'s your schedule today?',
    exampleTranslation: 'Какое у тебя расписание сегодня?',
    difficulty: 2,
    learned: false
  },
  {
    id: 7,
    word: 'Opportunity',
    translation: 'Возможность',
    pronunciation: '/ˌɑːpərˈtuːnəti/',
    category: 'Business',
    level: 'intermediate',
    example: 'This is a great opportunity',
    exampleTranslation: 'Это отличная возможность',
    difficulty: 2,
    learned: false
  },
  {
    id: 8,
    word: 'Environment',
    translation: 'Окружающая среда',
    pronunciation: '/ɪnˈvaɪrənmənt/',
    category: 'Nature',
    level: 'intermediate',
    example: 'We must protect the environment',
    exampleTranslation: 'Мы должны защищать окружающую среду',
    difficulty: 2,
    learned: false
  },
  {
    id: 9,
    word: 'Experience',
    translation: 'Опыт',
    pronunciation: '/ɪkˈspɪriəns/',
    category: 'Skills',
    level: 'intermediate',
    example: 'I have experience in this field',
    exampleTranslation: 'У меня есть опыт в этой области',
    difficulty: 2,
    learned: false
  },
  {
    id: 10,
    word: 'Necessary',
    translation: 'Необходимый',
    pronunciation: '/ˈnesəseri/',
    category: 'Adjectives',
    level: 'intermediate',
    example: 'It\'s necessary to study',
    exampleTranslation: 'Необходимо учиться',
    difficulty: 2,
    learned: false
  },

  // Advanced - Complex Concepts
  {
    id: 11,
    word: 'Phenomenon',
    translation: 'Явление',
    pronunciation: '/fɪˈnɑːmɪnən/',
    category: 'Science',
    level: 'advanced',
    example: 'This is a rare phenomenon',
    exampleTranslation: 'Это редкое явление',
    difficulty: 3,
    learned: false
  },
  {
    id: 12,
    word: 'Sophisticated',
    translation: 'Сложный, изощренный',
    pronunciation: '/səˈfɪstɪkeɪtɪd/',
    category: 'Adjectives',
    level: 'advanced',
    example: 'She has sophisticated taste',
    exampleTranslation: 'У неё изощренный вкус',
    difficulty: 3,
    learned: false
  },
  {
    id: 13,
    word: 'Unprecedented',
    translation: 'Беспрецедентный',
    pronunciation: '/ʌnˈpresɪdentɪd/',
    category: 'Adjectives',
    level: 'advanced',
    example: 'This situation is unprecedented',
    exampleTranslation: 'Эта ситуация беспрецедентна',
    difficulty: 3,
    learned: false
  },
  {
    id: 14,
    word: 'Ambiguous',
    translation: 'Двусмысленный',
    pronunciation: '/æmˈbɪɡjuəs/',
    category: 'Adjectives',
    level: 'advanced',
    example: 'The statement was ambiguous',
    exampleTranslation: 'Заявление было двусмысленным',
    difficulty: 3,
    learned: false
  },
  {
    id: 15,
    word: 'Endeavor',
    translation: 'Стремление, попытка',
    pronunciation: '/ɪnˈdevər/',
    category: 'Actions',
    level: 'advanced',
    example: 'We will endeavor to succeed',
    exampleTranslation: 'Мы будем стремиться к успеху',
    difficulty: 3,
    learned: false
  },

  // More beginner words
  {
    id: 16,
    word: 'Cat',
    translation: 'Кот',
    pronunciation: '/kæt/',
    category: 'Animals',
    level: 'beginner',
    example: 'I have a cat',
    exampleTranslation: 'У меня есть кот',
    difficulty: 1,
    learned: false
  },
  {
    id: 17,
    word: 'Dog',
    translation: 'Собака',
    pronunciation: '/dɔːɡ/',
    category: 'Animals',
    level: 'beginner',
    example: 'The dog is running',
    exampleTranslation: 'Собака бежит',
    difficulty: 1,
    learned: false
  },
  {
    id: 18,
    word: 'Apple',
    translation: 'Яблоко',
    pronunciation: '/ˈæpl/',
    category: 'Food & Drink',
    level: 'beginner',
    example: 'I eat an apple',
    exampleTranslation: 'Я ем яблоко',
    difficulty: 1,
    learned: false
  },
  {
    id: 19,
    word: 'Red',
    translation: 'Красный',
    pronunciation: '/red/',
    category: 'Colors',
    level: 'beginner',
    example: 'The apple is red',
    exampleTranslation: 'Яблоко красное',
    difficulty: 1,
    learned: false
  },
  {
    id: 20,
    word: 'Blue',
    translation: 'Синий',
    pronunciation: '/bluː/',
    category: 'Colors',
    level: 'beginner',
    example: 'The sky is blue',
    exampleTranslation: 'Небо синее',
    difficulty: 1,
    learned: false
  }
];

export const categories = [
  'All',
  'Greetings',
  'Food & Drink',
  'Objects',
  'Places',
  'Time',
  'Business',
  'Nature',
  'Skills',
  'Adjectives',
  'Science',
  'Actions',
  'Animals',
  'Colors'
];

export const levels = ['all', 'beginner', 'intermediate', 'advanced'] as const;

export const generateRandomCard = (): Flashcard => {
  const randomWords = [
    { word: 'Adventure', translation: 'Приключение', category: 'Actions', level: 'intermediate' as const },
    { word: 'Beautiful', translation: 'Красивый', category: 'Adjectives', level: 'beginner' as const },
    { word: 'Challenge', translation: 'Вызов', category: 'Actions', level: 'intermediate' as const },
    { word: 'Delicious', translation: 'Вкусный', category: 'Food & Drink', level: 'beginner' as const },
    { word: 'Excellent', translation: 'Отличный', category: 'Adjectives', level: 'intermediate' as const },
    { word: 'Freedom', translation: 'Свобода', category: 'Abstract', level: 'intermediate' as const },
    { word: 'Generous', translation: 'Щедрый', category: 'Adjectives', level: 'intermediate' as const },
    { word: 'Happiness', translation: 'Счастье', category: 'Emotions', level: 'beginner' as const },
    { word: 'Incredible', translation: 'Невероятный', category: 'Adjectives', level: 'advanced' as const },
    { word: 'Journey', translation: 'Путешествие', category: 'Actions', level: 'intermediate' as const }
  ];

  const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
  const newId = Math.max(...flashcardsData.map(card => card.id)) + Math.floor(Math.random() * 1000);

  return {
    id: newId,
    word: randomWord.word,
    translation: randomWord.translation,
    pronunciation: `/${randomWord.word.toLowerCase()}/`,
    category: randomWord.category,
    level: randomWord.level,
    example: `This is an example with ${randomWord.word}`,
    exampleTranslation: `Это пример с ${randomWord.translation}`,
    difficulty: randomWord.level === 'beginner' ? 1 : randomWord.level === 'intermediate' ? 2 : 3,
    learned: false
  };
};