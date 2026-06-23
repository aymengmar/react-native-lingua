import type { Lesson } from "@/types/learning";

// Spanish lessons
export const esLesson1: Lesson = {
  id: "es-u1-l1",
  unitId: "es-unit-1",
  order: 1,
  title: "Hello & Goodbye",
  description: "Learn your first Spanish greetings",
  xpReward: 10,
  durationMinutes: 5,
  goal: "Say hello and goodbye confidently in Spanish",
  aiTeacherPrompt:
    "You are a friendly Spanish teacher. Teach the student basic greetings: hola, adiós, buenos días, buenas noches. Use simple examples, repeat each word clearly, and encourage the student warmly.",
  vocabulary: [
    { word: "Hola", translation: "Hello", pronunciation: "OH-lah", example: "Hola, ¿cómo estás?" },
    { word: "Adiós", translation: "Goodbye", pronunciation: "ah-dee-OHS" },
    { word: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nos DEE-as" },
    { word: "Buenas noches", translation: "Good night", pronunciation: "BWEH-nas NOH-ches" },
    { word: "Por favor", translation: "Please", pronunciation: "por fah-VOR" },
    { word: "Gracias", translation: "Thank you", pronunciation: "GRAH-syahs" },
  ],
  phrases: [
    { phrase: "¿Cómo estás?", translation: "How are you?", pronunciation: "KOH-mo es-TAHS", context: "Informal greeting" },
    { phrase: "Estoy bien", translation: "I am fine", pronunciation: "es-TOY bee-EN" },
    { phrase: "Mucho gusto", translation: "Nice to meet you", pronunciation: "MOO-cho GOOS-to" },
  ],
  activities: [
    {
      id: "es-u1-l1-a1",
      type: "translation",
      question: "How do you say 'Hello' in Spanish?",
      answer: "Hola",
      options: ["Hola", "Adiós", "Gracias", "Por favor"],
    },
    {
      id: "es-u1-l1-a2",
      type: "translation",
      question: "What does 'Buenas noches' mean?",
      answer: "Good night",
      options: ["Good morning", "Good night", "Goodbye", "Thank you"],
    },
    {
      id: "es-u1-l1-a3",
      type: "matching",
      question: "Match: Gracias",
      answer: "Thank you",
      options: ["Please", "Hello", "Thank you", "Goodbye"],
    },
  ],
};

export const esLesson2: Lesson = {
  id: "es-u1-l2",
  unitId: "es-unit-1",
  order: 2,
  title: "Numbers 1–10",
  description: "Count to ten in Spanish",
  xpReward: 10,
  durationMinutes: 5,
  goal: "Count from one to ten in Spanish",
  aiTeacherPrompt:
    "You are an enthusiastic Spanish teacher. Teach numbers uno through diez using rhythm and repetition. Count together with the student and use simple practice examples like 'I have two apples'.",
  vocabulary: [
    { word: "Uno", translation: "One", pronunciation: "OO-no" },
    { word: "Dos", translation: "Two", pronunciation: "dos" },
    { word: "Tres", translation: "Three", pronunciation: "tres" },
    { word: "Cuatro", translation: "Four", pronunciation: "KWAH-tro" },
    { word: "Cinco", translation: "Five", pronunciation: "SEEN-ko" },
    { word: "Seis", translation: "Six", pronunciation: "says" },
    { word: "Siete", translation: "Seven", pronunciation: "see-EH-teh" },
    { word: "Ocho", translation: "Eight", pronunciation: "OH-cho" },
    { word: "Nueve", translation: "Nine", pronunciation: "NWEH-beh" },
    { word: "Diez", translation: "Ten", pronunciation: "dee-ES" },
  ],
  phrases: [
    { phrase: "Tengo tres manzanas", translation: "I have three apples", context: "Using numbers in sentences" },
    { phrase: "Son cinco euros", translation: "It is five euros", context: "Prices and amounts" },
  ],
  activities: [
    {
      id: "es-u1-l2-a1",
      type: "translation",
      question: "What is 'Cinco' in English?",
      answer: "Five",
      options: ["Three", "Five", "Seven", "Nine"],
    },
    {
      id: "es-u1-l2-a2",
      type: "translation",
      question: "How do you say 'Eight' in Spanish?",
      answer: "Ocho",
      options: ["Seis", "Ocho", "Nueve", "Diez"],
    },
    {
      id: "es-u1-l2-a3",
      type: "translation",
      question: "What does 'Diez' mean?",
      answer: "Ten",
      options: ["Six", "Eight", "Ten", "Four"],
    },
  ],
};

// French lessons
export const frLesson1: Lesson = {
  id: "fr-u1-l1",
  unitId: "fr-unit-1",
  order: 1,
  title: "Bonjour!",
  description: "Essential French greetings",
  xpReward: 10,
  durationMinutes: 5,
  goal: "Greet someone and introduce yourself in French",
  aiTeacherPrompt:
    "You are a warm French teacher. Teach the student: bonjour, bonsoir, au revoir, merci, s'il vous plaît. Speak clearly, model each phrase, and praise their effort.",
  vocabulary: [
    { word: "Bonjour", translation: "Hello / Good morning", pronunciation: "bon-ZHOOR" },
    { word: "Bonsoir", translation: "Good evening", pronunciation: "bon-SWAHR" },
    { word: "Au revoir", translation: "Goodbye", pronunciation: "oh reh-VWAHR" },
    { word: "Merci", translation: "Thank you", pronunciation: "mehr-SEE" },
    { word: "S'il vous plaît", translation: "Please", pronunciation: "seel voo PLEH" },
    { word: "Oui", translation: "Yes", pronunciation: "wee" },
    { word: "Non", translation: "No", pronunciation: "nohn" },
  ],
  phrases: [
    { phrase: "Comment vous appelez-vous?", translation: "What is your name?", context: "Formal" },
    { phrase: "Je m'appelle Marie", translation: "My name is Marie", context: "Introducing yourself" },
    { phrase: "Enchanté(e)", translation: "Nice to meet you" },
  ],
  activities: [
    {
      id: "fr-u1-l1-a1",
      type: "translation",
      question: "What does 'Bonjour' mean?",
      answer: "Hello / Good morning",
      options: ["Goodbye", "Hello / Good morning", "Thank you", "Please"],
    },
    {
      id: "fr-u1-l1-a2",
      type: "translation",
      question: "How do you say 'Thank you' in French?",
      answer: "Merci",
      options: ["Oui", "Non", "Merci", "Bonsoir"],
    },
    {
      id: "fr-u1-l1-a3",
      type: "matching",
      question: "Match: Au revoir",
      answer: "Goodbye",
      options: ["Yes", "Please", "Goodbye", "Good evening"],
    },
  ],
};

// German lessons
export const deLesson1: Lesson = {
  id: "de-u1-l1",
  unitId: "de-unit-1",
  order: 1,
  title: "Hallo! Greetings",
  description: "Learn your first German greetings",
  xpReward: 10,
  durationMinutes: 5,
  goal: "Say hello and thank you confidently in German",
  aiTeacherPrompt:
    "You are a friendly German teacher. Teach the student basic greetings: Hallo, Tschüss, Guten Morgen, Guten Abend, Danke, Bitte. Use simple examples and encourage the student warmly.",
  vocabulary: [
    { word: "Hallo", translation: "Hello", pronunciation: "HA-lo" },
    { word: "Tschüss", translation: "Goodbye", pronunciation: "CHOOS" },
    { word: "Guten Morgen", translation: "Good morning", pronunciation: "GOO-ten MOR-gen" },
    { word: "Guten Abend", translation: "Good evening", pronunciation: "GOO-ten AH-bend" },
    { word: "Danke", translation: "Thank you", pronunciation: "DAHN-keh" },
    { word: "Bitte", translation: "Please / You're welcome", pronunciation: "BIT-teh" },
  ],
  phrases: [
    { phrase: "Wie heißt du?", translation: "What is your name?", context: "Informal" },
    { phrase: "Ich heiße Max", translation: "My name is Max", context: "Introducing yourself" },
    { phrase: "Freut mich", translation: "Nice to meet you" },
  ],
  activities: [
    {
      id: "de-u1-l1-a1",
      type: "translation",
      question: "What does 'Hallo' mean?",
      answer: "Hello",
      options: ["Goodbye", "Hello", "Thank you", "Please"],
    },
    {
      id: "de-u1-l1-a2",
      type: "translation",
      question: "How do you say 'Thank you' in German?",
      answer: "Danke",
      options: ["Bitte", "Hallo", "Danke", "Tschüss"],
    },
    {
      id: "de-u1-l1-a3",
      type: "matching",
      question: "Match: Tschüss",
      answer: "Goodbye",
      options: ["Hello", "Please", "Good morning", "Goodbye"],
    },
  ],
};

// Portuguese lessons
export const ptLesson1: Lesson = {
  id: "pt-u1-l1",
  unitId: "pt-unit-1",
  order: 1,
  title: "Olá! Greetings",
  description: "Learn your first Portuguese greetings",
  xpReward: 10,
  durationMinutes: 5,
  goal: "Say hello and thank you confidently in Portuguese",
  aiTeacherPrompt:
    "You are a warm Portuguese teacher. Teach the student: Olá, Tchau, Bom dia, Boa noite, Obrigado, Por favor. Speak clearly, model each phrase, and praise their effort.",
  vocabulary: [
    { word: "Olá", translation: "Hello", pronunciation: "oh-LAH" },
    { word: "Tchau", translation: "Goodbye", pronunciation: "CHOW" },
    { word: "Bom dia", translation: "Good morning", pronunciation: "bom JEE-ah" },
    { word: "Boa noite", translation: "Good night", pronunciation: "BOH-ah NOY-cheh" },
    { word: "Obrigado", translation: "Thank you (m)", pronunciation: "oh-bree-GAH-doo" },
    { word: "Por favor", translation: "Please", pronunciation: "por fah-VOR" },
    { word: "Sim", translation: "Yes", pronunciation: "seem" },
    { word: "Não", translation: "No", pronunciation: "NOW" },
  ],
  phrases: [
    { phrase: "Como você se chama?", translation: "What is your name?", context: "Informal" },
    { phrase: "Meu nome é Ana", translation: "My name is Ana", context: "Introducing yourself" },
    { phrase: "Muito prazer", translation: "Nice to meet you" },
  ],
  activities: [
    {
      id: "pt-u1-l1-a1",
      type: "translation",
      question: "What does 'Olá' mean?",
      answer: "Hello",
      options: ["Goodbye", "Hello", "Thank you", "Please"],
    },
    {
      id: "pt-u1-l1-a2",
      type: "translation",
      question: "How do you say 'Thank you' in Portuguese?",
      answer: "Obrigado",
      options: ["Por favor", "Olá", "Obrigado", "Tchau"],
    },
    {
      id: "pt-u1-l1-a3",
      type: "matching",
      question: "Match: Bom dia",
      answer: "Good morning",
      options: ["Good night", "Good morning", "Goodbye", "Hello"],
    },
  ],
};

// Japanese lessons
export const jaLesson1: Lesson = {
  id: "ja-u1-l1",
  unitId: "ja-unit-1",
  order: 1,
  title: "Konnichiwa!",
  description: "Your first Japanese greetings",
  xpReward: 10,
  durationMinutes: 6,
  goal: "Greet someone and say thank you in Japanese",
  aiTeacherPrompt:
    "You are a patient Japanese teacher. Teach: konnichiwa, ohayou, sayonara, arigatou, hai, iie. Explain that Japanese has different levels of politeness and keep the lesson friendly and simple for an absolute beginner.",
  vocabulary: [
    { word: "こんにちは", translation: "Hello", pronunciation: "kon-ni-chi-WA" },
    { word: "おはよう", translation: "Good morning", pronunciation: "o-ha-YO" },
    { word: "さようなら", translation: "Goodbye", pronunciation: "sa-yo-NA-ra" },
    { word: "ありがとう", translation: "Thank you", pronunciation: "a-ri-ga-TO" },
    { word: "はい", translation: "Yes", pronunciation: "hai" },
    { word: "いいえ", translation: "No", pronunciation: "ii-e" },
  ],
  phrases: [
    { phrase: "はじめまして", translation: "Nice to meet you", pronunciation: "ha-ji-me-MA-shi-te" },
    { phrase: "おなまえは？", translation: "What is your name?", context: "Informal" },
    { phrase: "わたしは___です", translation: "I am ___", context: "Introducing yourself" },
  ],
  activities: [
    {
      id: "ja-u1-l1-a1",
      type: "translation",
      question: "What does 'こんにちは' mean?",
      answer: "Hello",
      options: ["Goodbye", "Thank you", "Hello", "Yes"],
    },
    {
      id: "ja-u1-l1-a2",
      type: "translation",
      question: "How do you say 'Thank you' in Japanese?",
      answer: "ありがとう",
      options: ["はい", "いいえ", "ありがとう", "おはよう"],
    },
    {
      id: "ja-u1-l1-a3",
      type: "matching",
      question: "Match: さようなら",
      answer: "Goodbye",
      options: ["Yes", "Good morning", "Goodbye", "No"],
    },
  ],
};
