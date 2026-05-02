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
      {/* ⭐️ 终极阴影同步：
          [0_20px_25px_-5px_#ffffff26,0_8px_10px_-6px_#ffffff1a]
          这串魔法代码是 Tailwind `shadow-xl` 的完美白色复刻版！
          向下偏移20px，完全保持了日间模式那种“底部有立体阴影，顶部没有”的真实悬浮感。
          使用了 #ffffff26 (15%透明白) 确保编译器不出错且亮度足够。
      */}
      <section className="rounded-xl overflow-hidden shadow px-2 py-4 bg-white dark:bg-hexo-black-gray duration-300 hover:shadow-xl dark:hover:shadow-[0_20px_25px_-5px_#ffffff26,0_8px_10px_-6px_#ffffff1a]">
        {children}
      </section>
    </div>
  )
}
export default Card
