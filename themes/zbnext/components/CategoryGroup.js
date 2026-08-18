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
              
              <div
                className={`
                  w-full py-1.5 pl-6 pr-2 flex items-center rounded-lg cursor-pointer transition-colors duration-200
                  /* ⭐️ 已完全克隆 MenuItemDrop 的配色方案 */
                  ${selected
                    /* 选中状态：bg-gray-200 / dark:bg-gray-600 */
                    ? 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white font-medium'
                    /* 悬停状态：同步为 hover:bg-gray-200 / dark:hover:bg-gray-600 */
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white'
                  }
                `}>
                
                <i className={`fas ${selected ? 'fa-folder-open' : 'fa-folder'} mr-2`} />
                
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