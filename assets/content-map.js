// assets/content-map.js
// 站点内容分区与搜索过滤函数

const siteContent = {
  home: {
    title: "首页",
    sections: [
      { id: "sports", name: "体育专区", keywords: ["乐鱼体育", "足球", "篮球", "赛事直播"] },
      { id: "live", name: "直播频道", keywords: ["乐鱼体育", "直播", "高清", "实时"] },
      { id: "promo", name: "优惠活动", keywords: ["乐鱼体育", "奖金", "注册礼包"] }
    ]
  },
  sports: {
    title: "体育板块",
    categories: [
      { name: "足球", tags: ["乐鱼体育", "英超", "欧冠", "西甲"] },
      { name: "篮球", tags: ["乐鱼体育", "NBA", "CBA", "欧洲篮球"] },
      { name: "网球", tags: ["乐鱼体育", "大满贯", "ATP", "WTA"] },
      { name: "电竞", tags: ["乐鱼体育", "英雄联盟", "DOTA2", "CS:GO"] }
    ]
  },
  about: {
    title: "关于我们",
    info: "乐鱼体育平台，提供丰富体育赛事与互动体验。",
    links: [
      { text: "服务条款", url: "https://siteportal-leyu.com.cn/terms" },
      { text: "隐私政策", url: "https://siteportal-leyu.com.cn/privacy" }
    ]
  }
};

function buildTagIndex(content) {
  const index = {};
  for (const sectionKey in content) {
    const section = content[sectionKey];
    if (section.sections) {
      section.sections.forEach(sub => {
        sub.keywords.forEach(kw => {
          if (!index[kw]) index[kw] = [];
          index[kw].push({ section: sectionKey, subId: sub.id, name: sub.name });
        });
      });
    }
    if (section.categories) {
      section.categories.forEach(cat => {
        cat.tags.forEach(tag => {
          if (!index[tag]) index[tag] = [];
          index[tag].push({ section: sectionKey, catName: cat.name });
        });
      });
    }
  }
  return index;
}

const tagIndex = buildTagIndex(siteContent);

function searchContent(query) {
  query = query.toLowerCase().trim();
  const results = [];
  for (const tag in tagIndex) {
    if (tag.toLowerCase().includes(query)) {
      results.push({ match: tag, references: tagIndex[tag] });
    }
  }
  return results;
}

function filterBySection(content, sectionKey) {
  if (content[sectionKey]) {
    return content[sectionKey];
  }
  return null;
}

function getAllTags() {
  return Object.keys(tagIndex);
}

function findRelatedSections(tag) {
  const entries = tagIndex[tag];
  if (!entries) return [];
  return entries.map(e => e.section);
}

// 示例使用（不自动执行）
const exampleSearch = searchContent("乐鱼体育");
const exampleTags = getAllTags();
const exampleRelated = findRelatedSections("乐鱼体育");
const exampleSection = filterBySection(siteContent, "sports");