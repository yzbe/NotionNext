import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'

const CategoryList = ({ currentCategory, categoryOptions }) => {
  const { locale } = useGlobal()
  if (!categoryOptions) {
    return <></>
  }

  // ⭐️ 核心魔法 1：新增自动排序逻辑！
  // 按照文章数量 (count) 从大到小降序排列，解决乱序问题
  const sortedCategories = [...categoryOptions].sort((a, b) => b.count - a.count)

  return (
    // ⭐️ 核心魔法 2：替换为 flex-wrap 和 gap-2
    // 彻底解决超出边框不换行、间距错乱的问题！
    <ul className='flex flex-wrap gap-2 py-1 items-center'>
      <li className='w-16 py-2 dark:text-gray-200 whitespace-nowrap'>{locale.COMMON.CATEGORY}</li>
      
      {/* ⭐️ 使用排好序的 sortedCategories 进行渲染 */}
      {sortedCategories.map(category => {
        const selected = category.name === currentCategory
        return (
          <SmartLink
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            legacyBehavior>
            <li
              // ⭐️ 删除了原代码里多余的 mr-1 my-1，排版更干净
              className={`cursor-pointer border rounded-xl duration-200 px-2 py-1 font-light text-sm whitespace-nowrap dark:text-gray-300 
                   ${selected
                  ? 'text-white bg-gray-500 dark:hover:bg-gray-900 dark:bg-gray-500 dark:border-gray-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-gray-600 dark:border-gray-600'
                }`}
            >
              <a>
              <i className={`${selected ? 'fa-folder-open ' : 'fa-folder '} fas mr-1`}/>
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