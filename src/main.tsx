import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { CSSProperties, FormEvent, KeyboardEvent, ReactNode } from 'react';
import './styles.css';

type ReadingStatus = 'read' | 'reading' | 'list';
type Genre = 'Fiction' | 'Fantasy' | 'Romance' | 'Non-fiction' | 'Memoir' | 'Classics' | 'Thriller' | 'Psychology' | 'Young Adult' | 'Historical' | 'Self-help' | 'Contemporary';

type Book = {
  id: string;
  title: string;
  author: string;
  genre: Genre;
  status: ReadingStatus;
  description: string;
  cover: string;
  coverTone: string;
  accent: string;
  year: number;
  pages: number;
  featured?: boolean;
  popular?: boolean;
};

type Review = {
  bookId: string;
  rating: number;
  text: string;
  updatedAt: string;
  ownerId: string;
};

const OWNER = { id: 'owner-wajiha', name: 'Wajiha', initials: 'W' };

const books: Book[] = [
  {
    id: 'midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    status: 'read',
    description: 'Between life and death there is a library. When Nora Seed finds herself there, every book offers a chance to try another life — and a chance to discover what makes one worth living.',
    cover: '/covers/isbn-9780525559474.jpg',
    coverTone: '#4e5468',
    accent: '#d7ae58',
    year: 2020,
    pages: 304,
    featured: true,
    popular: true,
  },
  {
    id: 'tomorrow-tomorrow',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    genre: 'Fiction',
    status: 'read',
    description: 'Two friends, Sam and Sadie, create worlds together through video games — a decades-spanning story about creativity, ambition, and the beautiful ache of making something with someone you love.',
    cover: '/covers/id-12859975.jpg',
    coverTone: '#dd7b43',
    accent: '#f2c15b',
    year: 2022,
    pages: 416,
    popular: true,
  },
  {
    id: 'cerulean-sea',
    title: 'The House in the Cerulean Sea',
    author: 'TJ Klune',
    genre: 'Fantasy',
    status: 'read',
    description: 'A by-the-book caseworker visits an unusual orphanage and finds a family — and a little bit of magic — in the most unexpected place.',
    cover: '/covers/isbn-9781250217288.jpg',
    coverTone: '#4b8e9f',
    accent: '#f6c76c',
    year: 2020,
    pages: 400,
    popular: true,
  },
  {
    id: 'evelyn-hugo',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genre: 'Romance',
    status: 'read',
    description: 'A reclusive Hollywood icon finally tells her story to an unknown magazine writer — seven marriages, one great love, and a life lived entirely on her own terms.',
    cover: '/covers/isbn-9781501161933.jpg',
    coverTone: '#7b4c57',
    accent: '#e9b5a9',
    year: 2017,
    pages: 400,
    popular: true,
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Non-fiction',
    status: 'read',
    description: 'An accessible, practical guide to building good habits, breaking bad ones, and getting one percent better every day through small, repeatable changes.',
    cover: '/covers/isbn-9780735211292.jpg',
    coverTone: '#d9e5ee',
    accent: '#3775a5',
    year: 2018,
    pages: 320,
  },
  {
    id: 'braiding-sweetgrass',
    title: 'Braiding Sweetgrass',
    author: 'Robin Wall Kimmerer',
    genre: 'Memoir',
    status: 'reading',
    description: 'A botanist and member of the Citizen Potawatomi Nation explores the wisdom of plants, the lessons of reciprocity, and the living relationship between people and the natural world.',
    cover: '/covers/isbn-9781571313560.jpg',
    coverTone: '#647b58',
    accent: '#dac17d',
    year: 2013,
    pages: 408,
  },
  {
    id: 'vanishing-half',
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    genre: 'Fiction',
    status: 'read',
    description: 'In a small Southern Black community, twin sisters choose radically different paths — and their daughters inherit the secrets of a family divided by color, place, and time.',
    cover: '/covers/isbn-9780525536291.jpg',
    coverTone: '#72516b',
    accent: '#e4a96b',
    year: 2020,
    pages: 352,
  },
  {
    id: 'piranesi',
    title: 'Piranesi',
    author: 'Susanna Clarke',
    genre: 'Fantasy',
    status: 'list',
    description: 'A house with endless rooms, statues, tides, and a single other person. Piranesi’s journals reveal a world more wondrous — and more dangerous — than it first appears.',
    cover: '/covers/id-10226290.jpg',
    coverTone: '#6a9ca1',
    accent: '#f2d7aa',
    year: 2020,
    pages: 272,
  },
  {
    id: 'name-of-the-wind',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    genre: 'Fantasy',
    status: 'list',
    description: 'Kvothe tells the story of his life: music, magic, heartbreak, and the long road from a troupe of travelling players to the most notorious wizard of his age.',
    cover: '/covers/isbn-9780756404741.jpg',
    coverTone: '#463c58',
    accent: '#c6a9ed',
    year: 2007,
    pages: 736,
  },
  {
    id: 'book-thief',
    title: 'The Book Thief',
    author: 'Markus Zusak',
    genre: 'Fiction',
    status: 'list',
    description: 'Narrated by Death, this unforgettable novel follows a young girl in Nazi Germany who steals books and discovers the extraordinary power of words.',
    cover: '/covers/isbn-9780375842207.jpg',
    coverTone: '#506d7a',
    accent: '#da7e70',
    year: 2005,
    pages: 560,
  },
  {
    id: 'great-gatsby',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classics',
    status: 'list',
    description: 'A glittering, bittersweet portrait of the Jazz Age, where impossible dreams gather around a green light across the water.',
    cover: '/covers/isbn-9780743273565.jpg',
    coverTone: '#283c50',
    accent: '#edd27a',
    year: 1925,
    pages: 180,
  },
  {
    id: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    status: 'list',
    description: 'A shepherd follows a recurring dream toward the Egyptian pyramids and learns that the treasure we seek often changes us before we reach it.',
    cover: '/covers/isbn-9780062315007.jpg',
    coverTone: '#c99847',
    accent: '#f5df9c',
    year: 1988,
    pages: 208,
  },
  {
    id: 'silent-patient', title: 'The Silent Patient', author: 'Alex Michaelides', genre: 'Thriller', status: 'list',
    description: 'A celebrated painter’s silence hides a shocking act, and one determined psychotherapist becomes obsessed with uncovering the truth.', cover: '/covers/id-9407338.jpg', coverTone: '#49636a', accent: '#e4b45d', year: 2018, pages: 336,
  },
  {
    id: 'talking-psychopaths', title: 'Talking with Psychopaths and Savages', author: 'Christopher Berry-Dee', genre: 'Psychology', status: 'list',
    description: 'A chilling true-crime exploration of conversations with some of the world’s most dangerous minds.', cover: '/covers/id-15250270.jpg', coverTone: '#4a4b54', accent: '#d56858', year: 2019, pages: 320,
  },
  {
    id: 'one-arranged-murder', title: 'One Arranged Murder', author: 'Chetan Bhagat', genre: 'Thriller', status: 'list',
    description: 'A wedding, a locked room, and a murder that refuses to stay neatly arranged.', cover: '/covers/id-10504047.jpg', coverTone: '#7f4c4c', accent: '#edc66b', year: 2020, pages: 312,
  },
  {
    id: 'powerless', title: 'Powerless', author: 'Lauren Roberts', genre: 'Young Adult', status: 'list',
    description: 'In a world where the powerless are hunted, Paedyn Gray survives by pretending to be something she is not.', cover: '/covers/id-14567864.jpg', coverTone: '#5a3f63', accent: '#dca3d8', year: 2023, pages: 400,
  },
  {
    id: 'reckless', title: 'Reckless', author: 'Lauren Roberts', genre: 'Young Adult', status: 'list',
    description: 'The next electric chapter in the Powerless trilogy, where survival and desire keep colliding.', cover: '/covers/id-14644120.jpg', coverTone: '#8b4b45', accent: '#f2c36a', year: 2024, pages: 416,
  },
  {
    id: 'powerful', title: 'Powerful', author: 'Lauren Roberts', genre: 'Young Adult', status: 'list',
    description: 'A companion novella from the world of Powerless, filled with dangerous loyalties and impossible choices.', cover: '/covers/id-15106932.jpg', coverTone: '#514b6c', accent: '#9fd0d5', year: 2024, pages: 208,
  },
  {
    id: 'revenant', title: 'The Revenant', author: 'Michael Punke', genre: 'Historical', status: 'list',
    description: 'A frontiersman’s legendary fight for survival after betrayal, loss, and a brutal winter in the American wilderness.', cover: '/covers/id-543348.jpg', coverTone: '#4f5b4b', accent: '#c79b59', year: 2002, pages: 272,
  },
  {
    id: 'ugly-love', title: 'Ugly Love', author: 'Colleen Hoover', genre: 'Romance', status: 'list',
    description: 'A beautiful, messy story about the rules we make to protect our hearts — and what happens when they stop working.', cover: '/covers/id-12856728.jpg', coverTone: '#9b5f6e', accent: '#f0c1bc', year: 2014, pages: 336,
  },
  {
    id: 'twist-of-a-knife', title: 'A Twist of a Knife', author: 'Peter James', genre: 'Thriller', status: 'list',
    description: 'A crime novelist finds himself at the centre of a murder investigation where every twist lands dangerously close to home.', cover: '/covers/id-10337423.jpg', coverTone: '#4c5960', accent: '#d7aa54', year: 2014, pages: 400,
  },
  {
    id: 'nothing-like-the-movies', title: 'Nothing Like the Movies', author: 'Lynn Painter', genre: 'Romance', status: 'list',
    description: 'A second-chance romance full of movie references, old feelings, and the possibility that real life can still surprise you.', cover: '/covers/id-15150672.jpg', coverTone: '#bd704e', accent: '#f2d18d', year: 2024, pages: 352,
  },
  {
    id: 'better-than-the-movies', title: 'Better Than the Movies', author: 'Lynn Painter', genre: 'Romance', status: 'list',
    description: 'Liz plans her perfect rom-com ending, only to discover that the boy next door may be the story she actually wants.', cover: '/covers/id-11182600.jpg', coverTone: '#6e7d87', accent: '#e9b76c', year: 2021, pages: 352,
  },
  {
    id: 'it-starts-with-us', title: 'It Starts with Us', author: 'Colleen Hoover', genre: 'Romance', status: 'list',
    description: 'Lily finds a chance to build a new beginning, while the past keeps asking to be heard.', cover: '/covers/id-12749873.jpg', coverTone: '#536c73', accent: '#dda4a0', year: 2022, pages: 336,
  },
  {
    id: 'family-of-liars', title: 'Family of Liars', author: 'E. Lockhart', genre: 'Fiction', status: 'list',
    description: 'A dark, glittering prequel about the Sinclair family, their summer island, and the secrets that shaped them.', cover: '/covers/id-12728811.jpg', coverTone: '#647166', accent: '#dfb968', year: 2022, pages: 320,
  },
  {
    id: 'think-and-grow-rich', title: 'Think and Grow Rich', author: 'Napoleon Hill', genre: 'Self-help', status: 'list',
    description: 'A classic guide to ambition, persistence, and turning a clearly held idea into a life of purpose.', cover: '/covers/id-14542536.jpg', coverTone: '#6b5535', accent: '#e3c876', year: 1937, pages: 320,
  },
  {
    id: 'subtle-art', title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', genre: 'Self-help', status: 'list',
    description: 'A blunt, funny argument for choosing what is worth caring about and letting the rest fall away.', cover: '/covers/id-8231990.jpg', coverTone: '#7f673e', accent: '#efe0a5', year: 2016, pages: 224,
  },
  {
    id: 'surrounded-by-narcissists', title: 'Surrounded by Narcissists', author: 'Thomas Erikson', genre: 'Psychology', status: 'list',
    description: 'A practical look at difficult personality patterns, communication, and protecting your own energy.', cover: '/covers/id-12850800.jpg', coverTone: '#435d67', accent: '#dfb15f', year: 2022, pages: 304,
  },
  {
    id: 'lemon-trees', title: 'As Long as the Lemon Trees Grow', author: 'Zoulfa Katouh', genre: 'Historical', status: 'list',
    description: 'A young woman dreams of becoming a doctor while her country is torn apart, holding on to love, memory, and hope.', cover: '/covers/id-13872888.jpg', coverTone: '#63755b', accent: '#e6c96d', year: 2022, pages: 416,
  },
  {
    id: 'tuesdays-morrie', title: 'Tuesdays with Morrie', author: 'Mitch Albom', genre: 'Memoir', status: 'list',
    description: 'A beloved teacher’s final lessons become a gentle meditation on love, loss, work, and what makes a life meaningful.', cover: '/covers/id-12560417.jpg', coverTone: '#6e6960', accent: '#e4be6e', year: 1994, pages: 224,
  },
  {
    id: 'rock-paper-scissors', title: 'Rock Paper Scissors', author: 'Alice Feeney', genre: 'Thriller', status: 'list',
    description: 'A remote weekend anniversary trip turns into a game of secrets, suspicion, and shifting truths.', cover: '/covers/id-10826952.jpg', coverTone: '#526477', accent: '#d96c5d', year: 2021, pages: 320,
  },
  {
    id: 'november-9', title: 'November 9', author: 'Colleen Hoover', genre: 'Romance', status: 'list',
    description: 'Two writers meet once a year on the same date, keeping one promise while their lives change around it.', cover: '/covers/id-9219001.jpg', coverTone: '#8d5b5e', accent: '#f0b36a', year: 2015, pages: 320,
  },
  {
    id: 'verity', title: 'Verity', author: 'Colleen Hoover', genre: 'Thriller', status: 'list',
    description: 'A struggling writer accepts an unusual assignment and discovers a manuscript that may be more dangerous than fiction.', cover: '/covers/id-8747160.jpg', coverTone: '#5a454c', accent: '#d8a75b', year: 2018, pages: 336,
  },
  {
    id: 'fifty-shades-darker', title: 'Fifty Shades Darker', author: 'E. L. James', genre: 'Romance', status: 'list',
    description: 'Ana and Christian try to rewrite the rules of their relationship while old shadows gather around them.', cover: '/covers/id-14566702.jpg', coverTone: '#444148', accent: '#bca6d2', year: 2011, pages: 544,
  },
  {
    id: 'heart-bones', title: 'Heart Bones', author: 'Colleen Hoover', genre: 'Romance', status: 'list',
    description: 'Two people with complicated pasts find a fragile kind of belonging by the shore.', cover: '/covers/id-13170122.jpg', coverTone: '#536f78', accent: '#e5bd68', year: 2020, pages: 304,
  },
  {
    id: 'guest-list', title: 'The Guest List', author: 'Lucy Foley', genre: 'Thriller', status: 'list',
    description: 'A wedding on a remote island brings together guests with beautiful clothes, buried grudges, and one deadly secret.', cover: '/covers/id-10096112.jpg', coverTone: '#53645a', accent: '#d8b665', year: 2020, pages: 320,
  },
  {
    id: 'as-good-as-dead', title: 'As Good As Dead', author: 'Holly Jackson', genre: 'Young Adult', status: 'list',
    description: 'Pip is pulled into one final case when a threat from the past refuses to stay buried.', cover: '/covers/id-10716589.jpg', coverTone: '#5c4f63', accent: '#d6a1c4', year: 2021, pages: 464,
  },
  {
    id: 'to-kill-a-mockingbird', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classics', status: 'list',
    description: 'A landmark story of justice, empathy, and moral courage in a small Southern town.', cover: '/covers/to-kill-a-mockingbird.jpg', coverTone: '#6c7a66', accent: '#e6c56b', year: 1960, pages: 281,
  },
  {
    id: '1984', title: '1984', author: 'George Orwell', genre: 'Classics', status: 'list',
    description: 'A chilling vision of surveillance, propaganda, and the struggle to keep hold of one’s own mind.', cover: '/covers/1984.jpg', coverTone: '#4d536c', accent: '#e5b66b', year: 1949, pages: 328,
  },
  {
    id: 'pride-and-prejudice', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Classics', status: 'list',
    description: 'A sparkling romance of manners, first impressions, family, and the long road toward understanding.', cover: '/covers/pride-and-prejudice.jpg', coverTone: '#8d5b65', accent: '#f0c6a0', year: 1813, pages: 432,
  },
  {
    id: 'beloved', title: 'Beloved', author: 'Toni Morrison', genre: 'Fiction', status: 'list',
    description: 'A haunting, lyrical novel about memory, motherhood, and the ghosts history leaves behind.', cover: '/covers/beloved.jpg', coverTone: '#563e61', accent: '#e7b971', year: 1987, pages: 321,
  },
  {
    id: 'jane-eyre', title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Classics', status: 'list',
    description: 'An orphaned governess finds her voice, her independence, and a love as fierce as the moors.', cover: '/covers/jane-eyre.jpg', coverTone: '#475e70', accent: '#e7bf77', year: 1847, pages: 532,
  },
  {
    id: 'the-kite-runner', title: 'The Kite Runner', author: 'Khaled Hosseini', genre: 'Fiction', status: 'list',
    description: 'A sweeping story of friendship, betrayal, and redemption across changing Afghan landscapes.', cover: '/covers/the-kite-runner.jpg', coverTone: '#65736c', accent: '#e7c17b', year: 2003, pages: 371,
  },
  {
    id: 'all-the-light-we-cannot-see', title: 'All the Light We Cannot See', author: 'Anthony Doerr', genre: 'Historical', status: 'list',
    description: 'Two young people’s lives converge during World War II in a luminous story about science, courage, and survival.', cover: '/covers/all-the-light-we-cannot-see.jpg', coverTone: '#4b6c74', accent: '#edc26d', year: 2014, pages: 531,
  },
  {
    id: 'normal-people', title: 'Normal People', author: 'Sally Rooney', genre: 'Contemporary', status: 'list',
    description: 'An intimate, sharply observed story about connection, class, and the people we keep finding our way back to.', cover: '/covers/normal-people.jpg', coverTone: '#8d5a67', accent: '#f1c2bb', year: 2018, pages: 273,
  },
  {
    id: 'full-moon-coffee-shop', title: 'Full Moon Coffee Shop', author: 'Mai Mochizuki', genre: 'Fantasy', status: 'list',
    description: 'A magical coffee shop appears at the full moon, serving drinks and a little guidance to wandering customers.', cover: '/covers/full-moon-coffee-shop.jpg', coverTone: '#5f687d', accent: '#e8c275', year: 2024, pages: 240,
  },
  {
    id: 'a-little-life', title: 'A Little Life', author: 'Hanya Yanagihara', genre: 'Fiction', status: 'list',
    description: 'Four friends grow up in New York as love, ambition, and the weight of the past test their bonds.', cover: '/covers/a-little-life.jpg', coverTone: '#5d4a69', accent: '#ddb4d8', year: 2015, pages: 720,
  },
  {
    id: 'white-nights', title: 'White Nights', author: 'Fyodor Dostoevsky', genre: 'Classics', status: 'list',
    description: 'A tender, dreamlike novella about solitude, longing, and one unforgettable summer encounter.', cover: '/covers/white-nights.jpg', coverTone: '#536b76', accent: '#efd08c', year: 1848, pages: 96,
  },
  {
    id: 'murder-at-the-bookstore', title: 'Murder at the Bookstore', author: 'Sue Minix', genre: 'Thriller', status: 'list',
    description: 'A cozy bookstore mystery where a bookseller must untangle secrets before the next chapter turns deadly.', cover: '/covers/murder-at-the-bookstore.jpg', coverTone: '#70545a', accent: '#e5bd6b', year: 2023, pages: 304,
  },
  {
    id: 'animal-farm', title: 'Animal Farm', author: 'George Orwell', genre: 'Classics', status: 'list',
    description: 'A deceptively simple allegory about power, revolution, and how ideals can be rewritten.', cover: '/covers/animal-farm.jpg', coverTone: '#64704f', accent: '#e1b35e', year: 1945, pages: 112,
  },
  {
    id: 'reappearance-rachel-price', title: 'The Reappearance of Rachel Price', author: 'Holly Jackson', genre: 'Young Adult', status: 'list',
    description: 'A true-crime documentary reopens the mystery of a mother’s disappearance — and the secrets around it.', cover: '/covers/reappearance-rachel-price.jpg', coverTone: '#66536c', accent: '#e3a9cf', year: 2024, pages: 432,
  },
  {
    id: 'five-survive', title: 'Five Survive', author: 'Holly Jackson', genre: 'Young Adult', status: 'list',
    description: 'Six friends, one stranded RV, and a sniper who knows exactly what they are hiding.', cover: '/covers/five-survive.jpg', coverTone: '#596876', accent: '#e8b65f', year: 2022, pages: 384,
  },
  {
    id: 'how-to-kill-your-family', title: 'How to Kill Your Family', author: 'Bella Mackie', genre: 'Thriller', status: 'list',
    description: 'A darkly funny revenge story about inheritance, family grudges, and a very determined narrator.', cover: '/covers/how-to-kill-your-family.jpg', coverTone: '#69564f', accent: '#e7c06f', year: 2021, pages: 352,
  },
  {
    id: 'the-surrogate-mother', title: "The Surrogate Mother", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-surrogate-mother.jpg", coverTone: '#5b4d69', accent: '#e7b65f', year: 2020, pages: 304,
  },
  {
    id: 'the-ex', title: "The Ex", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-ex.jpg", coverTone: '#6b5660', accent: '#d8a2bd', year: 2020, pages: 304,
  },
  {
    id: 'the-perfect-son', title: "The Perfect Son", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-perfect-son.jpg", coverTone: '#4c5f6c', accent: '#e4c575', year: 2020, pages: 304,
  },
  {
    id: 'the-wife-upstairs', title: "The Wife Upstairs", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-wife-upstairs.jpg", coverTone: '#76565b', accent: '#d48b77', year: 2020, pages: 320,
  },
  {
    id: 'one-by-one', title: "One by One", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/one-by-one.jpg", coverTone: '#4f6070', accent: '#e7b65f', year: 2020, pages: 304,
  },
  {
    id: 'want-to-know-a-secret', title: "Want to Know a Secret?", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/want-to-know-a-secret.jpg", coverTone: '#6c5b70', accent: '#d8a2bd', year: 2021, pages: 304,
  },
  {
    id: 'the-locked-door', title: "The Locked Door", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-locked-door.jpg", coverTone: '#465b64', accent: '#e4c575', year: 2021, pages: 304,
  },
  {
    id: 'do-not-disturb', title: "Do Not Disturb", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/do-not-disturb.jpg", coverTone: '#725552', accent: '#d48b77', year: 2021, pages: 304,
  },
  {
    id: 'do-you-remember', title: "Do You Remember?", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/do-you-remember.jpg", coverTone: '#5c6875', accent: '#e7b65f', year: 2022, pages: 304,
  },
  {
    id: 'the-inmate', title: "The Inmate", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-inmate.jpg", coverTone: '#645261', accent: '#d8a2bd', year: 2022, pages: 304,
  },
  {
    id: 'never-lie', title: "Never Lie", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/never-lie.jpg", coverTone: '#5b4d69', accent: '#e4c575', year: 2022, pages: 304,
  },
  {
    id: 'ward-d', title: "Ward D", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/ward-d.jpg", coverTone: '#6b5660', accent: '#d48b77', year: 2025, pages: 304,
  },
  {
    id: 'the-coworker', title: "The Coworker", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-coworker.jpg", coverTone: '#4c5f6c', accent: '#e7b65f', year: 2023, pages: 304,
  },
  {
    id: 'the-teacher', title: "The Teacher", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-teacher.jpg", coverTone: '#76565b', accent: '#d8a2bd', year: 2024, pages: 304,
  },
  {
    id: 'the-boyfriend', title: "The Boyfriend", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-boyfriend.jpg", coverTone: '#4f6070', accent: '#e4c575', year: 2024, pages: 304,
  },
  {
    id: 'the-crash', title: "The Crash", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-crash.jpg", coverTone: '#6c5b70', accent: '#d48b77', year: 2025, pages: 304,
  },
  {
    id: 'the-tenant', title: "The Tenant", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-tenant.jpg", coverTone: '#465b64', accent: '#e7b65f', year: 2025, pages: 304,
  },
  {
    id: 'the-intruder', title: "The Intruder", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-intruder.jpg", coverTone: '#725552', accent: '#d8a2bd', year: 2025, pages: 304,
  },
  {
    id: 'dear-debbie', title: "Dear Debbie", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/dear-debbie.jpg", coverTone: '#5c6875', accent: '#e4c575', year: 2026, pages: 304,
  },
  {
    id: 'the-divorce', title: "The Divorce", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-divorce.jpg", coverTone: '#645261', accent: '#d48b77', year: 2026, pages: 304,
  },
  {
    id: 'the-witch', title: "The Witch", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-witch.jpg", coverTone: '#5b4d69', accent: '#e7b65f', year: 2026, pages: 304,
  },
  {
    id: 'baby-city', title: "Baby City", author: "Freida McFadden with Kelley Stoddard", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/baby-city.jpg", coverTone: '#6b5660', accent: '#d8a2bd', year: 2015, pages: 64,
  },
  {
    id: 'the-gift-short-story', title: "The Gift (Short Story)", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A short, sharp Freida McFadden mystery built around a secret that refuses to stay buried.", cover: "", coverTone: '#4c5f6c', accent: '#e4c575', year: 2020, pages: 40,
  },
  {
    id: 'widows-husbands-secret-lie', title: "The Widow's Husband's Secret Lie (Short Story)", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A short, sharp Freida McFadden mystery built around a secret that refuses to stay buried.", cover: "/covers/widows-husbands-secret-lie.jpg", coverTone: '#76565b', accent: '#d48b77', year: 2024, pages: 48,
  },
  {
    id: 'death-row-short-story', title: "Death Row (Short Story)", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A short, sharp Freida McFadden mystery built around a secret that refuses to stay buried.", cover: "/covers/death-row-short-story.jpg", coverTone: '#4f6070', accent: '#e7b65f', year: 2025, pages: 48,
  },
  {
    id: 'the-dinner-party-short-story', title: "The Dinner Party (Short Story)", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A short, sharp Freida McFadden mystery built around a secret that refuses to stay buried.", cover: "/covers/the-dinner-party-short-story.jpg", coverTone: '#6c5b70', accent: '#d8a2bd', year: 2026, pages: 48,
  },
  {
    id: 'the-housemaid', title: "The Housemaid", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-housemaid.jpg", coverTone: '#465b64', accent: '#e4c575', year: 2022, pages: 336,
  },
  {
    id: 'the-housemaids-secret', title: "The Housemaid's Secret", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-housemaids-secret.jpg", coverTone: '#725552', accent: '#d48b77', year: 2023, pages: 336,
  },
  {
    id: 'the-housemaids-wedding', title: "The Housemaid's Wedding (Novella)", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A short, sharp Freida McFadden mystery built around a secret that refuses to stay buried.", cover: "/covers/the-housemaids-wedding.jpg", coverTone: '#5c6875', accent: '#e7b65f', year: 2024, pages: 128,
  },
  {
    id: 'the-housemaid-is-watching', title: "The Housemaid Is Watching", author: "Freida McFadden", genre: 'Thriller', status: 'list',
    description: "A twisty Freida McFadden thriller about secrets, suspicion, and the story hiding behind an ordinary life.", cover: "/covers/the-housemaid-is-watching.jpg", coverTone: '#645261', accent: '#d8a2bd', year: 2024, pages: 336,
  },
];

