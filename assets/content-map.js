// assets/content-map.js
const CONTENT_MAP = {
  sections: [
    {
      id: 'home',
      title: '首页',
      tags: ['乐鱼体育', '首页推荐', '赛事速递'],
      url: 'https://zh-home-leyusports.com.cn',
      description: '乐鱼体育官方首页，提供最新体育赛事资讯与直播入口'
    },
    {
      id: 'football',
      title: '足球',
      tags: ['乐鱼体育', '足球', '英超', '欧冠', '西甲'],
      url: 'https://zh-home-leyusports.com.cn/football',
      description: '乐鱼体育足球频道，涵盖全球顶级足球联赛'
    },
    {
      id: 'basketball',
      title: '篮球',
      tags: ['乐鱼体育', '篮球', 'NBA', 'CBA', '国际篮球'],
      url: 'https://zh-home-leyusports.com.cn/basketball',
      description: '乐鱼体育篮球专区，NBA与CBA精彩对决'
    },
    {
      id: 'tennis',
      title: '网球',
      tags: ['乐鱼体育', '网球', '大满贯', 'ATP', 'WTA'],
      url: 'https://zh-home-leyusports.com.cn/tennis',
      description: '乐鱼体育网球赛事，大满贯与巡回赛全覆盖'
    },
    {
      id: 'esports',
      title: '电竞',
      tags: ['乐鱼体育', '电竞', '英雄联盟', 'DOTA2', 'CSGO'],
      url: 'https://zh-home-leyusports.com.cn/esports',
      description: '乐鱼体育电竞频道，热门电竞赛事直播与回放'
    }
  ],
  keywords: [
    '乐鱼体育',
    '体育赛事',
    '直播',
    '比分',
    '新闻',
    '足球',
    '篮球',
    '网球',
    '电竞'
  ]
};

function searchContent(query, caseSensitive = false) {
  if (!query || typeof query !== 'string') {
    return [];
  }

  const searchTerm = caseSensitive ? query.trim() : query.trim().toLowerCase();
  if (searchTerm.length === 0) {
    return [];
  }

  const results = [];

  for (const section of CONTENT_MAP.sections) {
    let match = false;

    // Search in title
    const title = caseSensitive ? section.title : section.title.toLowerCase();
    if (title.includes(searchTerm)) {
      match = true;
    }

    // Search in tags
    if (!match) {
      for (const tag of section.tags) {
        const tagText = caseSensitive ? tag : tag.toLowerCase();
        if (tagText.includes(searchTerm)) {
          match = true;
          break;
        }
      }
    }

    // Search in description
    if (!match) {
      const desc = caseSensitive ? section.description : section.description.toLowerCase();
      if (desc.includes(searchTerm)) {
        match = true;
      }
    }

    // Search in url
    if (!match) {
      const url = caseSensitive ? section.url : section.url.toLowerCase();
      if (url.includes(searchTerm)) {
        match = true;
      }
    }

    if (match) {
      results.push(section);
    }
  }

  return results;
}

function filterByTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) {
    return [];
  }

  const normalizedTags = tags.map(t => t.toLowerCase().trim());
  const results = [];

  for (const section of CONTENT_MAP.sections) {
    const sectionTags = section.tags.map(t => t.toLowerCase());
    const hasAllTags = normalizedTags.every(t => sectionTags.includes(t));

    if (hasAllTags) {
      results.push(section);
    }
  }

  return results;
}

function getSectionById(id) {
  if (!id || typeof id !== 'string') {
    return null;
  }
  return CONTENT_MAP.sections.find(s => s.id === id) || null;
}

function getAllTags() {
  const tagSet = new Set();
  for (const section of CONTENT_MAP.sections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}