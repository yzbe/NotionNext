import TagItem from './TagItem'

/**
 * 横向的标签列表
 * @param tags
 * @param currentTag
 * @returns {JSX.Element}
 * @constructor
 */
const TagList = ({ tagOptions, currentTag }) => {
  if (!tagOptions) {
    return <></>
  }
  return (
    // ⭐️ 核心修改点：
    // 加入 flex-wrap 允许换行，把单行间距 space-x-3 换成全方位间距 gap-3
    // 加入 items-center 保证前面的“标签:”文字跟后面的小卡片完美垂直居中
    <ul className='flex flex-wrap items-center gap-3 py-2'>
      <li className='w-14 dark:text-gray-200 whitespace-nowrap text-gray-500'>标签:</li>
      {tagOptions.map(tag => {
        const selected = tag.name === currentTag
        return <TagItem key={tag.name} tag={tag} selected={selected}/>
      })}
    </ul>
  )
}

export default TagList