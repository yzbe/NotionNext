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
                  /* ⭐️ 层级感优化：px-2 改为 pl-6 pr-2，向右缩进营造子菜单视觉 */
                  ${selected
                    ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                  }
                `}>
                
                {/* ⭐️ 图标回归：改回 fas 实心图标，找回稳重感 */}
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