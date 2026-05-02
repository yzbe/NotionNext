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
      {/* ⭐️ 阴影加宽版：
          原版：[0_20px_25px_-5px_#ffffff26,0_8px_10px_-6px_#ffffff1a]
          新版：[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a]
          将 blur（模糊半径）从 25px 和 10px 分别翻倍提升至 50px 和 20px。
          完美做到：左右阴影扩大两倍，顶部依旧保持克制，底部深邃悬浮！
      */}
      <section className="rounded-xl overflow-hidden shadow px-2 py-4 bg-white dark:bg-hexo-black-gray duration-300 hover:shadow-xl dark:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a]">
        {children}
      </section>
    </div>
  )
}
export default Card
