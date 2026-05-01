/**
 * 卡片组件
 * @param {*} param0
 * @returns
 */
const Card = (props) => {
  const { children, headerSlot, className } = props
  return (
    <div className={className}>
      <>{headerSlot}</>
      {/* ⭐️ 核心修改点：在这里的 section 加入 rounded-xl 和 overflow-hidden */}
      <section className="rounded-xl overflow-hidden shadow px-2 py-4 bg-white dark:bg-hexo-black-gray hover:shadow-xl duration-200">
        {children}
      </section>
    </div>
  )
}
export default Card
