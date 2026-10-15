// ─────────────────────────────────────────────────────────────
//  This is the only file you need to edit to add or change videos.
//
//  categories: the sections shown on the page (in this order).
//    playlist  the YouTube playlist the section mirrors; `npm run sync` uses it to
//              find videos that are in the playlist but not in this file yet.
//  videos: shown in the order listed here, grouped by category.
//    id        6-char random id used in the URL (?v=<id>). Run `npm run new-id`.
//              Never reuse or change it once shared, or old links break.
//    youtube   a YouTube video ID or any full YouTube link (watch, youtu.be, shorts).
//    title     shown under the thumbnail. Either one string, or a translation per
//              language: { en: "...", hans: "简体", hant: "繁體" }. A missing language
//              falls back to English. Category names work the same way.
//    category  a slug from `categories` below.
//    date      (optional) YYYY-MM-DD, shown under the title.
// ─────────────────────────────────────────────────────────────

export const categories = [
  { slug: "howard-billy", name: "Howard & Billy", playlist: "PL_EjF6BFmbfX-1Ftnzwhhdx757jJMHHHm" },
  { slug: "howard", name: "Howard", playlist: "PL_EjF6BFmbfV-3YaROWCJtPoftRucwAu0" },
  { slug: "cousins", name: { en: "Cousins", hans: "堂表兄弟姐妹", hant: "堂表兄弟姊妹" }, playlist: "PL_EjF6BFmbfXQYQRn-oLdyMFqngq7l7c3" },
  { slug: "lkc-weddings", name: { en: "LKC Opening & Weddings", hans: "LKC 开幕与婚礼", hant: "LKC 開幕與婚禮" }, playlist: "PL_EjF6BFmbfXUfTKB8wwHaVNY88gK1hVe" },
  { slug: "family-trips", name: { en: "Family Trips", hans: "家庭旅行", hant: "家庭旅行" }, playlist: "PL_EjF6BFmbfXn9PZq7B-jRhg4kVp0nVCt" },
];

