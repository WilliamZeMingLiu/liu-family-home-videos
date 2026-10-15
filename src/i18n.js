import { useEffect, useState } from "react";
import { LANG_PARAM, getParam, urlWith } from "./lib/url.js";

// `locale` drives date formatting and <html lang>; `short` is the toggle button label.
export const LANGUAGES = [
  { code: "en", locale: "en-US", short: "EN", name: "English" },
  { code: "hans", locale: "zh-CN", short: "简", name: "简体中文" },
  { code: "hant", locale: "zh-TW", short: "繁", name: "繁體中文" },
];

export const STRINGS = {
  en: {
    siteTitle: "Liu Family Home Videos",
    search: "Search videos",
    noMatch: (q) => `No videos match “${q}”.`,
    categories: "Categories",
    tabsLeft: "Scroll sections left",
    tabsRight: "Scroll sections right",
    videoCount: (n) => `${n} ${n === 1 ? "video" : "videos"}`,
    suggestion: "Memories for you",
    suggestionHint: "Picked at random. Tap one to watch.",
    shuffle: "Shuffle",
    language: "Language",
    close: "Close",
    copyLink: "Copy link",
    copied: "Link copied",
    previous: "Previous video",
    next: "Next video",
    previousShort: "Previous",
    nextShort: "Next",
    previousTo: (t) => `Previous: ${t}`,
    nextTo: (t) => `Next: ${t}`,
  },
  hans: {
    siteTitle: "刘家家庭录像",
    search: "搜索视频",
    noMatch: (q) => `没有与“${q}”相符的视频。`,
    categories: "分类",
    tabsLeft: "向左滚动分类",
    tabsRight: "向右滚动分类",
    videoCount: (n) => `${n} 个视频`,
    suggestion: "为你挑选的回忆",
    suggestionHint: "随机挑选，点一下就能观看。",
    shuffle: "换一批",
    language: "语言",
    close: "关闭",
    copyLink: "复制链接",
    copied: "链接已复制",
    previous: "上一个视频",
    next: "下一个视频",
    previousShort: "上一个",
    nextShort: "下一个",
    previousTo: (t) => `上一个：${t}`,
    nextTo: (t) => `下一个：${t}`,
  },
  hant: {
    siteTitle: "劉家家庭影片",
    search: "搜尋影片",
    noMatch: (q) => `沒有與「${q}」相符的影片。`,
    categories: "分類",
    tabsLeft: "向左捲動分類",
    tabsRight: "向右捲動分類",
    videoCount: (n) => `${n} 部影片`,
    suggestion: "為你挑選的回憶",
    suggestionHint: "隨機挑選，點一下就能觀看。",
    shuffle: "換一批",
    language: "語言",
    close: "關閉",
    copyLink: "複製連結",
    copied: "連結已複製",
    previous: "上一部影片",
    next: "下一部影片",
    previousShort: "上一部",
    nextShort: "下一部",
    previousTo: (t) => `上一部：${t}`,
    nextTo: (t) => `下一部：${t}`,
  },
};

// A text field in videos.js is either a plain string or { en, hans, hant }.
export function localize(text, lang) {
  if (typeof text === "string") return text;
  return text[lang] ?? text.en ?? Object.values(text)[0];
}

// Every translation of a text field, for searching across languages.
export const allTranslations = (text) =>
  typeof text === "string" ? [text] : Object.values(text);

const STORAGE_KEY = "lang";

const isLanguage = (code) => LANGUAGES.some((l) => l.code === code);

const DEFAULT_LANGUAGE = "en";

// Priority: the link's ?lang= (optional), then this browser's saved pick, then English.
function initialLanguage() {
  const fromLink = getParam(LANG_PARAM);
  if (isLanguage(fromLink)) return fromLink;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    // storage unavailable; use the default
  }
  return DEFAULT_LANGUAGE;
}

export const localeFor = (lang) =>
  LANGUAGES.find((l) => l.code === lang).locale;

// The current language is saved to this browser, whether it came from a tap on the
// toggle or from a shared link's ?lang=.
export function useLanguage() {
  const [lang, setLang] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = localeFor(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // not persisted; the language still applies for this visit
    }
  }, [lang]);

  // A shared link's ?lang= has been applied and saved; drop it to keep the address clean.
  useEffect(() => {
    if (getParam(LANG_PARAM) !== null) {
      window.history.replaceState(
        window.history.state,
        "",
        urlWith({ [LANG_PARAM]: null }),
      );
    }
  }, []);

  return [lang, setLang];
}
