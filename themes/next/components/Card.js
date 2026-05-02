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
      {/* ⭐️ 全局卡片交互升级：
          1. transform transition-all duration-300: 开启更平滑的全局过渡动画
          2. hover:-translate-y-1: 增加鼠标悬停时“向上微浮动1像素”的物理位移，这是夜间悬浮感的灵魂所在！
          3. dark:hover:bg-gray-800: 在夜间模式下，鼠标放上去时背景色微微变亮，完美弥补阴影失效的缺憾
      */}
      <section className="rounded-xl overflow-hidden shadow px-2 py-4 bg-white dark:bg-hexo-black-gray hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 dark:hover:bg-gray-800">
        {children}
      </section>
    </div>
  )
}
export default Card