const defaultReviews: Record<string, Review> = {
  'midnight-library': {
    bookId: 'midnight-library',
    rating: 4.5,
    text: 'A tender little lantern of a book. I loved the invitation to imagine all the lives we never lived — and the reminder that an ordinary Tuesday can be its own kind of miracle.',
    updatedAt: '2026-10-03',
    ownerId: OWNER.id,
  },
  'tomorrow-tomorrow': {
    bookId: 'tomorrow-tomorrow',
    rating: 4,
    text: 'Big-hearted and gloriously specific about the strange intimacy of making things together. It made me want to call an old friend and play something co-op.',
    updatedAt: '2026-09-27',
    ownerId: OWNER.id,
  },
  'cerulean-sea': {
    bookId: 'cerulean-sea',
    rating: 4.5,
    text: 'Soft, strange, and exactly the kind of found-family story I want to press into someone’s hands with a cup of tea.',
    updatedAt: '2026-09-12',
    ownerId: OWNER.id,
  },
  'evelyn-hugo': {
    bookId: 'evelyn-hugo',
    rating: 4,
    text: 'A page-turner with a polished old-Hollywood sheen — but the quiet choices underneath are what stayed with me.',
    updatedAt: '2026-08-25',
    ownerId: OWNER.id,
  },
};

