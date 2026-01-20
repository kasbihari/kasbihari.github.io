export interface AboutSection {
  id: string;
  title: string;
  content: string;
  icon: string;
}

// Gecombineerde tekst zonder emojis
export const aboutIntro = {
  title: 'Who am I?',
  content: `I'm Krishna — a developer & designer who blends code, art, and culture. I create digital experiences that are both functional and visually refined, driven by a love for design, detail, and storytelling. Beyond the screen, I'm sharpening my strategy in chess, staying disciplined through sports, or exploring anime, gaming, and history. Inspired by Japanese, Arabic, and Indian cultures, my style mixes bold streetwear energy with timeless elegance. Fluent in Dutch, English, and Spanish, I enjoy connecting people and ideas across borders.

Balance the board. Design the future. This philosophy guides my approach to both life and work—strategic, thoughtful, and always planning ahead. Every decision, whether in design or code, should contribute to a larger, well-considered vision.

Languages: Dutch, English, (almost) Spanish
Hobbies: Anime, cars, chess, basketball, martial arts`,
  tagline: 'Balance the board. Design the future.'
};

export const aboutSections: AboutSection[] = [
  {
    id: 'my-journey',
    title: 'My Journey',
    content: 'My path into tech started with a fascination for how things work visually and technically. I began with graphic design, mastering tools like Photoshop and Illustrator, then naturally progressed to web development to bring those designs to life. This unique combination allows me to bridge the gap between aesthetics and functionality.',
    icon: 'Map'
  },
  {
    id: 'passions',
    title: 'Passions & Interests',
    content: 'Beyond the screen, I enjoy sharpening my strategy in chess, staying disciplined through basketball and martial arts, and exploring worlds through anime, gaming, and history. I have a deep appreciation for cars and enjoy understanding both their engineering and design.',
    icon: 'Heart'
  },
  {
    id: 'personality',
    title: 'My Personality',
    content: 'I am analytical yet creative—enjoying the puzzle-solving of code as much as the artistry of design. I value precision and attention to detail, whether it is in a clean line of code or a visual composition. I believe in continuous learning and pushing boundaries in both technical and creative fields.',
    icon: 'User'
  },
  {
    id: 'cultural',
    title: 'Cultural Inspiration',
    content: 'My style is heavily influenced by Japanese minimalism and precision, Arabic geometric patterns and calligraphy, and the vibrant colors and storytelling of Indian culture. This mix creates a unique perspective that blends bold streetwear energy with timeless elegance.',
    icon: 'Globe'
  },
  {
    id: 'philosophy',
    title: 'Daily Philosophy',
    content: 'Balance the board. Design the future. To me, this means approaching life and work like a chess game—strategic, thoughtful, and always planning several moves ahead. Every decision, whether in design or code, should contribute to a larger, well-considered vision.',
    icon: 'Lightbulb'
  },
  {
    id: 'languages',
    title: 'Languages & Hobbies',
    content: 'Fluent in Dutch and English, and currently mastering Spanish. I enjoy the way languages shape thinking and love connecting with people and ideas across different cultures. In my free time, I enjoy anime, cars, chess, basketball, and martial arts.',
    icon: 'MessageSquare'
  }
];
