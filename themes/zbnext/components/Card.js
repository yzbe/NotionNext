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
      {/* ⭐️ 核心统一：
          1. 强制使用 style={{ borderRadius: '12px' }} 确保与文章卡片圆角弧度完全一致
          2. 将 hover:shadow-xl 升级为 md:hover:shadow-2xl，让悬浮时的景深更明显
          3. 完美继承你之前调好的暗黑模式宽版白光特效
      */}
      <section 
        style={{ borderRadius: '12px' }}
        className="overflow-hidden shadow px-2 py-4 bg-white dark:bg-hexo-black-gray transition-shadow duration-300 md:hover:shadow-2xl dark:md:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a]"
      >
        {children}
      </section>
    </div>
  )
}
export default Card
