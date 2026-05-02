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
      {/* ⭐️ 核心修改：
          使用了自定义的夜间发光特效 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]
          这个参数的意思是：无偏移量(0 0)，扩散半径20px，使用6%透明度的纯白光。
          这会让卡片四周均匀发光，完美模拟白天悬浮时四周的微弱漫反射效果！
      */}
      <section className="rounded-xl overflow-hidden shadow px-2 py-4 bg-white dark:bg-hexo-black-gray duration-300 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
        {children}
      </section>
    </div>
  )
}
export default Card
