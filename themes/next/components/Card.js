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
      {/* ⭐️ 核心修改点：
          1. 移除了 transform 和 hover:-translate-y-1（取消上浮动画）
          2. 移除了 dark:hover:bg-gray-800（取消背景提亮）
          3. 恢复纯粹的 hover:shadow-xl 阴影变大动画
          4. 加入 dark:hover:shadow-white/10：在夜间模式下，鼠标悬停时会产生白色的柔和光晕阴影
      */}
      <section className="rounded-xl overflow-hidden shadow px-2 py-4 bg-white dark:bg-hexo-black-gray duration-300 hover:shadow-xl dark:hover:shadow-white/10">
        {children}
      </section>
    </div>
  )
}
export default Card
