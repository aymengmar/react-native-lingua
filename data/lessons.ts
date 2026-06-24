import type { Lesson } from "@/types/learning";

// ─── Spanish ──────────────────────────────────────────────────────────────────

export const esLesson1: Lesson = {
  id: "es-u1-l1",
  unitId: "es-unit-1",
  order: 1,
  title: "Greetings & Introductions",
  description: "Learn your first Spanish greetings",
  xpReward: 10,
  durationMinutes: 5,
  imageUrl: "https://picsum.photos/seed/greet/300/200",
  goal: "Say hello and goodbye confidently in Spanish",
  aiTeacherPrompt:
    "You're a cheerful Spanish tutor opening a student's very first Spanish lesson. Start with the most important word — hola means hello — say it slowly and invite them to try. Introduce each greeting one at a time: say the Spanish word, give the English meaning, add a pronunciation tip, then wait for the student to repeat before moving on. Use short natural sentences with contractions, react warmly to what they actually say, and never move to the next word until they've had a chance to try the current one.",
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
  title: "Daily Life",
  description: "Essential words for everyday situations",
  xpReward: 10,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/daily/300/200",
  goal: "Describe your daily routine in Spanish",
  aiTeacherPrompt:
    "You're a friendly Spanish teacher helping a student describe their everyday routine for the first time. Lead with casa — home — and put it in a short sentence: 'I go home — voy a casa — can you say casa?' Teach each word one at a time, waiting for the student to say it back before you introduce the next one. Keep replies short and natural, use contractions, and react specifically to what the student actually says.",
  vocabulary: [
    { word: "Casa", translation: "Home", pronunciation: "KAH-sah" },
    { word: "Trabajo", translation: "Work", pronunciation: "trah-BAH-ho" },
    { word: "Comer", translation: "To eat", pronunciation: "koh-MEHR" },
    { word: "Dormir", translation: "To sleep", pronunciation: "dor-MEER" },
    { word: "Ir", translation: "To go", pronunciation: "eer" },
    { word: "Hoy", translation: "Today", pronunciation: "OY" },
    { word: "Mañana", translation: "Tomorrow", pronunciation: "mah-NYAH-nah" },
  ],
  phrases: [
    { phrase: "Voy al trabajo", translation: "I'm going to work", context: "Daily routine" },
    { phrase: "Quiero comer", translation: "I want to eat", context: "Expressing needs" },
  ],
  activities: [
    {
      id: "es-u1-l2-a1",
      type: "translation",
      question: "What is 'Casa' in English?",
      answer: "Home",
      options: ["Work", "Home", "Eat", "Sleep"],
    },
    {
      id: "es-u1-l2-a2",
      type: "translation",
      question: "How do you say 'Tomorrow' in Spanish?",
      answer: "Mañana",
      options: ["Hoy", "Mañana", "Ir", "Dormir"],
    },
    {
      id: "es-u1-l2-a3",
      type: "matching",
      question: "Match: Dormir",
      answer: "To sleep",
      options: ["To eat", "To go", "To sleep", "Today"],
    },
  ],
};

export const esLesson3: Lesson = {
  id: "es-u1-l3",
  unitId: "es-unit-1",
  order: 3,
  title: "At the Café",
  description: "Order food and drinks like a local",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/cafe/300/200",
  goal: "Order a coffee and snack at a Spanish café",
  aiTeacherPrompt:
    "You're a warm Spanish tutor setting the scene at a café in Madrid. Open with: 'Imagine you've just sat down at a café in Spain — let's make sure you can order!' Introduce the ordering vocabulary one word at a time — say it, give the English meaning, add a pronunciation tip, then ask the student to try. Once they know a couple of words, practise the phrase 'Un café, por favor' together. Always wait for the student to respond before you continue.",
  vocabulary: [
    { word: "Café", translation: "Coffee", pronunciation: "kah-FEH" },
    { word: "Agua", translation: "Water", pronunciation: "AH-gwah" },
    { word: "Menú", translation: "Menu", pronunciation: "meh-NOO" },
    { word: "Camarero", translation: "Waiter", pronunciation: "kah-mah-REH-ro" },
    { word: "La cuenta", translation: "The bill", pronunciation: "lah KWEHN-tah" },
    { word: "Desayuno", translation: "Breakfast", pronunciation: "deh-sah-YOO-no" },
  ],
  phrases: [
    { phrase: "Un café, por favor", translation: "A coffee, please", context: "Ordering at a café" },
    { phrase: "La cuenta, por favor", translation: "The bill, please", context: "Asking for the check" },
    { phrase: "¿Tiene el menú?", translation: "Do you have the menu?", context: "Asking for the menu" },
  ],
  activities: [
    {
      id: "es-u1-l3-a1",
      type: "translation",
      question: "What does 'La cuenta' mean?",
      answer: "The bill",
      options: ["The menu", "The water", "The bill", "The waiter"],
    },
    {
      id: "es-u1-l3-a2",
      type: "translation",
      question: "How do you say 'Water' in Spanish?",
      answer: "Agua",
      options: ["Café", "Agua", "Menú", "Desayuno"],
    },
    {
      id: "es-u1-l3-a3",
      type: "matching",
      question: "Match: Camarero",
      answer: "Waiter",
      options: ["Coffee", "Waiter", "Breakfast", "Menu"],
    },
  ],
};

export const esLesson4: Lesson = {
  id: "es-u1-l4",
  unitId: "es-unit-1",
  order: 4,
  title: "Travel & Directions",
  description: "Navigate cities and ask for directions",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/travel/300/200",
  goal: "Ask for and understand basic directions in Spanish",
  aiTeacherPrompt:
    "You're an enthusiastic Spanish travel guide helping a student find their way around a Spanish-speaking city. Start with the two most critical words — izquierda (left) and derecha (right) — say each one, give a pronunciation tip, and ask the student to repeat before moving on. Build toward a simple direction sentence together once they're comfortable. Keep every reply to one or two sentences and react to what the student actually says.",
  vocabulary: [
    { word: "Izquierda", translation: "Left", pronunciation: "ees-KYEHR-dah" },
    { word: "Derecha", translation: "Right", pronunciation: "deh-REH-chah" },
    { word: "Recto", translation: "Straight ahead", pronunciation: "REHK-to" },
    { word: "Cerca", translation: "Near", pronunciation: "SEHR-kah" },
    { word: "Lejos", translation: "Far", pronunciation: "LEH-hos" },
    { word: "Calle", translation: "Street", pronunciation: "KAH-yeh" },
  ],
  phrases: [
    { phrase: "¿Dónde está...?", translation: "Where is...?", context: "Asking for location" },
    { phrase: "Gire a la izquierda", translation: "Turn left", context: "Giving directions" },
    { phrase: "Está cerca de aquí", translation: "It's near here", context: "Describing distance" },
  ],
  activities: [
    {
      id: "es-u1-l4-a1",
      type: "translation",
      question: "What does 'Derecha' mean?",
      answer: "Right",
      options: ["Left", "Right", "Straight", "Far"],
    },
    {
      id: "es-u1-l4-a2",
      type: "translation",
      question: "How do you say 'Street' in Spanish?",
      answer: "Calle",
      options: ["Cerca", "Lejos", "Recto", "Calle"],
    },
    {
      id: "es-u1-l4-a3",
      type: "matching",
      question: "Match: Cerca",
      answer: "Near",
      options: ["Far", "Left", "Near", "Street"],
    },
  ],
};