const statusLabels: Record<ReadingStatus, string> = { read: 'Read', reading: 'Reading now', list: 'On my list' };
const genres: Array<'All' | Genre> = ['All', 'Fiction', 'Fantasy', 'Romance', 'Non-fiction', 'Memoir', 'Classics', 'Thriller', 'Psychology', 'Young Adult', 'Historical', 'Self-help', 'Contemporary'];
const statuses: Array<'All' | ReadingStatus> = ['All', 'read', 'reading', 'list'];

function Icon({ name, size = 18 }: { name: 'search' | 'arrow' | 'bookmark' | 'book' | 'box' | 'chevron' | 'pen' | 'spark'; size?: number }) {
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    bookmark: <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.5L6 21Z" />,
    book: <><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5Z" /><path d="M4 4.5v17" /><path d="M8 6h8" /></>,
    box: <><path d="m4 7.5 8-4.5 8 4.5v9L12 21l-8-4.5Z" /><path d="m4 7.5 8 4.5 8-4.5" /><path d="M12 12v9" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    pen: <><path d="m14 5 5 5" /><path d="M4 20l4.4-1 10-10a2.8 2.8 0 0 0-4-4l-10 10Z" /></>,
    spark: <><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7Z" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Stars({ rating, large = false }: { rating?: number; large?: boolean }) {
  const value = rating ?? 0;
  return (
    <span className={`stars ${large ? 'stars-large' : ''}`} aria-label={rating ? `${rating} out of 5 stars` : 'Not yet rated'}>
      {Array.from({ length: 5 }, (_, index) => {
        const difference = value - index;
        return <span key={index} className={difference >= 1 ? 'star-full' : difference >= 0.5 ? 'star-half' : 'star-empty'}>{difference >= 1 ? '★' : difference >= 0.5 ? '✦' : '☆'}</span>;
      })}
    </span>
  );
}

