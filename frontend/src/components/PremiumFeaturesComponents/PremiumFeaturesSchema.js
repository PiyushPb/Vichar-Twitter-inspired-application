export const premiumFeaturesSchema = [
  {
    id: 1,
    title: "News Summerization",
    description:
      "Get access to our news summarization service. Post a news article link and let the ai handle the magic ✨ for you.",
    premiumAccess: ["premium", "premiumPlus"],
    path: "/newsSummerization",
  },
  {
    id: 2,
    title: "Image genration from prompt",
    description:
      "Get access to our image genration service. Post a prompt and let the ai handle the magic ✨ for you.",
    premiumAccess: ["premiumPlus"],
    path: "/imageGenration",
  },
];
