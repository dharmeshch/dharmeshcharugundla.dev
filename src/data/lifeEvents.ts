export const BIRTH_DATE = new Date("1994-08-23");

export type Category = "personal" | "education" | "work" | "travel";

export type Phase = {
  label: string;
  start: Date;
  end: Date;
  color: string;
};

export const phases: Phase[] = [
  {
    label: "Early Childhood",
    start: new Date("1994-08-23"),
    end: new Date("1999-06-01"),
    color: "bg-violet-800",
  },
  {
    label: "School · Gampalagudem",
    start: new Date("1999-06-01"),
    end: new Date("2005-06-01"),
    color: "bg-teal-800",
  },
  {
    label: "School · Hyderabad",
    start: new Date("2005-06-01"),
    end: new Date("2006-06-01"),
    color: "bg-sky-700",
  },
  {
    label: "School · Vijayawada",
    start: new Date("2006-06-01"),
    end: new Date("2011-06-01"),
    color: "bg-orange-800",
  },
  {
    label: "Amrita · Bangalore",
    start: new Date("2011-08-01"),
    end: new Date("2015-06-01"),
    color: "bg-pink-800",
  },
  {
    label: "TCS · Bangalore",
    start: new Date("2015-10-01"),
    end: new Date("2017-07-01"),
    color: "bg-indigo-800",
  },
  {
    label: "ASU · Arizona",
    start: new Date("2017-08-01"),
    end: new Date("2019-05-01"),
    color: "bg-yellow-700",
  },
  {
    label: "Houzz",
    start: new Date("2019-07-01"),
    end: new Date("2020-06-30"),
    color: "bg-lime-800",
  },
  {
    label: "Bloomberg",
    start: new Date("2020-07-01"),
    end: new Date("2024-02-29"),
    color: "bg-blue-800",
  },
  {
    label: "Meta",
    start: new Date("2024-03-01"),
    end: new Date("2099-01-01"),
    color: "bg-cyan-800",
  },
];

// Milestone birthdays
const milestoneAges = [5, 10, 13, 16, 18, 21, 25, 30];
const birthdayEvents = milestoneAges.map((age) => ({
  date: new Date(`${1994 + age}-08-23`),
  label: `Turned ${age}`,
  emoji: "🎂",
  category: "personal" as Category,
}));

export const events: { date: Date; label: string; emoji: string; category: Category }[] = [
  ...birthdayEvents,

  // Personal
  { date: new Date("1994-08-23"), label: "Born in Gampalagudem, India", emoji: "👶", category: "personal" },
  { date: new Date("2022-02-03"), label: "Got engaged", emoji: "💍", category: "personal" },
  { date: new Date("2022-04-16"), label: "Got married", emoji: "💒", category: "personal" },
  { date: new Date("2020-02-02"), label: "Bought first car", emoji: "🚗", category: "personal" },

  // Education
  { date: new Date("1999-06-01"), label: "Started school in Gampalagudem", emoji: "🏫", category: "education" },
  { date: new Date("2011-06-01"), label: "Completed 12th grade", emoji: "📝", category: "education" },
  { date: new Date("2011-08-01"), label: "Started B.Tech at Amrita, Bangalore", emoji: "📚", category: "education" },
  { date: new Date("2015-06-01"), label: "Graduated B.Tech in Computer Science", emoji: "🎓", category: "education" },
  { date: new Date("2019-05-06"), label: "Graduated M.S. Computer Science · ASU (GPA 3.93)", emoji: "🎓", category: "education" },

  // Travel / Moves
  { date: new Date("2005-06-01"), label: "Moved to Hyderabad", emoji: "🏙️", category: "travel" },
  { date: new Date("2006-06-01"), label: "Moved to Vijayawada", emoji: "🏙️", category: "travel" },
  { date: new Date("2017-08-01"), label: "Moved to the US", emoji: "✈️", category: "travel" },
  { date: new Date("2017-09-01"), label: "Grand Canyon", emoji: "🏜️", category: "travel" },
  { date: new Date("2017-12-01"), label: "Lake Tahoe", emoji: "🏔️", category: "travel" },
  { date: new Date("2018-03-05"), label: "Arches National Park", emoji: "🌄", category: "travel" },
  { date: new Date("2018-05-01"), label: "Universal Studios & Six Flags · LA", emoji: "🎢", category: "travel" },
  { date: new Date("2018-11-01"), label: "Antelope Canyon", emoji: "🏜️", category: "travel" },
  { date: new Date("2018-12-01"), label: "Travelled to Hyderabad, India", emoji: "🇮🇳", category: "travel" },
  { date: new Date("2019-05-06"), label: "Graduation Ceremony · ASU", emoji: "🎓", category: "travel" },
  { date: new Date("2019-06-01"), label: "Zion National Park", emoji: "🏞️", category: "travel" },
  { date: new Date("2019-06-29"), label: "Goodbye Tempe · Moved to California", emoji: "🌴", category: "travel" },
  { date: new Date("2021-02-09"), label: "Moved to New Jersey", emoji: "🏙️", category: "travel" },
  { date: new Date("2021-08-01"), label: "Yosemite National Park", emoji: "🏔️", category: "travel" },
  { date: new Date("2022-01-01"), label: "Travelled to India after COVID", emoji: "🇮🇳", category: "travel" },
  { date: new Date("2022-06-19"), label: "Niagara Falls State Park", emoji: "💧", category: "travel" },
  { date: new Date("2022-09-01"), label: "Rhode Island", emoji: "⚓", category: "travel" },
  { date: new Date("2023-09-01"), label: "Parents visited the US", emoji: "👨‍👩‍👦", category: "personal" },
  { date: new Date("2023-09-19"), label: "Walt Disney World · Florida", emoji: "🏰", category: "travel" },
  { date: new Date("2024-02-17"), label: "Alaska · Fairbanks", emoji: "🌌", category: "travel" },
  { date: new Date("2024-06-01"), label: "Grand Teton · Yellowstone · Glacier National Parks", emoji: "🏔️", category: "travel" },
  { date: new Date("2024-09-01"), label: "Rocky Mountains National Park · Colorado", emoji: "⛰️", category: "travel" },
  { date: new Date("2025-04-01"), label: "Upstate New York", emoji: "🍂", category: "travel" },
  { date: new Date("2025-07-01"), label: "Dubai", emoji: "🏙️", category: "travel" },
  { date: new Date("2025-12-31"), label: "Maui, Hawaii", emoji: "🌺", category: "travel" },
  { date: new Date("2026-01-04"), label: "Big Island, Hawaii", emoji: "🌋", category: "travel" },

  // Work
  { date: new Date("2015-10-01"), label: "Joined Tata Consultancy Services · Bangalore", emoji: "💼", category: "work" },
  { date: new Date("2017-07-01"), label: "Left TCS · Moved to ASU", emoji: "✈️", category: "work" },
  { date: new Date("2017-09-15"), label: "CYR3CON Co-op", emoji: "💻", category: "work" },
  { date: new Date("2019-07-01"), label: "Joined Houzz · Palo Alto", emoji: "💼", category: "work" },
  { date: new Date("2020-07-01"), label: "Joined Bloomberg · New York", emoji: "💼", category: "work" },
  { date: new Date("2024-03-01"), label: "Joined Meta · New York", emoji: "💼", category: "work" },
];