function BookCover({ book, size = 'card' }: { book: Book; size?: 'card' | 'hero' | 'detail' }) {
  const [failed, setFailed] = useState(!book.cover);
  return (
    <div className={`book-cover cover-${size} ${failed ? 'cover-failed' : ''}`} style={{ '--cover-tone': book.coverTone, '--cover-accent': book.accent } as CSSProperties}>
      {!failed && book.cover ? <img src={book.cover} alt={`${book.title} cover`} onError={() => setFailed(true)} /> : null}
      <div className="cover-placeholder" aria-hidden={!failed}>
        <span className="placeholder-band" />
        <span className="placeholder-title">{book.title}</span>
        <span className="placeholder-author">{book.author}</span>
        <span className="placeholder-mark">PB</span>
      </div>
      {!failed && <span className="cover-shadow" aria-hidden="true" />}
    </div>
  );
}

function RatingChip({ rating }: { rating?: number }) {
  return rating ? <span className="rating-chip"><span aria-hidden="true">★</span> {rating.toFixed(rating % 1 ? 1 : 0)}</span> : <span className="rating-muted">Not rated yet</span>;
}

function BookCard({ book, review, onOpen, onStatusChange }: { book: Book; review?: Review; onOpen: (id: string) => void; onStatusChange: (id: string, status: ReadingStatus) => void }) {
  const handleKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpen(book.id); }
  };
  return (
    <article className="book-card" tabIndex={0} role="link" onKeyDown={handleKey} onClick={() => onOpen(book.id)}>
      <div className="card-cover-wrap"><BookCover book={book} /><span className={`status-tag status-${book.status}`}>{statusLabels[book.status]}</span></div>
      <div className="book-card-copy">
        <div className="book-card-meta"><span>{book.genre}</span><span className="meta-dot" aria-hidden="true" /> <span>{book.year}</span></div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <div className="card-rating"><RatingChip rating={review?.rating} /></div>
        <div className="card-actions" onClick={(event) => event.stopPropagation()}><button type="button" className={`list-toggle ${book.status === 'list' ? 'active' : ''}`} aria-label={book.status === 'list' ? `Remove ${book.title} from reading list` : `Add ${book.title} to reading list`} onClick={() => onStatusChange(book.id, book.status === 'list' ? 'read' : 'list')}><span aria-hidden="true">{book.status === 'list' ? '−' : '+'}</span> {book.status === 'list' ? 'Remove from list' : 'Add to list'}</button></div>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, action, onAction }: { eyebrow: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{action && <button className="text-button" onClick={onAction}>{action}<Icon name="arrow" size={16} /></button>}</div>;
}

