import CategoryList from './CategoryList'
import StickyBar from './StickyBar'
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
      <StickyBar>
        {/* ⭐️ 注入统一圆角、背景色和悬浮白光特效 */}
        <div 
          style={{ borderRadius: '12px' }}
          className='p-4 mb-4 bg-white dark:bg-hexo-black-gray shadow transition-shadow duration-300 md:hover:shadow-2xl dark:md:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a]'
        >
          <TagList tagOptions={tagOptions} currentTag={tag} />
        </div>
      </StickyBar>
    )
  } else if (category) {
    return (
      <StickyBar>
        {/* ⭐️ 注入统一圆角、背景色和悬浮白光特效 */}
        <div 
          style={{ borderRadius: '12px' }}
          className='p-4 mb-4 bg-white dark:bg-hexo-black-gray shadow transition-shadow duration-300 md:hover:shadow-2xl dark:md:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a]'
        >
          <CategoryList currentCategory={category} categoryOptions={categoryOptions} />
        </div>
      </StickyBar>
    )
  } else {
    return <></>
  }
}
