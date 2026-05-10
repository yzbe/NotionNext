import CategoryList from './CategoryList'
// ⭐️ 删除了原来顶部的 import StickyBar from './StickyBar'
import TagList from './TagList'

/**
 * 博客列表上方嵌入
 * @param {*} props
 * @returns
 */
export default function BlogListBar(props) {
  const { tagOptions, tag } = props
  const { category, categoryOptions } = props
  
  if (tag) {
    return (
        // ⭐️ 核心修改点1：完全去除了 <StickyBar> 的包裹
        // 将 mb-4 改为 mb-6，给下方文章留出更舒适的呼吸空间
        <div 
          style={{ borderRadius: '12px' }}
          className='p-4 mb-6 bg-white dark:bg-hexo-black-gray shadow transition-shadow duration-300 md:hover:shadow-2xl dark:md:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a]'
        >
          <TagList tagOptions={tagOptions} currentTag={tag} />
        </div>
    )
  } else if (category) {
    return (
        // ⭐️ 核心修改点2：同上，去除了分类列表的 <StickyBar>
        <div 
          style={{ borderRadius: '12px' }}
          className='p-4 mb-6 bg-white dark:bg-hexo-black-gray shadow transition-shadow duration-300 md:hover:shadow-2xl dark:md:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a]'
        >
          <CategoryList currentCategory={category} categoryOptions={categoryOptions} />
        </div>
    )
  } else {
    return <></>
  }
}