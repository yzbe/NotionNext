import SmartLink from '@/components/SmartLink'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <SmartLink
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-block rounded duration-200 mr-2 py-0.5 px-1 text-xs whitespace-nowrap 
         ${selected
        /* ⭐️ 选中状态：完全对齐主菜单，日间 200，夜间 600 */
        ? 'text-black dark:text-white bg-gray-200 dark:bg-gray-600 font-medium'
        /* ⭐️ 未选中状态：日间保留自带色彩，夜间使用暗灰。悬停时强制对齐主菜单！ */
        : `text-gray-600 dark:text-gray-400 
           notion-${tag.color}_background dark:bg-[#2c2c2c] 
           hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white`}` }>

      <div className='font-light'>
        {selected && <i className='fas fa-tag mr-1'/>} {tag.name + (tag.count ? `(${tag.count})` : '')} 
      </div>

    </SmartLink>
  );
}

export default TagItemMini