function FilterBar({ filters, onChange }: { filters: FilterState; onChange: (next: FilterState) => void }) {
  return (
    <div className="filter-bar">
      <label className="filter-search"><Icon name="search" size={17} /><input value={filters.search} onChange={(event) => onChange({ ...filters, search: event.target.value })} placeholder="Search title or author" aria-label="Search title or author" /></label>
      <label className="select-wrap"><span>Genre</span><select value={filters.genre} onChange={(event) => onChange({ ...filters, genre: event.target.value as FilterState['genre'] })}>{genres.map((genre) => <option value={genre} key={genre}>{genre}</option>)}</select><Icon name="chevron" size={15} /></label>
      <label className="select-wrap"><span>Rating</span><select value={filters.rating} onChange={(event) => onChange({ ...filters, rating: event.target.value as FilterState['rating'] })}><option value="All">Any rating</option><option value="4">4+ stars</option><option value="5">5 stars</option><option value="Unrated">Not reviewed</option></select><Icon name="chevron" size={15} /></label>
      <label className="select-wrap"><span>Status</span><select value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value as FilterState['status'] })}>{statuses.map((status) => <option value={status} key={status}>{status === 'All' ? 'Any status' : statusLabels[status]}</option>)}</select><Icon name="chevron" size={15} /></label>
    </div>
  );
}

type FilterState = { search: string; genre: 'All' | Genre; rating: 'All' | '4' | '5' | 'Unrated'; status: 'All' | ReadingStatus };
const emptyFilters: FilterState = { search: '', genre: 'All', rating: 'All', status: 'All' };

