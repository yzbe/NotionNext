import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'

const CategoryList = ({ currentCategory, categoryOptions }) => {
  const { locale } = useGlobal()
  if (!categoryOptions) {
    return <></>
  }

  const sortedCategories = [...categoryOptions].sort((a, b) => b.count - a.count)

  return (
    <ul className='flex flex-wrap gap-3 py-1 items-center'>
      <li className='w-16 py-2 dark:text-gray-200 whitespace-nowrap'>{locale.COMMON.CATEGORY}</li>
      
      {sortedCategories.map(category => {
        const selected = category.name === currentCategory
        return (
          <SmartLink
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            legacyBehavior>
            <li
              /* ⭐️ 核心修正：移除暴力 style，使用纯正的 rounded-lg 保持全站统一 */
              className={`cursor-pointer rounded-lg px-4 py-1.5 font-light text-sm whitespace-nowrap flex items-center transition-colors duration-200
                ${selected
                ? 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white font-medium'
                : 'bg-gray-100 dark:bg-[#2c2c2c] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white'
                }`}
            >
              <a>
                <i className={`${selected ? 'fa-folder-open ' : 'fa-folder '} fas mr-2`}/>
                {`${category.name} (${category.count})`}
              </a>
            </li>
          </SmartLink>
        )
      })}
    </ul>
  )
}

export default CategoryList