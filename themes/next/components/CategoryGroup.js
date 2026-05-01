import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

const CategoryGroup = ({ currentCategory, categories }) => {
  if (!categories || categories.length === 0) return <></>
  const categoryCount = siteConfig('NEXT_PREVIEW_CATEGORY_COUNT')
  const categoryOptions = categories.slice(0, categoryCount)
  return (
    <>
      {/* ⭐️ 优化：加上 flex-col 让列表项整齐垂直排列，避免加了 margin 后溢出换行错乱 */}
      <div id='category-list' className='dark:border-gray-600 flex flex-col'>
        {categoryOptions.map(category => {
          const selected = currentCategory === category.name
          return (
            <SmartLink
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              className={
                // ⭐️ 核心修改：统一成加深版的高亮胶囊风格，自带 rounded-lg 圆角
                (selected
                  ? 'bg-gray-500 dark:bg-gray-600 text-white hover:bg-gray-600 dark:hover:bg-gray-500 '
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white ') +
                'flex items-center text-sm duration-300 px-3 py-1.5 mx-2 my-1 rounded-lg cursor-pointer font-light'
              }>
              <i
                // ⭐️ 优化：去掉了原有的固定色彩，让未选中时的图标颜色也能跟随文字 hover 一起变换
                className={`${selected ? 'fa-folder-open ' : 'fa-folder '} mr-2 fas`}
              />
              {category.name}({category.count})
            </SmartLink>
          )
        })}
      </div>
    </>
  )
}

export default CategoryGroup