function Home({ collection, reviews, onOpen, onBrowse, onStatusChange }: { collection: Book[]; reviews: Record<string, Review>; onOpen: (id: string) => void; onBrowse: (filters?: Partial<FilterState>) => void; onStatusChange: (id: string, status: ReadingStatus) => void }) {
  const latest = collection.find((book) => book.featured) ?? collection[0];
  const latestReview = reviews[latest.id];
  const recentlyReviewed = collection.filter((book) => reviews[book.id]).slice(0, 4);
  const readingList = collection.filter((book) => book.status === 'list').slice(0, 4);
  const popular = collection.filter((book) => book.popular).slice(0, 4);
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const filtered = useMemo(() => filterBooks(collection, filters, reviews).slice(0, 6), [filters, reviews]);

  return <>
    <section className="library-sign section-wrap" aria-label="Welcome quote">
      <div className="sign-line" /><div className="sign-plaque"><span className="plaque-pin plaque-pin-left" /><span className="plaque-pin plaque-pin-right" /><p>“So many books, so little time.”</p><span>— Frank Zappa</span></div><div className="sign-line" />
    </section>

    <section className="hero section-wrap">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> The owner’s reading room</p>
        <h1>Read it.<br /><em>Rate it.</em><br />Remember it.</h1>
        <p className="hero-lede">pageboxd is Wajiha’s lovingly curated corner for books worth underlining, lending, and thinking about on the walk home.</p>
        <div className="hero-actions"><button className="button button-primary" onClick={() => onBrowse()}><span>Browse the shelves</span><Icon name="arrow" size={17} /></button><button className="button button-quiet" onClick={() => onBrowse({ status: 'list' })}><Icon name="bookmark" size={17} /> Read next</button></div>
        <div className="hero-note"><span className="mini-stamp">PB</span><span>Curated by {OWNER.name}<br /><small>One reader’s notes, shared warmly.</small></span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-book-stack"><div className="stack-book stack-book-back">Stories<br />to keep</div><div className="stack-book stack-book-middle">A good book<br />is company</div><div className="stack-book stack-book-front"><span className="book-spine-label">PAGEBOXD</span><strong>Take a<br /><em>little<br />detour.</em></strong><span className="stack-footer">VOL. 01 · 2026</span></div></div>
        <div className="hero-scribble">currently<br /><strong>reading</strong><span>→</span></div>
        <div className="hero-starburst"><Icon name="spark" size={21} /><span>new<br />shelves</span></div>
      </div>
    </section>

    <section className="featured-review section-wrap">
      <div className="featured-label"><span className="vertical-rule" /><span>Latest note from the nook</span></div>
      <div className="featured-card">
        <div className="featured-cover"><BookCover book={latest} size="hero" /><span className="featured-ribbon">Just reviewed</span></div>
        <div className="featured-content"><div className="feature-kicker"><span>FEATURED REVIEW</span><span className="feature-date">03 OCT 2026</span></div><h2>{latest.title}</h2><p className="byline">{latest.author} <span>·</span> {latest.genre}</p><div className="feature-rating"><Stars rating={latestReview?.rating} large /><span>{latestReview?.rating.toFixed(1)} / 5</span></div><blockquote>“{latestReview?.text}”</blockquote><div className="feature-footer"><span className="owner-avatar">{OWNER.initials}</span><span>Written by <strong>{OWNER.name}</strong></span><button className="text-button" onClick={() => onOpen(latest.id)}>Read the full note <Icon name="arrow" size={16} /></button></div></div>
      </div>
    </section>

    <section className="shelf-section section-wrap"><SectionHeading eyebrow="The newest bookmarks" title="Recently reviewed" action="See all notes" onAction={() => onBrowse({ rating: '4' })} /><div className="book-grid">{recentlyReviewed.map((book) => <BookCard key={book.id} book={book} review={reviews[book.id]} onOpen={onOpen} onStatusChange={onStatusChange} />)}</div></section>
    <section className="shelf-section section-wrap"><SectionHeading eyebrow="Waiting patiently" title="On my reading list" action="Open reading list" onAction={() => onBrowse({ status: 'list' })} /><div className="book-grid">{readingList.map((book) => <BookCard key={book.id} book={book} review={reviews[book.id]} onOpen={onOpen} onStatusChange={onStatusChange} />)}</div></section>
    <section className="shelf-section section-wrap"><SectionHeading eyebrow="Dog-eared favourites" title="Popular picks" action="Browse all books" onAction={() => onBrowse()} /><div className="book-grid">{popular.map((book) => <BookCard key={book.id} book={book} review={reviews[book.id]} onOpen={onOpen} onStatusChange={onStatusChange} />)}</div></section>

    <section className="browse-home section-wrap"><div className="browse-home-head"><div><p className="eyebrow"><span className="eyebrow-dot" /> The full catalogue</p><h2>Find your next <em>good</em> book.</h2></div><p className="browse-intro">Search the shelves by mood, genre, or how far the owner has gotten through the stack.</p></div><FilterBar filters={filters} onChange={setFilters} /><div className="browse-results">{filtered.map((book) => <BookCard key={book.id} book={book} review={reviews[book.id]} onOpen={onOpen} onStatusChange={onStatusChange} />)}</div><button className="button button-outline center-button" onClick={() => onBrowse()}>View all {books.length} books <Icon name="arrow" size={17} /></button></section>
  </>;
}

function filterBooks(collection: Book[], filters: FilterState, reviews: Record<string, Review>) {
  const term = filters.search.trim().toLowerCase();
  return collection.filter((book) => {
    const review = reviews[book.id];
    const matchesTerm = !term || `${book.title} ${book.author}`.toLowerCase().includes(term);
    const matchesGenre = filters.genre === 'All' || book.genre === filters.genre;
    const matchesStatus = filters.status === 'All' || book.status === filters.status;
    const matchesRating = filters.rating === 'All' || (filters.rating === 'Unrated' ? !review : review && (filters.rating === '5' ? review.rating === 5 : review.rating >= 4));
    return matchesTerm && matchesGenre && matchesStatus && matchesRating;
  });
}

function AllBooks({ collection, reviews, onOpen, onStatusChange, onAddBook, initialFilters }: { collection: Book[]; reviews: Record<string, Review>; onOpen: (id: string) => void; onStatusChange: (id: string, status: ReadingStatus) => void; onAddBook: () => void; initialFilters?: Partial<FilterState> }) {
  const [filters, setFilters] = useState<FilterState>({ ...emptyFilters, ...initialFilters });
  useEffect(() => { setFilters({ ...emptyFilters, ...initialFilters }); }, [initialFilters]);
  const filtered = useMemo(() => filterBooks(collection, filters, reviews), [collection, filters, reviews]);
  return <section className="catalog section-wrap"><div className="catalog-header"><div><p className="eyebrow"><span className="eyebrow-dot" /> A tidy little library</p><h1>All <em>books</em></h1><p className="catalog-lede">Every title currently living on the pageboxd shelves — reviewed, reading, or waiting for its moment.</p></div><div className="catalog-count"><strong>{filtered.length.toString().padStart(2, '0')}</strong><span>books<br />showing</span></div></div><FilterBar filters={filters} onChange={setFilters} /><div className="catalog-summary"><span>{filtered.length} {filtered.length === 1 ? 'book' : 'books'} match your filters</span>{(filters.search || filters.genre !== 'All' || filters.rating !== 'All' || filters.status !== 'All') && <button className="clear-button" onClick={() => setFilters(emptyFilters)}>Clear filters</button>}</div>{filtered.length ? <div className="book-grid book-grid-catalog">{filtered.map((book) => <BookCard key={book.id} book={book} review={reviews[book.id]} onOpen={onOpen} onStatusChange={onStatusChange} />)}</div> : <div className="empty-state"><span className="empty-icon"><Icon name="book" size={25} /></span><h2>No books on this shelf yet.</h2><p>Try loosening one of your filters — there may be a story hiding nearby.</p><button className="button button-outline" onClick={() => setFilters(emptyFilters)}>Show all books</button></div>}<button className="button button-outline add-book-button" onClick={onAddBook}><span aria-hidden="true">＋</span> Add another book</button></section>;
}

