module.exports = {
  name: "kipr1",
  shortDesc:
    "Лучшие предложения жилой недвижимости на Северном Кипре от инвестиционной компании Heritage Investments",
  url: "",
  authorEmail: "kipr1@gmail.com",
  authorHandle: "@kipr1com",
  authorName: "kipr1",
  postsPerPage: 8,
  socialImage: "/img/social.jpg",
  theme: {
    primary: {
      background: "#fefefe",
      text: "#113366",
      highlight: "#ddcc77",
    },
    secondary: {
      background: "#113366",
      text: "#ddcc77",
      highlight: "#3366cc",
    },
  },

  keystone: {
    comments: false,
    bookmarks: false,
    claps: false,
    login: false,
  },
  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: false,
};