export const esLesson5: Lesson = {
  id: "es-u1-l5",
  unitId: "es-unit-1",
  order: 5,
  title: "Shopping",
  description: "Buy things at a market or shop",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/market/300/200",
  goal: "Ask for prices and buy items in Spanish",
  aiTeacherPrompt:
    "You're a lively Spanish market vendor helping a student make their first purchase in Spanish. Open with the question they'll need most: '¿Cuánto cuesta? — that means how much does it cost?' Say it slowly and ask them to repeat it. Then introduce words like barato, caro, and dinero one at a time with a short example for each. Keep sentences short and natural, and react specifically to what the student actually says before teaching the next word.",
  vocabulary: [
    { word: "Precio", translation: "Price", pronunciation: "PREH-syoh" },
    { word: "Barato", translation: "Cheap", pronunciation: "bah-RAH-toh" },
    { word: "Caro", translation: "Expensive", pronunciation: "KAH-roh" },
    { word: "Comprar", translation: "To buy", pronunciation: "kom-PRAHR" },
    { word: "Dinero", translation: "Money", pronunciation: "dee-NEH-roh" },
    { word: "Tienda", translation: "Shop/Store", pronunciation: "TYEHN-dah" },
  ],
  phrases: [
    { phrase: "¿Cuánto cuesta?", translation: "How much does it cost?", context: "Asking for price" },
    { phrase: "Es muy caro", translation: "It's very expensive", context: "Reacting to price" },
    { phrase: "Me lo llevo", translation: "I'll take it", context: "Deciding to buy" },
  ],
  activities: [
    {
      id: "es-u1-l5-a1",
      type: "translation",
      question: "What does 'Barato' mean?",
      answer: "Cheap",
      options: ["Expensive", "Cheap", "Price", "Money"],
    },
    {
      id: "es-u1-l5-a2",
      type: "translation",
      question: "How do you say 'Money' in Spanish?",
      answer: "Dinero",
      options: ["Precio", "Tienda", "Dinero", "Comprar"],
    },
    {
      id: "es-u1-l5-a3",
      type: "matching",
      question: "Match: ¿Cuánto cuesta?",
      answer: "How much does it cost?",
      options: ["I'll take it", "It's expensive", "How much does it cost?", "Let's shop"],
    },
  ],
};

export const esLesson6: Lesson = {
  id: "es-u1-l6",
  unitId: "es-unit-1",
  order: 6,
  title: "Family & Friends",
  description: "Talk about the people you love",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/family/300/200",
  goal: "Introduce and describe your family in Spanish",
  aiTeacherPrompt:
    "You're a warm Spanish tutor helping a student talk about the people they care about most. Start by asking 'Do you have any brothers or sisters?' and use their answer to introduce the first word naturally — for example 'A brother in Spanish is hermano — can you say ehr-MAH-no?' Teach each family word one at a time, waiting for the student to respond before moving on. Keep it personal and encouraging — these words connect to real people in their life.",
  vocabulary: [
    { word: "Familia", translation: "Family", pronunciation: "fah-MEE-lyah" },
    { word: "Madre", translation: "Mother", pronunciation: "MAH-dreh" },
    { word: "Padre", translation: "Father", pronunciation: "PAH-dreh" },
    { word: "Hermano", translation: "Brother", pronunciation: "ehr-MAH-no" },
    { word: "Hermana", translation: "Sister", pronunciation: "ehr-MAH-nah" },
    { word: "Amigo", translation: "Friend", pronunciation: "ah-MEE-go" },
  ],
  phrases: [
    { phrase: "Esta es mi familia", translation: "This is my family", context: "Introducing family" },
    { phrase: "Mi hermana se llama Ana", translation: "My sister's name is Ana", context: "Describing family" },
    { phrase: "Tengo un amigo", translation: "I have a friend", context: "Talking about friends" },
  ],
  activities: [
    {
      id: "es-u1-l6-a1",
      type: "translation",
      question: "What does 'Hermano' mean?",
      answer: "Brother",
      options: ["Sister", "Brother", "Father", "Friend"],
    },
    {
      id: "es-u1-l6-a2",
      type: "translation",
      question: "How do you say 'Mother' in Spanish?",
      answer: "Madre",
      options: ["Padre", "Familia", "Madre", "Amigo"],
    },
    {
      id: "es-u1-l6-a3",
      type: "matching",
      question: "Match: Amigo",
      answer: "Friend",
      options: ["Family", "Sister", "Brother", "Friend"],
    },
  ],
};

// ─── French ───────────────────────────────────────────────────────────────────