function BookDetail({ book, review, onBack, onReview, onStatusChange }: { book: Book; review?: Review; onBack: () => void; onReview: () => void; onStatusChange: (id: string, status: ReadingStatus) => void }) {
  return <section className="detail section-wrap"><button className="back-button" onClick={onBack}>← Back to shelves</button><div className="detail-layout"><div className="detail-cover-column"><BookCover book={book} size="detail" /><div className="detail-side-note"><span className="mini-stamp">PB</span><span>Filed under<br /><strong>{book.genre}</strong></span></div></div><div className="detail-copy"><div className="detail-kicker"><span className={`status-dot status-dot-${book.status}`} /> {statusLabels[book.status]} <span className="meta-dot" /> {book.genre}</div><h1>{book.title}</h1><p className="detail-author">by <strong>{book.author}</strong></p><p className="detail-description">{book.description}</p><div className="detail-facts"><span><strong>{book.pages}</strong> pages</span><span><strong>{book.year}</strong> first published</span></div><div className="status-actions" aria-label="Reading list"><button type="button" className={`list-toggle detail-list-toggle ${book.status === 'list' ? 'active' : ''}`} aria-label={book.status === 'list' ? `Remove ${book.title} from reading list` : `Add ${book.title} to reading list`} onClick={() => onStatusChange(book.id, book.status === 'list' ? 'read' : 'list')}><span aria-hidden="true">{book.status === 'list' ? '−' : '+'}</span> {book.status === 'list' ? 'Remove from list' : 'Add to reading list'}</button></div><div className="review-divider" />{review ? <div className="published-review"><div className="review-header"><div><p className="eyebrow">Owner’s note</p><div className="review-owner"><span className="owner-avatar">{OWNER.initials}</span><span><strong>{OWNER.name}</strong><small>Curated review · {formatDate(review.updatedAt)}</small></span></div></div><div className="review-score"><Stars rating={review.rating} large /><strong>{review.rating.toFixed(1)}</strong></div></div><p className="review-text">“{review.text}”</p><button className="button button-outline" onClick={onReview}><Icon name="pen" size={16} /> Edit my review</button></div> : <div className="unreviewed"><span className="unreviewed-mark"><Icon name="pen" size={19} /></span><div><p className="eyebrow">A blank page, for now</p><h2>This book is waiting for your take.</h2><p>No review yet — be the first note in the margin.</p></div><button className="button button-primary" onClick={onReview}>Write a review <Icon name="arrow" size={16} /></button></div>}</div></div></section>;
}

function ReviewEditor({ book, review, onCancel, onSave }: { book: Book; review?: Review; onCancel: () => void; onSave: (review: Review) => void }) {
  const [rating, setRating] = useState(review?.rating ?? 0);
  const [text, setText] = useState(review?.text ?? '');
  const canSave = rating > 0 && text.trim().length > 0;
  const submit = (event: FormEvent) => { event.preventDefault(); if (!canSave) return; onSave({ bookId: book.id, rating, text: text.trim(), updatedAt: new Date().toISOString().slice(0, 10), ownerId: OWNER.id }); };
  return <section className="editor section-wrap"><button className="back-button" onClick={onCancel}>← Back to {book.title}</button><div className="editor-shell"><div className="editor-heading"><p className="eyebrow"><span className="eyebrow-dot" /> Your reading journal</p><h1>{review ? 'Edit your note.' : 'Leave a little note.'}</h1><p>Capture the feeling this book left behind. Your review will appear on its shelf for fellow browsers.</p></div><div className="editor-book"><BookCover book={book} size="card" /><div><p className="eyebrow">Reviewing</p><h2>{book.title}</h2><p>{book.author}</p></div></div><form onSubmit={submit} className="review-form"><fieldset><legend>How many stars?</legend><div className="rating-row"><div className="rating-stars-input" role="radiogroup" aria-label="Book rating"><input type="range" min="0.5" max="5" step="0.5" value={rating || 0.5} onChange={(event) => setRating(Number(event.target.value))} aria-label="Rating from one half to five stars" /><Stars rating={rating} large /></div><output>{rating ? rating.toFixed(1) : '—'}<small>/ 5</small></output></div><div className="range-labels"><span>Not for me</span><span>Couldn’t put it down</span></div></fieldset><label className="textarea-label" htmlFor="review-text">Your review <span>{text.length}/500</span></label><textarea id="review-text" value={text} maxLength={500} onChange={(event) => setText(event.target.value)} placeholder="What stayed with you? A favourite line, a small feeling, a whole new way of seeing things…" rows={7} /><div className="editor-footer"><span><Icon name="spark" size={15} /> Saved only to this nook</span><div><button type="button" className="button button-quiet" onClick={onCancel}>Cancel</button><button type="submit" className="button button-primary" disabled={!canSave}>Save review <Icon name="arrow" size={16} /></button></div></div></form></div></section>;
}

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `book-${Date.now()}`; }

function AddBookEditor({ onCancel, onSave }: { onCancel: () => void; onSave: (book: Book) => void }) {
  const [title, setTitle] = useState(''); const [author, setAuthor] = useState(''); const [genre, setGenre] = useState<Genre>('Fiction'); const [cover, setCover] = useState(''); const [description, setDescription] = useState(''); const [status, setStatus] = useState<ReadingStatus>('list');
  const canSave = title.trim().length > 0 && author.trim().length > 0;
  const submit = (event: FormEvent) => { event.preventDefault(); if (!canSave) return; onSave({ id: slugify(title), title: title.trim(), author: author.trim(), genre, status, description: description.trim() || 'A new title waiting for its first note in the pageboxd shelves.', cover: cover.trim(), coverTone: '#4f536c', accent: '#c6ff4a', year: new Date().getFullYear(), pages: 0 }); };
  return <section className="editor section-wrap"><button className="back-button" onClick={onCancel}>← Back to all books</button><div className="editor-shell add-book-shell"><div className="editor-heading"><p className="eyebrow"><span className="eyebrow-dot" /> Owner’s catalogue desk</p><h1>Add a new book.</h1><p>Add a title to your pageboxd shelves now and keep building your personal library.</p></div><form onSubmit={submit} className="review-form add-book-form"><div className="add-book-grid"><label className="add-book-field"><span>Book title</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. The Secret History" required /></label><label className="add-book-field"><span>Author</span><input value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="e.g. Donna Tartt" required /></label><label className="add-book-field"><span>Genre</span><select value={genre} onChange={(event) => setGenre(event.target.value as Genre)}>{genres.filter((item): item is Genre => item !== 'All').map((item) => <option key={item} value={item}>{item}</option>)}</select></label><label className="add-book-field"><span>Reading-list status</span><select value={status} onChange={(event) => setStatus(event.target.value as ReadingStatus)}><option value="list">Add to reading list</option><option value="read">Read</option><option value="reading">Reading now</option></select></label><label className="add-book-field add-book-wide"><span>Cover image <small>paste an image URL</small></span><input type="url" value={cover} onChange={(event) => setCover(event.target.value)} placeholder="https://…/cover.jpg" /></label><label className="add-book-field add-book-wide"><span>Short description</span><textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={300} placeholder="What is this book about?" rows={5} /></label></div><div className="editor-footer"><span><Icon name="spark" size={15} /> Saved only to this nook</span><div><button type="button" className="button button-quiet" onClick={onCancel}>Cancel</button><button type="submit" className="button button-primary" disabled={!canSave}>Add book <Icon name="arrow" size={16} /></button></div></div></form></div></section>;
}

