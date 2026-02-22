/**
 * 读取Notion相关的配置
 * 如果需要在Notion中添加自定义字段，可以修改此文件
 */
module.exports = {
  // Notion数据库索引，取notion的第几个视图作为站点数据和排序依据
  NOTION_INDEX: process.env.NEXT_PUBLIC_NOTION_INDEX || 0,

  // 自定义配置notion数据库字段名
  NOTION_PROPERTY_NAME: {
    password: process.env.NEXT_PUBLIC_NOTION_PROPERTY_PASSWORD || 'password',
    type: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE || 'type',
    type_post: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_POST || 'Post',
    type_page: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PAGE || 'Page',
    type_notice: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_NOTICE || 'Notice',
    type_menu: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_MENU || 'Menu',
    type_sub_menu: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_SUB_MENU || 'SubMenu',
    title: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TITLE || 'title',
    status: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS || 'status',
    status_publish: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_PUBLISH || 'Published',
    status_invisible: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_INVISIBLE || 'Invisible',
    summary: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SUMMARY || 'summary',
    slug: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SLUG || 'slug',
    category: process.env.NEXT_PUBLIC_NOTION_PROPERTY_CATEGORY || 'category',
    date: process.env.NEXT_PUBLIC_NOTION_PROPERTY_DATE || 'date',
    // 注意：请确保下方引号内的名字与 Notion 数据库列名完全一致（包含空格）
    last_edited_time: process.env.NEXT_PUBLIC_NOTION_PROPERTY_LAST_EDITED_TIME || 'Last Edited Time',
    tags: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TAGS || 'tags',
    icon: process.env.NEXT_PUBLIC_NOTION_PROPERTY_ICON || 'icon',
    ext: process.env.NEXT_PUBLIC_NOTION_PROPERTY_EXT || 'ext'
  },
  NOTION_ACTIVE_USER: process.env.NOTION_ACTIVE_USER || '',
  NOTION_TOKEN_V2: process.env.NOTION_TOKEN_V2 || ''
}
