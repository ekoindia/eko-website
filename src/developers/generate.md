---js
{
  pagination: {
    data: "developers",
    size: 1,
    alias: "developer",
    before: function(paginationData) {
      return paginationData.filter(item => !item.hidden);
    }
  },
  layout: "developer_page",
  permalink: "developers/eps/{{ developer.name | slug }}/",
  business: "api"
}
---