function formatDate(date: string) { return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }

function App() {
  const [path, setPath] = useState(window.location.pathname || '/');
  const [filters, setFilters] = useState<FilterState>(() => ({ ...emptyFilters, search: new URLSearchParams(window.location.search).get('q') ?? '' }));
  const [searchInput, setSearchInput] = useState(filters.search);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, ReadingStatus>>(() => { try { return JSON.parse(localStorage.getItem('pageboxd-statuses') || '{}'); } catch { return {}; } });
  const [addedBooks, setAddedBooks] = useState<Book[]>(() => { try { return JSON.parse(localStorage.getItem('pageboxd-added-books') || '[]'); } catch { return []; } });
  const allBooks = useMemo(() => [...books, ...addedBooks.filter((added) => !books.some((book) => book.id === added.id))], [addedBooks]);
  const collection = useMemo(() => allBooks.map((book) => statusOverrides[book.id] ? { ...book, status: statusOverrides[book.id] } : book), [allBooks, statusOverrides]);
  const [reviews, setReviews] = useState<Record<string, Review>>(() => {
    try { const saved = localStorage.getItem('booknook-reviews'); return saved ? { ...defaultReviews, ...JSON.parse(saved) } : defaultReviews; } catch { return defaultReviews; }
  });

  useEffect(() => { localStorage.setItem('booknook-reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('pageboxd-statuses', JSON.stringify(statusOverrides)); }, [statusOverrides]);
  useEffect(() => { localStorage.setItem('pageboxd-added-books', JSON.stringify(addedBooks)); }, [addedBooks]);
  useEffect(() => { const handlePop = () => setPath(window.location.pathname || '/'); window.addEventListener('popstate', handlePop); return () => window.removeEventListener('popstate', handlePop); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [path]);

  const navigate = (nextPath: string) => { window.history.pushState({}, '', nextPath); setPath(nextPath); };
  const openBook = (id: string) => navigate(`/book/${id}`);
  const browse = (preset: Partial<FilterState> = {}) => { setFilters({ ...emptyFilters, ...preset }); setSearchInput(preset.search ?? ''); navigate('/books'); };
  const changeStatus = (id: string, status: ReadingStatus) => setStatusOverrides((current) => ({ ...current, [id]: status }));
  const addBook = (book: Book) => { setAddedBooks((current) => [...current, book]); navigate('/books'); };
  const handleSearch = (event: FormEvent) => { event.preventDefault(); setFilters({ ...emptyFilters, search: searchInput }); navigate('/books'); };
  const routeBookId = path.match(/^\/(?:book|review)\/([^/]+)/)?.[1];
  const activeBook = routeBookId ? books.find((book) => book.id === routeBookId) : undefined;
  const isReviewRoute = path.startsWith('/review/');
  const isCatalog = path === '/books';
  const isAddBook = path === '/add-book';

  return <div className="app-shell"><header className="site-header"><div className="header-inner"><button className="brand" onClick={() => navigate('/')} aria-label="pageboxd home"><span className="brand-mark"><Icon name="box" size={19} /></span><span><strong>page</strong>boxd</span></button><nav className="main-nav" aria-label="Main navigation"><button className={path === '/' ? 'active' : ''} onClick={() => navigate('/')}>Home</button><button className={isCatalog ? 'active' : ''} onClick={() => browse()}>All books</button><button onClick={() => browse({ status: 'list' })}>Reading list <span className="nav-count">{collection.filter((book) => book.status === 'list').length}</span></button></nav><form className="header-search" onSubmit={handleSearch}><Icon name="search" size={16} /><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search pageboxd" aria-label="Search pageboxd" /></form><div className="header-owner"><span className="owner-avatar">{OWNER.initials}</span><span className="owner-label">{OWNER.name}’s pageboxd</span></div></div></header><main>{path === '/' && <Home collection={collection} reviews={reviews} onOpen={openBook} onBrowse={browse} onStatusChange={changeStatus} />}{isCatalog && <AllBooks collection={collection} reviews={reviews} onOpen={openBook} onStatusChange={changeStatus} onAddBook={() => navigate('/add-book')} initialFilters={filters} />}{isAddBook && <AddBookEditor onCancel={() => navigate('/books')} onSave={addBook} />}{activeBook && !isCatalog && !isAddBook && !isReviewRoute && <BookDetail book={activeBook} review={reviews[activeBook.id]} onBack={() => navigate('/books')} onReview={() => navigate(`/review/${activeBook.id}`)} onStatusChange={changeStatus} />}{activeBook && isReviewRoute && <ReviewEditor book={activeBook} review={reviews[activeBook.id]} onCancel={() => navigate(`/book/${activeBook.id}`)} onSave={(review) => { setReviews((current) => ({ ...current, [review.bookId]: review })); navigate(`/book/${activeBook.id}`); }} />}{!activeBook && !isCatalog && !isAddBook && path !== '/' && <div className="empty-state section-wrap"><span className="empty-icon"><Icon name="book" size={25} /></span><h2>This shelf is still being arranged.</h2><button className="button button-outline" onClick={() => navigate('/')}>Return home</button></div>}</main><footer className="site-footer"><div className="footer-inner"><div><button className="brand footer-brand" onClick={() => navigate('/')}><span className="brand-mark"><Icon name="box" size={17} /></span><span><strong>page</strong>boxd</span></button><p>Read it. Rate it. Remember it.</p></div><div className="footer-note"><span className="mini-stamp">PB</span><span>Owner-curated by {OWNER.name}<br /><small>Quietly opinionated<br />Made for the books that find us.</small></span></div><span className="footer-year">© 2026</span></div></footer></div>;
}

export default App;

type BookNookGlobal = typeof globalThis & { __bookNookRoot?: ReturnType<typeof createRoot> };
const bookNookGlobal = globalThis as BookNookGlobal;
const root = bookNookGlobal.__bookNookRoot ?? createRoot(document.getElementById('root')!);
bookNookGlobal.__bookNookRoot = root;
root.render(<App />);