export const videos = [
  // Howard & Billy
  { id: "agxw1u", youtube: "01edDjcJi-c", title: { en: "Bumper Cart", hans: "碰碰车", hant: "碰碰車" }, category: "howard-billy" },
  { id: "gx52wi", youtube: "0SuKsdPgOuE", title: { en: "At the Aquarium", hans: "在水族馆", hant: "在水族館" }, category: "howard-billy" },
  { id: "q6wdyg", youtube: "2IZpvageG7o", title: { en: "Walking through Resort", hans: "在度假村散步", hant: "在度假村散步" }, category: "howard-billy" },
  { id: "innaku", youtube: "38SIhsvrO5E", title: { en: "At Japan Airport", hans: "在日本机场", hant: "在日本機場" }, category: "howard-billy" },
  { id: "8qv2jh", youtube: "4BPp0X4IgWk", title: { en: "At the Great Wall", hans: "在长城", hant: "在長城" }, category: "howard-billy" },
  { id: "dkotm7", youtube: "4lAhEuLwydk", title: { en: "Playing around at Resort", hans: "在度假村玩耍", hant: "在度假村玩耍" }, category: "howard-billy" },
  { id: "fk0hd8", youtube: "5i8Xq7-29JY", title: { en: "At Train Station and McDonalds", hans: "在火车站和麦当劳", hant: "在火車站和麥當勞" }, category: "howard-billy" },
  { id: "997o5q", youtube: "63MLtEgACgY", title: { en: "In Hotel Room", hans: "在酒店房间", hant: "在飯店房間" }, category: "howard-billy" },
  { id: "1s3qdt", youtube: "DE58ABNvXzE", title: { en: "At Kid's Area", hans: "在儿童区", hant: "在兒童區" }, category: "howard-billy" },
  { id: "4uk2df", youtube: "EPY4hz5Rch0", title: { en: "At Amusement Park and Hotel", hans: "在游乐园和酒店", hant: "在遊樂園和飯店" }, category: "howard-billy" },
  { id: "qkvlj3", youtube: "EUwQWuf9p30", title: { en: "On a Playground", hans: "在游乐场", hant: "在遊樂場" }, category: "howard-billy" },
  { id: "iygmms", youtube: "Kc-rnqvEPFg", title: { en: "In Hotel and Restaurant", hans: "在酒店和餐厅", hant: "在飯店和餐廳" }, category: "howard-billy" },
  { id: "65m0e9", youtube: "LotCQdDQBe4", title: { en: "Sightseeing outside Resort", hans: "在度假村外观光", hant: "在度假村外觀光" }, category: "howard-billy" },
  { id: "9jduvc", youtube: "N1eHa68LRqU", title: { en: "Walking at Night in Disneyland", hans: "夜游迪士尼乐园", hant: "夜遊迪士尼樂園" }, category: "howard-billy" },
  { id: "h2hy10", youtube: "Oy-rpe4mtrM", title: { en: "With 外公外婆", hans: "和外公外婆", hant: "和外公外婆" }, category: "howard-billy" },
  { id: "h8xv0e", youtube: "P3Nsu2bBdbc", title: { en: "At the Forbidden City", hans: "在故宫", hant: "在故宮" }, category: "howard-billy" },
  { id: "plb6lb", youtube: "P_M1o1_6IqA", title: { en: "In Streetcar", hans: "坐有轨电车", hant: "坐路面電車" }, category: "howard-billy" },
  { id: "ihknwp", youtube: "Pi9kz-Gef2Q", title: { en: "At Swimming Pool", hans: "在游泳池", hant: "在游泳池" }, category: "howard-billy" },
  { id: "anace2", youtube: "RjbF697mA8I", title: { en: "Watching Show", hans: "看表演", hant: "看表演" }, category: "howard-billy" },
  { id: "xaoikd", youtube: "Tg3rF1IibKU", title: { en: "Petting Kangaroos", hans: "摸袋鼠", hant: "摸袋鼠" }, category: "howard-billy" },
  { id: "l15e5o", youtube: "ULwuX5Zxl7k", title: { en: "Waiting at Airport", hans: "在机场候机", hant: "在機場候機" }, category: "howard-billy" },
  { id: "vkxi2j", youtube: "V_pqtPNoFmw", title: { en: "In London Eye", hans: "坐伦敦眼", hant: "坐倫敦眼" }, category: "howard-billy" },
  { id: "6h6f49", youtube: "YBL_q8ioVwc", title: { en: "At Family Dinner", hans: "家庭晚餐", hant: "家庭晚餐" }, category: "howard-billy" },
  { id: "292dov", youtube: "a9gpXsarkWM", title: { en: "Sightseeing at Blue Mountain", hans: "游览蓝山", hant: "遊覽藍山" }, category: "howard-billy" },
  { id: "at7ua5", youtube: "cXAefRpM4Bc", title: { en: "Sightseeing in Indonesia", hans: "印尼观光", hant: "印尼觀光" }, category: "howard-billy" },
  { id: "avznvj", youtube: "d9kxJ_ul_XU", title: { en: "At Changzhou House", hans: "在常州的家", hant: "在常州的家" }, category: "howard-billy" },
  { id: "sn4qkp", youtube: "dggB0Gn2BxE", title: { en: "Night time Walk in Beijing", hans: "北京夜游", hant: "北京夜遊" }, category: "howard-billy" },
  { id: "gb9782", youtube: "dh5t4xqhsjA", title: { en: "At Summer Palace", hans: "在颐和园", hant: "在頤和園" }, category: "howard-billy" },
  { id: "i843uk", youtube: "hDyGh2SNFhM", title: { en: "Waiting for Show", hans: "等着看表演", hant: "等著看表演" }, category: "howard-billy" },
  { id: "3shoeb", youtube: "iuxvKAb0R_Q", title: { en: "Amusement Park at Night", hans: "夜晚的游乐园", hant: "夜晚的遊樂園" }, category: "howard-billy" },
  { id: "3ifqj4", youtube: "j1bfdJXa8Es", title: { en: "At the Pool", hans: "在泳池", hant: "在泳池" }, category: "howard-billy" },
  { id: "pcfc9h", youtube: "msnVGWkITLM", title: { en: "At the Airport", hans: "在机场", hant: "在機場" }, category: "howard-billy" },
  { id: "2f7duc", youtube: "n-AXO-VQUsU", title: { en: "Jumping on Bed", hans: "在床上跳来跳去", hant: "在床上跳來跳去" }, category: "howard-billy" },
  { id: "m28u26", youtube: "n2mtyctTSYM", title: { en: "At Japanese Amusement Park", hans: "在日本游乐园", hant: "在日本遊樂園" }, category: "howard-billy" },
  { id: "l6nezg", youtube: "nfdrd5JAEp0", title: { en: "Howard's Birthday in Shanghai", hans: "Howard 在上海过生日", hant: "Howard 在上海過生日" }, category: "howard-billy" },
  { id: "9263v5", youtube: "p7b3uuvRimw", title: { en: "Playing Guitar", hans: "弹吉他", hant: "彈吉他" }, category: "howard-billy" },
  { id: "pq0kjk", youtube: "rhNzxDJAseg", title: { en: "Sightseeing in Spain", hans: "西班牙观光", hant: "西班牙觀光" }, category: "howard-billy" },
  { id: "w7pblz", youtube: "s833HoviNsk", title: { en: "At Swimming Pool and Slides", hans: "在泳池玩水滑梯", hant: "在泳池玩滑水道" }, category: "howard-billy" },
  { id: "7xbliu", youtube: "ueqnXeKBK5s", title: { en: "At Disney Show", hans: "看迪士尼表演", hant: "看迪士尼表演" }, category: "howard-billy" },
  { id: "ymto6k", youtube: "vHy5aIlulmY", title: { en: "Dinner and Listening to Music", hans: "吃晚餐、听音乐", hant: "吃晚餐、聽音樂" }, category: "howard-billy" },
  { id: "a2xlrq", youtube: "xPefQHp7rvQ", title: { en: "At the Dinosaur Park", hans: "在恐龙公园", hant: "在恐龍公園" }, category: "howard-billy" },
  { id: "ipxg2k", youtube: "-QufIl-vtYE", title: { en: "Hotel in Bali", hans: "巴厘岛的酒店", hant: "峇里島的飯店" }, category: "howard-billy" },
  { id: "zq97wb", youtube: "481NAZfsubY", title: { en: "Discovery Bay", hans: "愉景湾", hant: "愉景灣" }, category: "howard-billy" },
  { id: "yvudto", youtube: "5UFWs10rhbo", title: { en: "In the Car", hans: "在车上", hant: "在車上" }, category: "howard-billy" },
  { id: "javxbe", youtube: "6ulTiL5q3EM", title: { en: "At Indonesia Resort", hans: "在印尼度假村", hant: "在印尼度假村" }, category: "howard-billy" },
  { id: "0jxjwq", youtube: "QdprlxQ2rMg", title: { en: "Star Cruise", hans: "丽星邮轮", hant: "麗星郵輪" }, category: "howard-billy" },
  { id: "m7cuob", youtube: "_xFttoIgCIY", title: { en: "At Home", hans: "在家", hant: "在家" }, category: "howard-billy" },
  { id: "hvhxlh", youtube: "dbX0wkTpfhg", title: { en: "At Resort", hans: "在度假村", hant: "在度假村" }, category: "howard-billy" },
  { id: "zk7ro4", youtube: "fC3FluvIVbs", title: { en: "At Home", hans: "在家", hant: "在家" }, category: "howard-billy" },

  // Howard
  { id: "kz5s9w", youtube: "g8Z8EOTkOKQ", title: { en: "CNY at School", hans: "在学校过春节", hant: "在學校過春節" }, category: "howard" },
  { id: "kxywzv", youtube: "5Ilh6Q1-Z6A", title: { en: "Howard on Stage", hans: "Howard 在舞台上", hant: "Howard 在舞台上" }, category: "howard" },
  { id: "9jfkb4", youtube: "5pXsrgRjpmQ", title: { en: "Howard in Paris", hans: "Howard 在巴黎", hant: "Howard 在巴黎" }, category: "howard" },
  { id: "5xhonl", youtube: "7owSDq31KkA", title: { en: "Howard in Tokyo", hans: "Howard 在东京", hant: "Howard 在東京" }, category: "howard" },
  { id: "ufrlwv", youtube: "MlyxC1V0VOY", title: { en: "Howard in Macau", hans: "Howard 在澳门", hant: "Howard 在澳門" }, category: "howard" },
  { id: "5a1090", youtube: "ODbjDctBScQ", title: { en: "Howard at Dinner in LA", hans: "Howard 在洛杉矶吃晚餐", hant: "Howard 在洛杉磯吃晚餐" }, category: "howard" },
  { id: "lqpk4m", youtube: "QIs-xEDeiF4", title: { en: "Howard in LA Airport", hans: "Howard 在洛杉矶机场", hant: "Howard 在洛杉磯機場" }, category: "howard" },
  { id: "diba53", youtube: "T84JQ57e1iI", title: { en: "Howard in London", hans: "Howard 在伦敦", hant: "Howard 在倫敦" }, category: "howard" },
  { id: "m8853d", youtube: "WlSvByKTqmk", title: { en: "Howard Playing at Home", hans: "Howard 在家玩", hant: "Howard 在家玩" }, category: "howard" },
  { id: "lna0ai", youtube: "ki7649axNZI", title: { en: "Howard in Play Area", hans: "Howard 在游戏区", hant: "Howard 在遊戲區" }, category: "howard" },
  { id: "d6mmfg", youtube: "nqJ4p0r3sp8", title: { en: "Howard at the Airport", hans: "Howard 在机场", hant: "Howard 在機場" }, category: "howard" },
  { id: "ungbi4", youtube: "p1O11IvZUnY", title: { en: "Howard at Disneyland", hans: "Howard 在迪士尼乐园", hant: "Howard 在迪士尼樂園" }, category: "howard" },
  { id: "agfvyo", youtube: "p50WAZwjeyQ", title: { en: "Howard in Spain", hans: "Howard 在西班牙", hant: "Howard 在西班牙" }, category: "howard" },
  { id: "0kfcr3", youtube: "u-32a0mPEpI", title: { en: "Howard in Orlando", hans: "Howard 在奥兰多", hant: "Howard 在奧蘭多" }, category: "howard" },
  { id: "f9k6fj", youtube: "vA-pAZdgiFI", title: { en: "Howard in NY", hans: "Howard 在纽约", hant: "Howard 在紐約" }, category: "howard" },

  // Cousins
  { id: "dp6f31", youtube: "AarsTI_zzZI", title: { en: "Eating Lunch Outside", hans: "在户外吃午餐", hant: "在戶外吃午餐" }, category: "cousins" },
  { id: "r2xwzi", youtube: "DGZCOjj4w9w", title: { en: "At London House", hans: "在伦敦的家", hant: "在倫敦的家" }, category: "cousins" },
  { id: "rv1li9", youtube: "F2WNx-hxyNE", title: { en: "At the Park and on a Boat", hans: "在公园和船上", hant: "在公園和船上" }, category: "cousins" },
  { id: "sgeq0v", youtube: "TUO5D_y3u9E", title: { en: "At Australia House", hans: "在澳大利亚的家", hant: "在澳洲的家" }, category: "cousins" },
  { id: "nxwdy9", youtube: "ajhAREs8z1o", title: { en: "Walking at Darling Harbour", hans: "漫步达令港", hant: "漫步達令港" }, category: "cousins" },
  { id: "h5x9x6", youtube: "cuDFHIR4JWU", title: { en: "Sailing and Making Pottery", hans: "坐帆船、做陶艺", hant: "坐帆船、做陶藝" }, category: "cousins" },
  { id: "uuur6z", youtube: "sZHs3Nb3TUc", title: { en: "Eating Lunch Together", hans: "一起吃午餐", hant: "一起吃午餐" }, category: "cousins" },
  { id: "5oyfy7", youtube: "zIKxWVvtYaw", title: { en: "Eating Dinner Together in Australia", hans: "在澳大利亚一起吃晚餐", hant: "在澳洲一起吃晚餐" }, category: "cousins" },
  { id: "jl1vq9", youtube: "Li5KJdR0Vzc", title: { en: "Dinner at Tokyo", hans: "在东京吃晚餐", hant: "在東京吃晚餐" }, category: "cousins" },
  { id: "v70tm7", youtube: "eLQqEIyY2UU", title: { en: "Grandma's Memorial Ceremony", hans: "奶奶的追思会", hant: "奶奶的追思會" }, category: "cousins" },
  { id: "2fx3rr", youtube: "j9EHNDsy6bk", title: { en: "CNY 2001", hans: "2001年春节", hant: "2001年春節" }, category: "cousins" },

  // LKC Opening & Weddings
  { id: "7axtw8", youtube: "B8joP4q28h0", title: { en: "LKC Opening", hans: "LKC 开幕", hant: "LKC 開幕" }, category: "lkc-weddings" },
  { id: "xqu5yg", youtube: "c3zspQRPyeQ", title: { en: "Nancy & Michael Wedding", hans: "Nancy & Michael 的婚礼", hant: "Nancy & Michael 的婚禮" }, category: "lkc-weddings" },
  { id: "3dd1yr", youtube: "nsu5C70ayMk", title: { en: "Jack & Agnes Wedding 1986", hans: "Jack & Agnes 的婚礼 1986", hant: "Jack & Agnes 的婚禮 1986" }, category: "lkc-weddings" },

  // Family Trips
  { id: "bfngyy", youtube: "8TXw4apJXT4", title: { en: "Los Angeles, USA 1999", hans: "美国洛杉矶 1999", hant: "美國洛杉磯 1999" }, category: "family-trips" },
  { id: "yicpon", youtube: "E1jOhLpGDq8", title: { en: "London, UK 1999", hans: "英国伦敦 1999", hant: "英國倫敦 1999" }, category: "family-trips" },
  { id: "5kgk1p", youtube: "Ft6LUmDH7bI", title: { en: "Macau, China 1999", hans: "中国澳门 1999", hant: "中國澳門 1999" }, category: "family-trips" },
  { id: "l2mc7i", youtube: "IcMdN2HvVhM", title: { en: "Orlando, USA 1999", hans: "美国奥兰多 1999", hant: "美國奧蘭多 1999" }, category: "family-trips" },
  { id: "q8jt0f", youtube: "LUHzL9IuZcA", title: { en: "Nice, France & Monte Carlo, Monaco 2001", hans: "法国尼斯和摩纳哥蒙特卡洛 2001", hant: "法國尼斯和摩納哥蒙地卡羅 2001" }, category: "family-trips" },
  { id: "49jc4k", youtube: "MVt2Tju0Dcw", title: { en: "Bali, Indonesia 2001", hans: "印尼巴厘岛 2001", hant: "印尼峇里島 2001" }, category: "family-trips" },
  { id: "va24gn", youtube: "NXIExlrxf10", title: { en: "Nanjing, China 1999", hans: "中国南京 1999", hant: "中國南京 1999" }, category: "family-trips" },
  { id: "els0v5", youtube: "OS8Boid3rQM", title: { en: "Valencia, Spain 1999", hans: "西班牙瓦伦西亚 1999", hant: "西班牙瓦倫西亞 1999" }, category: "family-trips" },
  { id: "198sqp", youtube: "PKoGL1V7LAA", title: { en: "New York City, USA 1999", hans: "美国纽约 1999", hant: "美國紐約 1999" }, category: "family-trips" },
  { id: "lk1bhm", youtube: "R439hsK5Qvw", title: { en: "Changzhou, China 1999", hans: "中国常州 1999", hant: "中國常州 1999" }, category: "family-trips" },
  { id: "nax674", youtube: "R5LiR_EqMa8", title: { en: "Tokyo, Japan 1999", hans: "日本东京 1999", hant: "日本東京 1999" }, category: "family-trips" },
  { id: "llgl80", youtube: "WFO8igQb0rU", title: { en: "Sydney, Australia 2002", hans: "澳大利亚悉尼 2002", hant: "澳洲雪梨 2002" }, category: "family-trips" },
  { id: "0s7w6h", youtube: "ZubgpeBDE6M", title: { en: "Paris, France 1999", hans: "法国巴黎 1999", hant: "法國巴黎 1999" }, category: "family-trips" },
  { id: "c76l08", youtube: "_fTuRnwBv8M", title: { en: "Star Cruise · Ha Long Bay, Vietnam · Fuzhou, China 1999", hans: "丽星邮轮 · 越南下龙湾 · 中国福州 1999", hant: "麗星郵輪 · 越南下龍灣 · 中國福州 1999" }, category: "family-trips" },
  { id: "5azckm", youtube: "bDbTmzeTXfc", title: { en: "Shanghai, China 200?", hans: "中国上海 200?", hant: "中國上海 200?" }, category: "family-trips" },
  { id: "qap9gc", youtube: "c-EPfQEG5Hg", title: { en: "Penang, Malaysia 1999", hans: "马来西亚槟城 1999", hant: "馬來西亞檳城 1999" }, category: "family-trips" },
  { id: "xnrcii", youtube: "hzhXHtspItw", title: { en: "Beijing, China 2001", hans: "中国北京 2001", hant: "中國北京 2001" }, category: "family-trips" },
  { id: "5jl07c", youtube: "kM-dPZ7GCqQ", title: { en: "Shenzhen, China 1999", hans: "中国深圳 1999", hant: "中國深圳 1999" }, category: "family-trips" },
  { id: "b4ko8i", youtube: "kXZxHhiIbTI", title: { en: "Langkawi, Malaysia 2000", hans: "马来西亚兰卡威 2000", hant: "馬來西亞蘭卡威 2000" }, category: "family-trips" },
  { id: "yq9uza", youtube: "nic4Z8I1OKI", title: { en: "Osaka, Japan 2001", hans: "日本大阪 2001", hant: "日本大阪 2001" }, category: "family-trips" },
  { id: "q5x3fp", youtube: "pXDWdNAqer0", title: { en: "Barcelona, Spain 1999", hans: "西班牙巴塞罗那 1999", hant: "西班牙巴塞隆納 1999" }, category: "family-trips" },
  { id: "ywfogw", youtube: "rO23FyNfyGM", title: { en: "Kuala Lumpur & Singapore, Malaysia 2001", hans: "马来西亚吉隆坡和新加坡 2001", hant: "馬來西亞吉隆坡和新加坡 2001" }, category: "family-trips" },
  { id: "vwjmko", youtube: "wwM8pfR2Dig", title: { en: "Discovery Bay, HK 1999", hans: "香港愉景湾 1999", hant: "香港愉景灣 1999" }, category: "family-trips" },
  { id: "z6prmr", youtube: "x82iMKvS2T8", title: { en: "London, UK 2001", hans: "英国伦敦 2001", hant: "英國倫敦 2001" }, category: "family-trips" },
];
