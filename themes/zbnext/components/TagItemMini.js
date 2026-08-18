import SmartLink from '@/components/SmartLink'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <SmartLink
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200
        mr-2 py-0.5 px-1 text-xs whitespace-nowrap dark:hover:text-white
         ${selected
        ? 'text-white dark:text-white bg-black dark:bg-[#404040] dark:hover:bg-[#505050]'
        : `text-gray-600 hover:shadow-xl notion-${tag.color}_background dark:bg-[#2c2c2c] dark:hover:bg-[#3c3c3c]`}` }>

      {/* ⭐️ 修改了这里的夜间模式文字颜色为 dark:text-gray-300，使其更清晰 */}
      <div className='font-light dark:text-gray-300'>
        {selected && <i className='fas fa-tag mr-1'/>} {tag.name + (tag.count ? `(${tag.count})` : '')} 
      </div>

    </SmartLink>
  );
}

export default TagItemMini