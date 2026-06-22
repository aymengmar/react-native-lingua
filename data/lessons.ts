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
