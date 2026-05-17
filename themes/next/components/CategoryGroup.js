import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

const CategoryGroup = ({ currentCategory, categories }) => {
  if (!categories || categories.length === 0) return <></>
  const categoryCount = siteConfig('NEXT_PREVIEW_CATEGORY_COUNT')
  const categoryOptions = categories.slice(0, categoryCount)
  return (
    <>
      <div id='category-list' className='dark:border-gray-600 flex flex-col'>
        {categoryOptions.map(category => {
          const selected = currentCategory === category.name
          return (
            <SmartLink
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              className={'my-1 flex font-light'}>
              
              {/* ⭐️ 核心对齐：完全套用 LatestPostsGroup 的间距和颜色逻辑，确保毫无偏差 */}
              <div
                className={`
                  w-full py-1.5 px-2 flex items-center rounded-lg cursor-pointer transition-colors duration-200
                  ${selected
                    ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                  }
                `}>
                
                {/* ⭐️ 修复 1 & 2：换成 fa-regular(空心线条)，用 mr-2 保持间距，彻底消除“太黑”和“对不齐”的问题 */}
                <i className={`fa-regular ${selected ? 'fa-folder-open' : 'fas-folder'} mr-3`} />
                
                <div className='line-clamp-2 text-sm'>
                  {category.name}({category.count})
                </div>
                
              </div>
            </SmartLink>
          )
        })}
      </div>
    </>
  )
}

export default CategoryGroup