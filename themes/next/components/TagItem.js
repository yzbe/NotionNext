import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'

const TagItem = ({ tag, selected }) => {
  const { locale } = useGlobal()
  if (!tag) {
    <div> { locale.COMMON.NOTAG } </div>
  }
  return (
    <SmartLink
      // ⭐️ 核心修改点1：去除了 selected ? '/' : ，永远只留在当前标签页
      href={`/tag/${encodeURIComponent(tag.name)}`}
      passHref
      legacyBehavior>
      <li
        // ⭐️ 核心修改点2：顺手删除了 mr-1 my-1，把间距控制权完全交给父组件的 gap-3，排版更无瑕
        className={`notion-${tag.color}_background dark:bg-gray-700 list-none cursor-pointer rounded-md  
        duration-200 px-2 py-1 text-sm whitespace-nowrap 
         hover:bg-gray-200 dark:hover:bg-gray-800 `}>
        <div className='text-gray-600 dark:text-gray-300 dark:hover:text-white'>
          {selected && <i className='fas fa-tag mr-1'/>} {`${tag.name} `} {tag.count ? `(${tag.count})` : ''}
        </div>
      </li>
    </SmartLink>
  );
}

export default TagItem