export const frLesson1: Lesson = {
  id: "fr-u1-l1",
  unitId: "fr-unit-1",
  order: 1,
  title: "Greetings & Introductions",
  description: "Essential French greetings",
  xpReward: 10,
  durationMinutes: 5,
  imageUrl: "https://picsum.photos/seed/greet-fr/300/200",
  goal: "Greet someone and introduce yourself in French",
  aiTeacherPrompt:
    "You're a friendly French tutor opening a student's very first French lesson. Start with the most essential word — 'Bonjour means hello or good morning — say bon-ZHOOR. Can you try that?' Introduce each greeting one at a time: say the word, give the English meaning, add one pronunciation tip, then wait for the student to repeat. Use short natural sentences with contractions, and react warmly to what they actually say before moving on.",
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

export const frLesson2: Lesson = {
  id: "fr-u1-l2",
  unitId: "fr-unit-1",
  order: 2,
  title: "Daily Life",
  description: "Words for your everyday routine",
  xpReward: 10,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/daily-fr/300/200",
  goal: "Describe your daily life in French",
  aiTeacherPrompt:
    "You're an encouraging French teacher helping a student talk about their daily routine for the first time. Begin with maison — home — and show it in context: 'Je suis à la maison means I'm at home — can you say maison?' Teach each word one at a time, asking the student to say it back before you move on. Keep replies conversational and react warmly and specifically to what the student actually says.",
  vocabulary: [
    { word: "Maison", translation: "Home", pronunciation: "meh-ZON" },
    { word: "Travail", translation: "Work", pronunciation: "trah-VY" },
    { word: "Manger", translation: "To eat", pronunciation: "mahn-ZHEH" },
    { word: "Dormir", translation: "To sleep", pronunciation: "dor-MEER" },
    { word: "Aller", translation: "To go", pronunciation: "ah-LEH" },
    { word: "Aujourd'hui", translation: "Today", pronunciation: "oh-zhoor-DWEE" },
  ],
  phrases: [
    { phrase: "Je vais au travail", translation: "I'm going to work", context: "Daily routine" },
    { phrase: "Je veux manger", translation: "I want to eat", context: "Expressing needs" },
  ],
  activities: [
    {
      id: "fr-u1-l2-a1",
      type: "translation",
      question: "What is 'Maison' in English?",
      answer: "Home",
      options: ["Work", "Home", "Eat", "Sleep"],
    },
    {
      id: "fr-u1-l2-a2",
      type: "translation",
      question: "How do you say 'To eat' in French?",
      answer: "Manger",
      options: ["Dormir", "Aller", "Manger", "Travail"],
    },
    {
      id: "fr-u1-l2-a3",
      type: "matching",
      question: "Match: Aujourd'hui",
      answer: "Today",
      options: ["Tomorrow", "Yesterday", "Today", "Always"],
    },
  ],
};

export const frLesson3: Lesson = {
  id: "fr-u1-l3",
  unitId: "fr-unit-1",
  order: 3,
  title: "Au Café",
  description: "Order at a French café with confidence",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/cafe-fr/300/200",
  goal: "Order coffee and food at a French café",
  aiTeacherPrompt:
    "You're a cheerful French tutor setting the scene at a Parisian café. Open with: 'Picture yourself sitting at a café in Paris — let's make sure you can order!' Start with the ordering phrase 'Un café, s'il vous plaît', then introduce individual words like eau, garçon, and l'addition one at a time. Use short natural sentences, and always pause for the student to respond before you continue with the next word.",
  vocabulary: [
    { word: "Café", translation: "Coffee", pronunciation: "kah-FEH" },
    { word: "Eau", translation: "Water", pronunciation: "oh" },
    { word: "Menu", translation: "Menu", pronunciation: "meh-NOO" },
    { word: "Garçon", translation: "Waiter", pronunciation: "gar-SON" },
    { word: "L'addition", translation: "The bill", pronunciation: "lah-dee-SYON" },
    { word: "Croissant", translation: "Croissant", pronunciation: "kwah-SON" },
  ],
  phrases: [
    { phrase: "Un café, s'il vous plaît", translation: "A coffee, please", context: "Ordering" },
    { phrase: "L'addition, s'il vous plaît", translation: "The bill, please", context: "Paying" },
  ],
  activities: [
    {
      id: "fr-u1-l3-a1",
      type: "translation",
      question: "What does 'L'addition' mean?",
      answer: "The bill",
      options: ["The menu", "The water", "The bill", "The waiter"],
    },
    {
      id: "fr-u1-l3-a2",
      type: "translation",
      question: "How do you say 'Water' in French?",
      answer: "Eau",
      options: ["Café", "Eau", "Menu", "Garçon"],
    },
    {
      id: "fr-u1-l3-a3",
      type: "matching",
      question: "Match: Garçon",
      answer: "Waiter",
      options: ["Coffee", "Waiter", "Menu", "Croissant"],
    },
  ],
};

export const frLesson4: Lesson = {
  id: "fr-u1-l4",
  unitId: "fr-unit-1",
  order: 4,
  title: "Travel & Directions",
  description: "Find your way around French cities",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/travel-fr/300/200",
  goal: "Ask for directions and navigate in French",
  aiTeacherPrompt:
    "You're a helpful French guide helping a student navigate Paris. Open with the two most essential direction words — gauche (left) and droite (right) — give a clear pronunciation tip for each, and ask the student to try both before moving on. Build toward a simple direction sentence together once they've got those down. Keep every reply to one or two sentences, and react to what the student actually says.",
  vocabulary: [
    { word: "Gauche", translation: "Left", pronunciation: "gohsh" },
    { word: "Droite", translation: "Right", pronunciation: "dwat" },
    { word: "Tout droit", translation: "Straight ahead", pronunciation: "too DWAH" },
    { word: "Près", translation: "Near", pronunciation: "preh" },
    { word: "Loin", translation: "Far", pronunciation: "lwon" },
    { word: "Rue", translation: "Street", pronunciation: "roo" },
  ],
  phrases: [
    { phrase: "Où est...?", translation: "Where is...?", context: "Asking for location" },
    { phrase: "Tournez à gauche", translation: "Turn left", context: "Giving directions" },
  ],
  activities: [
    {
      id: "fr-u1-l4-a1",
      type: "translation",
      question: "What does 'Droite' mean?",
      answer: "Right",
      options: ["Left", "Right", "Straight", "Far"],
    },
    {
      id: "fr-u1-l4-a2",
      type: "translation",
      question: "How do you say 'Near' in French?",
      answer: "Près",
      options: ["Loin", "Rue", "Près", "Gauche"],
    },
    {
      id: "fr-u1-l4-a3",
      type: "matching",
      question: "Match: Tout droit",
      answer: "Straight ahead",
      options: ["Turn right", "Straight ahead", "Go back", "Near here"],
    },
  ],
};

export const frLesson5: Lesson = {
  id: "fr-u1-l5",
  unitId: "fr-unit-1",
  order: 5,
  title: "Shopping",
  description: "Shop at French markets and boutiques",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/market-fr/300/200",
  goal: "Ask prices and make purchases in French",
  aiTeacherPrompt:
    "You're a cheerful French shopkeeper helping a student make their first purchase in French. Start with the question they'll use most — 'C'est combien? means how much is it?' — say it slowly and ask the student to repeat it. Then teach words like pas cher, cher, and argent one at a time with short examples. Keep the atmosphere light and fun, and react specifically to what the student actually says before moving on.",
  vocabulary: [
    { word: "Prix", translation: "Price", pronunciation: "pree" },
    { word: "Pas cher", translation: "Cheap", pronunciation: "pah shehr" },
    { word: "Cher", translation: "Expensive", pronunciation: "shehr" },
    { word: "Acheter", translation: "To buy", pronunciation: "ash-TEH" },
    { word: "Argent", translation: "Money", pronunciation: "ar-ZHAN" },
    { word: "Magasin", translation: "Shop/Store", pronunciation: "mah-gah-ZAN" },
  ],
  phrases: [
    { phrase: "C'est combien?", translation: "How much is it?", context: "Asking price" },
    { phrase: "C'est trop cher", translation: "It's too expensive", context: "Reacting to price" },
  ],
  activities: [
    {
      id: "fr-u1-l5-a1",
      type: "translation",
      question: "What does 'Pas cher' mean?",
      answer: "Cheap",
      options: ["Expensive", "Cheap", "Price", "Money"],
    },
    {
      id: "fr-u1-l5-a2",
      type: "translation",
      question: "How do you say 'Money' in French?",
      answer: "Argent",
      options: ["Prix", "Magasin", "Argent", "Acheter"],
    },
    {
      id: "fr-u1-l5-a3",
      type: "matching",
      question: "Match: C'est combien?",
      answer: "How much is it?",
      options: ["It's cheap", "How much is it?", "I'll buy it", "Too expensive"],
    },
  ],
};

export const frLesson6: Lesson = {
  id: "fr-u1-l6",
  unitId: "fr-unit-1",
  order: 6,
  title: "Famille & Amis",
  description: "Talk about family and friends in French",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/family-fr/300/200",
  goal: "Introduce your family in French",
  aiTeacherPrompt:
    "You're a warm French tutor helping a student talk about their family in French. Start by asking about someone in their life to make it personal, then introduce the French word for that relationship naturally — like 'Mother in French is mère — that's mehr — can you say that?' Teach each family word one at a time, waiting for the student to repeat before moving on. Use short natural sentences with contractions and react warmly to what they actually say.",
  vocabulary: [
    { word: "Famille", translation: "Family", pronunciation: "fah-MEE" },
    { word: "Mère", translation: "Mother", pronunciation: "mehr" },
    { word: "Père", translation: "Father", pronunciation: "pehr" },
    { word: "Frère", translation: "Brother", pronunciation: "frehr" },
    { word: "Sœur", translation: "Sister", pronunciation: "seur" },
    { word: "Ami", translation: "Friend", pronunciation: "ah-MEE" },
  ],
  phrases: [
    { phrase: "Voici ma famille", translation: "This is my family", context: "Introducing family" },
    { phrase: "Mon frère s'appelle Paul", translation: "My brother's name is Paul", context: "Describing family" },
  ],
  activities: [
    {
      id: "fr-u1-l6-a1",
      type: "translation",
      question: "What does 'Frère' mean?",
      answer: "Brother",
      options: ["Sister", "Brother", "Father", "Friend"],
    },
    {
      id: "fr-u1-l6-a2",
      type: "translation",
      question: "How do you say 'Mother' in French?",
      answer: "Mère",
      options: ["Père", "Famille", "Mère", "Ami"],
    },
    {
      id: "fr-u1-l6-a3",
      type: "matching",
      question: "Match: Ami",
      answer: "Friend",
      options: ["Family", "Sister", "Brother", "Friend"],
    },
  ],
};

// ─── German ───────────────────────────────────────────────────────────────────

export const deLesson1: Lesson = {
  id: "de-u1-l1",
  unitId: "de-unit-1",
  order: 1,
  title: "Greetings & Introductions",
  description: "Learn your first German greetings",
  xpReward: 10,
  durationMinutes: 5,
  imageUrl: "https://picsum.photos/seed/greet-de/300/200",
  goal: "Say hello and thank you confidently in German",
  aiTeacherPrompt:
    "You're a friendly German tutor opening a student's very first German lesson. Reassure them warmly: 'German's got a tough reputation, but let's prove that wrong — starting with Hallo!' Introduce each greeting one at a time: say the German word, give the English meaning, add a pronunciation tip, and invite the student to repeat before moving on. Use short natural sentences with contractions, and react specifically to what the student actually says.",
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

export const deLesson2: Lesson = {
  id: "de-u1-l2",
  unitId: "de-unit-1",
  order: 2,
  title: "Daily Life",
  description: "Everyday German vocabulary",
  xpReward: 10,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/daily-de/300/200",
  goal: "Describe your daily routine in German",
  aiTeacherPrompt:
    "You're an encouraging German teacher helping a student describe their day for the first time. Start with Haus — home — and use a fun connection: 'Haus sounds just like house — easy, right? Can you say Haus?' Teach each word one at a time with a short example, waiting for the student to respond before introducing the next. Keep it light and natural, and react to what the student actually says.",
  vocabulary: [
    { word: "Haus", translation: "Home", pronunciation: "howss" },
    { word: "Arbeit", translation: "Work", pronunciation: "AR-byt" },
    { word: "Essen", translation: "To eat", pronunciation: "ES-sen" },
    { word: "Schlafen", translation: "To sleep", pronunciation: "SHLAH-fen" },
    { word: "Gehen", translation: "To go", pronunciation: "GEH-en" },
    { word: "Heute", translation: "Today", pronunciation: "HOY-teh" },
  ],
  phrases: [
    { phrase: "Ich gehe zur Arbeit", translation: "I'm going to work", context: "Daily routine" },
    { phrase: "Ich möchte essen", translation: "I want to eat", context: "Expressing needs" },
  ],
  activities: [
    {
      id: "de-u1-l2-a1",
      type: "translation",
      question: "What is 'Haus' in English?",
      answer: "Home",
      options: ["Work", "Home", "Eat", "Sleep"],
    },
    {
      id: "de-u1-l2-a2",
      type: "translation",
      question: "How do you say 'Today' in German?",
      answer: "Heute",
      options: ["Gestern", "Morgen", "Heute", "Immer"],
    },
    {
      id: "de-u1-l2-a3",
      type: "matching",
      question: "Match: Schlafen",
      answer: "To sleep",
      options: ["To eat", "To go", "To sleep", "Today"],
    },
  ],
};

export const deLesson3: Lesson = {
  id: "de-u1-l3",
  unitId: "de-unit-1",
  order: 3,
  title: "Im Café",
  description: "Order at a German café",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/cafe-de/300/200",
  goal: "Order coffee and snacks at a German café",
  aiTeacherPrompt:
    "You're a friendly German café teacher setting the scene in a cozy Berlin café. Open with: 'You've just walked into a café in Germany — let's make sure you can order something!' Start with the ordering phrase 'Einen Kaffee, bitte', then introduce words like Wasser, Speisekarte, and Rechnung one at a time. Keep replies short and natural, and always wait for the student to try saying something before you move forward.",
  vocabulary: [
    { word: "Kaffee", translation: "Coffee", pronunciation: "KAH-feh" },
    { word: "Wasser", translation: "Water", pronunciation: "VAH-ser" },
    { word: "Speisekarte", translation: "Menu", pronunciation: "SHPY-zeh-kar-teh" },
    { word: "Kellner", translation: "Waiter", pronunciation: "KEHL-ner" },
    { word: "Rechnung", translation: "Bill", pronunciation: "REKH-noong" },
    { word: "Kuchen", translation: "Cake", pronunciation: "KOO-khen" },
  ],
  phrases: [
    { phrase: "Einen Kaffee, bitte", translation: "A coffee, please", context: "Ordering" },
    { phrase: "Die Rechnung, bitte", translation: "The bill, please", context: "Paying" },
  ],
  activities: [
    {
      id: "de-u1-l3-a1",
      type: "translation",
      question: "What does 'Rechnung' mean?",
      answer: "Bill",
      options: ["Menu", "Water", "Bill", "Waiter"],
    },
    {
      id: "de-u1-l3-a2",
      type: "translation",
      question: "How do you say 'Water' in German?",
      answer: "Wasser",
      options: ["Kaffee", "Wasser", "Kuchen", "Kellner"],
    },
    {
      id: "de-u1-l3-a3",
      type: "matching",
      question: "Match: Kellner",
      answer: "Waiter",
      options: ["Coffee", "Waiter", "Cake", "Menu"],
    },
  ],
};

export const deLesson4: Lesson = {
  id: "de-u1-l4",
  unitId: "de-unit-1",
  order: 4,
  title: "Travel & Directions",
  description: "Navigate German cities",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/travel-de/300/200",
  goal: "Ask for and give directions in German",
  aiTeacherPrompt:
    "You're a helpful German guide helping a student navigate a German city. Begin with the two most important direction words — links (left) and rechts (right) — give clear pronunciations, and ask the student to try both. Then introduce geradeaus, nah, and weit one at a time before building a simple direction sentence together. Keep every reply to one or two sentences, and react to what the student actually says.",
  vocabulary: [
    { word: "Links", translation: "Left", pronunciation: "lingks" },
    { word: "Rechts", translation: "Right", pronunciation: "rekhts" },
    { word: "Geradeaus", translation: "Straight ahead", pronunciation: "geh-RAH-deh-owss" },
    { word: "Nah", translation: "Near", pronunciation: "nah" },
    { word: "Weit", translation: "Far", pronunciation: "vyt" },
    { word: "Straße", translation: "Street", pronunciation: "SHTRAH-seh" },
  ],
  phrases: [
    { phrase: "Wo ist...?", translation: "Where is...?", context: "Asking location" },
    { phrase: "Biegen Sie links ab", translation: "Turn left", context: "Giving directions" },
  ],
  activities: [
    {
      id: "de-u1-l4-a1",
      type: "translation",
      question: "What does 'Rechts' mean?",
      answer: "Right",
      options: ["Left", "Right", "Straight", "Far"],
    },
    {
      id: "de-u1-l4-a2",
      type: "translation",
      question: "How do you say 'Street' in German?",
      answer: "Straße",
      options: ["Nah", "Weit", "Links", "Straße"],
    },
    {
      id: "de-u1-l4-a3",
      type: "matching",
      question: "Match: Geradeaus",
      answer: "Straight ahead",
      options: ["Turn right", "Straight ahead", "Turn back", "Near here"],
    },
  ],
};

export const deLesson5: Lesson = {
  id: "de-u1-l5",
  unitId: "de-unit-1",
  order: 5,
  title: "Einkaufen",
  description: "Shopping in Germany",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/market-de/300/200",
  goal: "Buy things and ask prices in German",
  aiTeacherPrompt:
    "You're a cheerful German shopkeeper helping a student buy something at a market for the first time. Open with the question they need most: 'Was kostet das? — that means how much does it cost? Can you try saying that?' Then introduce words like billig, teuer, and Geld one at a time with short examples. Keep it playful and market-like, and react warmly to what the student actually says before moving on.",
  vocabulary: [
    { word: "Preis", translation: "Price", pronunciation: "prys" },
    { word: "Billig", translation: "Cheap", pronunciation: "BIL-ig" },
    { word: "Teuer", translation: "Expensive", pronunciation: "TOY-er" },
    { word: "Kaufen", translation: "To buy", pronunciation: "KOW-fen" },
    { word: "Geld", translation: "Money", pronunciation: "gelt" },
    { word: "Geschäft", translation: "Shop/Store", pronunciation: "geh-SHEFT" },
  ],
  phrases: [
    { phrase: "Was kostet das?", translation: "How much does it cost?", context: "Asking price" },
    { phrase: "Das ist zu teuer", translation: "That's too expensive", context: "Reacting to price" },
  ],
  activities: [
    {
      id: "de-u1-l5-a1",
      type: "translation",
      question: "What does 'Billig' mean?",
      answer: "Cheap",
      options: ["Expensive", "Cheap", "Price", "Money"],
    },
    {
      id: "de-u1-l5-a2",
      type: "translation",
      question: "How do you say 'Money' in German?",
      answer: "Geld",
      options: ["Preis", "Geschäft", "Geld", "Kaufen"],
    },
    {
      id: "de-u1-l5-a3",
      type: "matching",
      question: "Match: Was kostet das?",
      answer: "How much does it cost?",
      options: ["It's cheap", "How much does it cost?", "I'll buy it", "Too expensive"],
    },
  ],
};

export const deLesson6: Lesson = {
  id: "de-u1-l6",
  unitId: "de-unit-1",
  order: 6,
  title: "Familie & Freunde",
  description: "Talk about family in German",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/family-de/300/200",
  goal: "Introduce and describe your family in German",
  aiTeacherPrompt:
    "You're a warm German tutor helping a student talk about their family. Ask about someone in their life first to make it personal, then introduce the German word naturally — like 'Brother in German is Bruder — it sounds close to the English word! Can you say BROO-der?' Teach each family word one at a time, waiting for the student to repeat before moving on. Use short sentences with contractions and make it feel like a real conversation.",
  vocabulary: [
    { word: "Familie", translation: "Family", pronunciation: "fah-MEE-lee-eh" },
    { word: "Mutter", translation: "Mother", pronunciation: "MOO-ter" },
    { word: "Vater", translation: "Father", pronunciation: "FAH-ter" },
    { word: "Bruder", translation: "Brother", pronunciation: "BROO-der" },
    { word: "Schwester", translation: "Sister", pronunciation: "SHVES-ter" },
    { word: "Freund", translation: "Friend", pronunciation: "froynt" },
  ],
  phrases: [
    { phrase: "Das ist meine Familie", translation: "This is my family", context: "Introducing family" },
    { phrase: "Mein Bruder heißt Tom", translation: "My brother's name is Tom", context: "Describing family" },
  ],
  activities: [
    {
      id: "de-u1-l6-a1",
      type: "translation",
      question: "What does 'Bruder' mean?",
      answer: "Brother",
      options: ["Sister", "Brother", "Father", "Friend"],
    },
    {
      id: "de-u1-l6-a2",
      type: "translation",
      question: "How do you say 'Mother' in German?",
      answer: "Mutter",
      options: ["Vater", "Familie", "Mutter", "Freund"],
    },
    {
      id: "de-u1-l6-a3",
      type: "matching",
      question: "Match: Freund",
      answer: "Friend",
      options: ["Family", "Sister", "Brother", "Friend"],
    },
  ],
};

// ─── Portuguese ───────────────────────────────────────────────────────────────

export const ptLesson1: Lesson = {
  id: "pt-u1-l1",
  unitId: "pt-unit-1",
  order: 1,
  title: "Greetings & Introductions",
  description: "Learn your first Portuguese greetings",
  xpReward: 10,
  durationMinutes: 5,
  imageUrl: "https://picsum.photos/seed/greet-pt/300/200",
  goal: "Say hello and thank you confidently in Portuguese",
  aiTeacherPrompt:
    "You're an enthusiastic Brazilian Portuguese tutor opening a student's very first Portuguese lesson. Start with the most important greeting: 'In Portuguese, hello is olá — say oh-LAH. Can you try that?' Introduce each greeting one at a time: say the word, give the English meaning, add a pronunciation tip, and wait for the student to repeat. Use short natural sentences with contractions, and react warmly to what they actually say before moving on.",
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

export const ptLesson2: Lesson = {
  id: "pt-u1-l2",
  unitId: "pt-unit-1",
  order: 2,
  title: "Daily Life",
  description: "Everyday Portuguese vocabulary",
  xpReward: 10,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/daily-pt/300/200",
  goal: "Describe your daily routine in Portuguese",
  aiTeacherPrompt:
    "You're a friendly Brazilian Portuguese teacher helping a student describe their everyday life for the first time. Begin with casa — home — and use it in a quick sentence: 'I go home — vou para casa — can you say casa?' Teach each word one at a time at a comfortable pace, always reacting to what the student actually says before introducing the next word. Keep it natural and encouraging.",
  vocabulary: [
    { word: "Casa", translation: "Home", pronunciation: "KAH-zah" },
    { word: "Trabalho", translation: "Work", pronunciation: "trah-BAH-lyoo" },
    { word: "Comer", translation: "To eat", pronunciation: "koh-MEHR" },
    { word: "Dormir", translation: "To sleep", pronunciation: "dor-MEER" },
    { word: "Ir", translation: "To go", pronunciation: "eer" },
    { word: "Hoje", translation: "Today", pronunciation: "OH-zheh" },
  ],
  phrases: [
    { phrase: "Vou ao trabalho", translation: "I'm going to work", context: "Daily routine" },
    { phrase: "Quero comer", translation: "I want to eat", context: "Expressing needs" },
  ],
  activities: [
    {
      id: "pt-u1-l2-a1",
      type: "translation",
      question: "What is 'Casa' in English?",
      answer: "Home",
      options: ["Work", "Home", "Eat", "Sleep"],
    },
    {
      id: "pt-u1-l2-a2",
      type: "translation",
      question: "How do you say 'Today' in Portuguese?",
      answer: "Hoje",
      options: ["Ontem", "Amanhã", "Hoje", "Sempre"],
    },
    {
      id: "pt-u1-l2-a3",
      type: "matching",
      question: "Match: Dormir",
      answer: "To sleep",
      options: ["To eat", "To go", "To sleep", "Today"],
    },
  ],
};

export const ptLesson3: Lesson = {
  id: "pt-u1-l3",
  unitId: "pt-unit-1",
  order: 3,
  title: "No Café",
  description: "Order at a Brazilian café",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/cafe-pt/300/200",
  goal: "Order food and drinks at a Portuguese café",
  aiTeacherPrompt:
    "You're a lively Brazilian café teacher setting the scene in a sunny São Paulo café. Tell the student: 'Imagine you've just walked into a café in Brazil — let's make sure you can order something!' Start with the phrase 'Um café, por favor', then introduce words like água, cardápio, and conta one at a time. Use short natural sentences, and always pause for the student's response before continuing with the next word.",
  vocabulary: [
    { word: "Café", translation: "Coffee", pronunciation: "kah-FEH" },
    { word: "Água", translation: "Water", pronunciation: "AH-gwah" },
    { word: "Cardápio", translation: "Menu", pronunciation: "kar-DAH-pyoo" },
    { word: "Garçom", translation: "Waiter", pronunciation: "gar-SON" },
    { word: "Conta", translation: "Bill", pronunciation: "KON-tah" },
    { word: "Pão de queijo", translation: "Cheese bread", pronunciation: "POW dee KAY-zhoo" },
  ],
  phrases: [
    { phrase: "Um café, por favor", translation: "A coffee, please", context: "Ordering" },
    { phrase: "A conta, por favor", translation: "The bill, please", context: "Paying" },
  ],
  activities: [
    {
      id: "pt-u1-l3-a1",
      type: "translation",
      question: "What does 'Conta' mean?",
      answer: "Bill",
      options: ["Menu", "Water", "Bill", "Waiter"],
    },
    {
      id: "pt-u1-l3-a2",
      type: "translation",
      question: "How do you say 'Water' in Portuguese?",
      answer: "Água",
      options: ["Café", "Água", "Cardápio", "Garçom"],
    },
    {
      id: "pt-u1-l3-a3",
      type: "matching",
      question: "Match: Garçom",
      answer: "Waiter",
      options: ["Coffee", "Waiter", "Menu", "Cheese bread"],
    },
  ],
};

export const ptLesson4: Lesson = {
  id: "pt-u1-l4",
  unitId: "pt-unit-1",
  order: 4,
  title: "Viagens",
  description: "Travel and get around in Portuguese",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/travel-pt/300/200",
  goal: "Ask for directions and navigate in Portuguese",
  aiTeacherPrompt:
    "You're a helpful Portuguese guide helping a student navigate a city in Brazil or Portugal. Start with the two most essential direction words — esquerda (left) and direita (right) — give a clear pronunciation for each, and ask the student to try both before moving on. Build toward a simple direction sentence together once they're comfortable. Keep replies to one or two sentences and react to what the student actually says.",
  vocabulary: [
    { word: "Esquerda", translation: "Left", pronunciation: "esh-KEHR-dah" },
    { word: "Direita", translation: "Right", pronunciation: "dee-RAY-tah" },
    { word: "Em frente", translation: "Straight ahead", pronunciation: "em FREN-cheh" },
    { word: "Perto", translation: "Near", pronunciation: "PEHR-too" },
    { word: "Longe", translation: "Far", pronunciation: "LON-zheh" },
    { word: "Rua", translation: "Street", pronunciation: "HOO-ah" },
  ],
  phrases: [
    { phrase: "Onde fica...?", translation: "Where is...?", context: "Asking location" },
    { phrase: "Vire à esquerda", translation: "Turn left", context: "Giving directions" },
  ],
  activities: [
    {
      id: "pt-u1-l4-a1",
      type: "translation",
      question: "What does 'Direita' mean?",
      answer: "Right",
      options: ["Left", "Right", "Straight", "Far"],
    },
    {
      id: "pt-u1-l4-a2",
      type: "translation",
      question: "How do you say 'Near' in Portuguese?",
      answer: "Perto",
      options: ["Longe", "Rua", "Perto", "Esquerda"],
    },
    {
      id: "pt-u1-l4-a3",
      type: "matching",
      question: "Match: Em frente",
      answer: "Straight ahead",
      options: ["Turn right", "Straight ahead", "Go back", "Near here"],
    },
  ],
};

export const ptLesson5: Lesson = {
  id: "pt-u1-l5",
  unitId: "pt-unit-1",
  order: 5,
  title: "Compras",
  description: "Shopping in Brazil and Portugal",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/market-pt/300/200",
  goal: "Buy things and ask prices in Portuguese",
  aiTeacherPrompt:
    "You're a cheerful Brazilian shopkeeper helping a student make their first purchase in Portuguese. Open with the key question — 'Quanto custa? — that means how much does it cost?' — say it slowly and ask the student to repeat it. Then teach words like barato, caro, and dinheiro one at a time. Keep the atmosphere fun and market-like, and always react to what the student says before moving on to the next word.",
  vocabulary: [
    { word: "Preço", translation: "Price", pronunciation: "PREH-soo" },
    { word: "Barato", translation: "Cheap", pronunciation: "bah-RAH-too" },
    { word: "Caro", translation: "Expensive", pronunciation: "KAH-roo" },
    { word: "Comprar", translation: "To buy", pronunciation: "kom-PRAHR" },
    { word: "Dinheiro", translation: "Money", pronunciation: "jee-NAY-roo" },
    { word: "Loja", translation: "Shop/Store", pronunciation: "LOH-zhah" },
  ],
  phrases: [
    { phrase: "Quanto custa?", translation: "How much does it cost?", context: "Asking price" },
    { phrase: "É muito caro", translation: "It's very expensive", context: "Reacting to price" },
  ],
  activities: [
    {
      id: "pt-u1-l5-a1",
      type: "translation",
      question: "What does 'Barato' mean?",
      answer: "Cheap",
      options: ["Expensive", "Cheap", "Price", "Money"],
    },
    {
      id: "pt-u1-l5-a2",
      type: "translation",
      question: "How do you say 'Money' in Portuguese?",
      answer: "Dinheiro",
      options: ["Preço", "Loja", "Dinheiro", "Comprar"],
    },
    {
      id: "pt-u1-l5-a3",
      type: "matching",
      question: "Match: Quanto custa?",
      answer: "How much does it cost?",
      options: ["It's cheap", "How much does it cost?", "I'll buy it", "Too expensive"],
    },
  ],
};

export const ptLesson6: Lesson = {
  id: "pt-u1-l6",
  unitId: "pt-unit-1",
  order: 6,
  title: "Família & Amigos",
  description: "Talk about family and friends",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/family-pt/300/200",
  goal: "Introduce your family in Portuguese",
  aiTeacherPrompt:
    "You're a warm Brazilian Portuguese tutor helping a student talk about their family. Ask about someone in their life first to make it personal, then naturally introduce the Portuguese word for that relationship — like 'Mother in Portuguese is mãe — that sounds like mah-EH — can you try that?' Teach one family word at a time, waiting for the student to repeat before moving on. Use short natural sentences with contractions and make it feel like a real conversation.",
  vocabulary: [
    { word: "Família", translation: "Family", pronunciation: "fah-MEE-lyah" },
    { word: "Mãe", translation: "Mother", pronunciation: "mah-EH" },
    { word: "Pai", translation: "Father", pronunciation: "py" },
    { word: "Irmão", translation: "Brother", pronunciation: "eer-MOW" },
    { word: "Irmã", translation: "Sister", pronunciation: "eer-MAH" },
    { word: "Amigo", translation: "Friend", pronunciation: "ah-MEE-goo" },
  ],
  phrases: [
    { phrase: "Esta é minha família", translation: "This is my family", context: "Introducing family" },
    { phrase: "Meu irmão se chama João", translation: "My brother's name is João", context: "Describing family" },
  ],
  activities: [
    {
      id: "pt-u1-l6-a1",
      type: "translation",
      question: "What does 'Irmão' mean?",
      answer: "Brother",
      options: ["Sister", "Brother", "Father", "Friend"],
    },
    {
      id: "pt-u1-l6-a2",
      type: "translation",
      question: "How do you say 'Mother' in Portuguese?",
      answer: "Mãe",
      options: ["Pai", "Família", "Mãe", "Amigo"],
    },
    {
      id: "pt-u1-l6-a3",
      type: "matching",
      question: "Match: Amigo",
      answer: "Friend",
      options: ["Family", "Sister", "Brother", "Friend"],
    },
  ],
};

// ─── Japanese ─────────────────────────────────────────────────────────────────

export const jaLesson1: Lesson = {
  id: "ja-u1-l1",
  unitId: "ja-unit-1",
  order: 1,
  title: "Greetings & Introductions",
  description: "Your first Japanese greetings",
  xpReward: 10,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/greet-ja/300/200",
  goal: "Greet someone and say thank you in Japanese",
  aiTeacherPrompt:
    "You're a patient and encouraging Japanese tutor starting a student's very first Japanese lesson. Reassure them gently: 'Japanese might look tricky, but greetings are a great place to start — let's try konnichiwa first.' Say each word using plain English sounds for pronunciation, explain the meaning, and ask the student to try before moving on. Keep replies short, celebrate every attempt, and react to what they actually say.",
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

export const jaLesson2: Lesson = {
  id: "ja-u1-l2",
  unitId: "ja-unit-1",
  order: 2,
  title: "Daily Life",
  description: "Everyday Japanese words",
  xpReward: 10,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/daily-ja/300/200",
  goal: "Describe your daily routine in Japanese",
  aiTeacherPrompt:
    "You're a friendly Japanese teacher helping a student learn their first everyday words. Introduce each word using plain English sounds for pronunciation — like 'Home in Japanese is いえ — just say i-e, two quick sounds — can you try?' Move slowly, teach one word at a time, and always wait for the student to respond before introducing the next. Encourage warmly and react to what they actually say.",
  vocabulary: [
    { word: "いえ", translation: "Home", pronunciation: "i-e" },
    { word: "しごと", translation: "Work", pronunciation: "shi-go-to" },
    { word: "たべる", translation: "To eat", pronunciation: "ta-be-RU" },
    { word: "ねる", translation: "To sleep", pronunciation: "ne-RU" },
    { word: "いく", translation: "To go", pronunciation: "i-KU" },
    { word: "きょう", translation: "Today", pronunciation: "kyo" },
  ],
  phrases: [
    { phrase: "しごとに いきます", translation: "I'm going to work", context: "Daily routine" },
    { phrase: "たべたい", translation: "I want to eat", context: "Expressing needs" },
  ],
  activities: [
    {
      id: "ja-u1-l2-a1",
      type: "translation",
      question: "What is 'いえ' in English?",
      answer: "Home",
      options: ["Work", "Home", "Eat", "Sleep"],
    },
    {
      id: "ja-u1-l2-a2",
      type: "translation",
      question: "How do you say 'Today' in Japanese?",
      answer: "きょう",
      options: ["きのう", "あした", "きょう", "いつも"],
    },
    {
      id: "ja-u1-l2-a3",
      type: "matching",
      question: "Match: ねる",
      answer: "To sleep",
      options: ["To eat", "To go", "To sleep", "Today"],
    },
  ],
};

export const jaLesson3: Lesson = {
  id: "ja-u1-l3",
  unitId: "ja-unit-1",
  order: 3,
  title: "カフェで",
  description: "Ordering at a Japanese café",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/cafe-ja/300/200",
  goal: "Order coffee and snacks at a Japanese café",
  aiTeacherPrompt:
    "You're a cheerful Japanese café teacher setting the scene in a Tokyo coffee shop. Open with: 'Let's imagine you've just walked into a café in Tokyo — the first thing you'd want to order is コーヒー — say KOO-hi — that means coffee. Can you try that?' Introduce one word at a time using English pronunciation guides, and once the student knows a few words, practise the ordering phrase together. Always wait for the student's response before continuing.",
  vocabulary: [
    { word: "コーヒー", translation: "Coffee", pronunciation: "KOO-hi" },
    { word: "みず", translation: "Water", pronunciation: "mi-zu" },
    { word: "メニュー", translation: "Menu", pronunciation: "me-NYU" },
    { word: "てんいん", translation: "Staff / Waiter", pronunciation: "ten-in" },
    { word: "おかいけい", translation: "Bill / Check", pronunciation: "o-kai-ke" },
    { word: "ケーキ", translation: "Cake", pronunciation: "KE-ki" },
  ],
  phrases: [
    { phrase: "コーヒーを ください", translation: "A coffee, please", context: "Ordering" },
    { phrase: "おかいけい お願いします", translation: "The bill, please", context: "Paying" },
  ],
  activities: [
    {
      id: "ja-u1-l3-a1",
      type: "translation",
      question: "What does 'おかいけい' mean?",
      answer: "Bill / Check",
      options: ["Menu", "Water", "Bill / Check", "Waiter"],
    },
    {
      id: "ja-u1-l3-a2",
      type: "translation",
      question: "How do you say 'Water' in Japanese?",
      answer: "みず",
      options: ["コーヒー", "みず", "メニュー", "ケーキ"],
    },
    {
      id: "ja-u1-l3-a3",
      type: "matching",
      question: "Match: てんいん",
      answer: "Staff / Waiter",
      options: ["Coffee", "Staff / Waiter", "Cake", "Menu"],
    },
  ],
};

export const jaLesson4: Lesson = {
  id: "ja-u1-l4",
  unitId: "ja-unit-1",
  order: 4,
  title: "Travel & Directions",
  description: "Navigate Japan with confidence",
  xpReward: 15,
  durationMinutes: 7,
  imageUrl: "https://picsum.photos/seed/travel-ja/300/200",
  goal: "Ask for and understand directions in Japanese",
  aiTeacherPrompt:
    "You're a helpful Japanese guide helping a student find their way around Tokyo. Start with the two most important direction words — ひだり (left) and みぎ (right) — using plain English pronunciations: hi-da-ri and mi-gi. Ask the student to try each one before moving on. Keep replies to one or two sentences, react warmly to what the student actually says, and build toward a simple direction phrase together.",
  vocabulary: [
    { word: "ひだり", translation: "Left", pronunciation: "hi-da-ri" },
    { word: "みぎ", translation: "Right", pronunciation: "mi-gi" },
    { word: "まっすぐ", translation: "Straight ahead", pronunciation: "ma-su-GU" },
    { word: "ちかく", translation: "Near", pronunciation: "chi-ka-KU" },
    { word: "とおい", translation: "Far", pronunciation: "to-o-i" },
    { word: "みち", translation: "Street / Road", pronunciation: "mi-chi" },
  ],
  phrases: [
    { phrase: "___は どこですか？", translation: "Where is ___?", context: "Asking location" },
    { phrase: "ひだりに まがって", translation: "Turn left", context: "Giving directions" },
  ],
  activities: [
    {
      id: "ja-u1-l4-a1",
      type: "translation",
      question: "What does 'みぎ' mean?",
      answer: "Right",
      options: ["Left", "Right", "Straight", "Far"],
    },
    {
      id: "ja-u1-l4-a2",
      type: "translation",
      question: "How do you say 'Near' in Japanese?",
      answer: "ちかく",
      options: ["とおい", "みち", "ちかく", "ひだり"],
    },
    {
      id: "ja-u1-l4-a3",
      type: "matching",
      question: "Match: まっすぐ",
      answer: "Straight ahead",
      options: ["Turn right", "Straight ahead", "Go back", "Near here"],
    },
  ],
};

export const jaLesson5: Lesson = {
  id: "ja-u1-l5",
  unitId: "ja-unit-1",
  order: 5,
  title: "ショッピング",
  description: "Shopping in Japan",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/market-ja/300/200",
  goal: "Buy things and ask prices in Japanese",
  aiTeacherPrompt:
    "You're a friendly Japanese shopkeeper helping a student shop at a market for the first time in Japan. Start with the most useful question: 'いくらですか — say i-KU-ra-DE-su-ka — that means how much is it? Can you give that a try?' Then introduce words like やすい (cheap) and たかい (expensive) one at a time with English pronunciations. React to what the student actually says and keep the atmosphere fun and encouraging.",
  vocabulary: [
    { word: "ねだん", translation: "Price", pronunciation: "ne-dan" },
    { word: "やすい", translation: "Cheap", pronunciation: "ya-SU-i" },
    { word: "たかい", translation: "Expensive", pronunciation: "ta-KA-i" },
    { word: "かう", translation: "To buy", pronunciation: "ka-U" },
    { word: "おかね", translation: "Money", pronunciation: "o-KA-ne" },
    { word: "みせ", translation: "Shop/Store", pronunciation: "mi-se" },
  ],
  phrases: [
    { phrase: "いくらですか？", translation: "How much is it?", context: "Asking price" },
    { phrase: "たかすぎます", translation: "It's too expensive", context: "Reacting to price" },
  ],
  activities: [
    {
      id: "ja-u1-l5-a1",
      type: "translation",
      question: "What does 'やすい' mean?",
      answer: "Cheap",
      options: ["Expensive", "Cheap", "Price", "Money"],
    },
    {
      id: "ja-u1-l5-a2",
      type: "translation",
      question: "How do you say 'Money' in Japanese?",
      answer: "おかね",
      options: ["ねだん", "みせ", "おかね", "かう"],
    },
    {
      id: "ja-u1-l5-a3",
      type: "matching",
      question: "Match: いくらですか？",
      answer: "How much is it?",
      options: ["It's cheap", "How much is it?", "I'll buy it", "Too expensive"],
    },
  ],
};

export const jaLesson6: Lesson = {
  id: "ja-u1-l6",
  unitId: "ja-unit-1",
  order: 6,
  title: "かぞくと ともだち",
  description: "Talk about family and friends",
  xpReward: 15,
  durationMinutes: 6,
  imageUrl: "https://picsum.photos/seed/family-ja/300/200",
  goal: "Introduce your family in Japanese",
  aiTeacherPrompt:
    "You're a warm Japanese tutor helping a student talk about their family. Ask about someone in their family first to make it personal, then naturally introduce the Japanese word for that relationship using plain English pronunciation sounds. Teach one word at a time — say it, explain the meaning, give the pronunciation clearly, and ask the student to repeat. Keep it encouraging and conversational, and celebrate every attempt.",
  vocabulary: [
    { word: "かぞく", translation: "Family", pronunciation: "ka-zo-KU" },
    { word: "おかあさん", translation: "Mother", pronunciation: "o-KA-a-san" },
    { word: "おとうさん", translation: "Father", pronunciation: "o-TO-o-san" },
    { word: "おにいさん", translation: "Brother", pronunciation: "o-NI-i-san" },
    { word: "いもうと", translation: "Sister", pronunciation: "i-MO-u-to" },
    { word: "ともだち", translation: "Friend", pronunciation: "to-mo-DA-chi" },
  ],
  phrases: [
    { phrase: "これは わたしの かぞくです", translation: "This is my family", context: "Introducing family" },
    { phrase: "おにいさんの なまえは けんです", translation: "My brother's name is Ken", context: "Describing family" },
  ],
  activities: [
    {
      id: "ja-u1-l6-a1",
      type: "translation",
      question: "What does 'おにいさん' mean?",
      answer: "Brother",
      options: ["Sister", "Brother", "Father", "Friend"],
    },
    {
      id: "ja-u1-l6-a2",
      type: "translation",
      question: "How do you say 'Mother' in Japanese?",
      answer: "おかあさん",
      options: ["おとうさん", "かぞく", "おかあさん", "ともだち"],
    },
    {
      id: "ja-u1-l6-a3",
      type: "matching",
      question: "Match: ともだち",
      answer: "Friend",
      options: ["Family", "Sister", "Brother", "Friend"],
    },
  ],
};
