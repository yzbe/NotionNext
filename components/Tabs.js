import { useState } from 'react';
import { siteConfig } from '@/lib/config'

/**
 * Tabs切换标签
 * @param {*} param0
 * @returns
 */
const Tabs = ({ className, children }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const validChildren = children.filter(c => c);

  if (validChildren.length === 0) {
    return <></>;
  }

  return (
    <div className={`mb-5 duration-200 ${className}`}>
      {!(validChildren.length === 1 && siteConfig('COMMENT_HIDE_SINGLE_TAB')) && (
        <ul className="flex justify-center space-x-5 pb-4 dark:text-gray-400 text-gray-600 overflow-auto">
          {validChildren.map((item, index) => (
            <li key={index}
              // ⭐️ 核心修改点：去掉了 red-600 和 jello 果冻动画
              // 换成了沉稳的日间深灰(text-gray-700)、夜间浅灰(dark:text-gray-200)，并加了一点 hover 交互
              className={`${currentTab === index ? 'font-bold text-gray-700 dark:text-gray-200 border-b-2 border-gray-600 dark:border-gray-300' : 'font-extralight cursor-pointer hover:font-bold'} text-sm font-sans`}
              onClick={() => setCurrentTab(index)}>
              {item.key}
            </li>
          ))}
        </ul>
      )}
      {/* 标签切换的时候不销毁 DOM 元素，使用 CSS 样式进行隐藏 */}
      <div>
        {validChildren.map((item, index) => (
          <section
            key={index}
            className={`${currentTab === index ? 'opacity-100 static h-auto' : 'opacity-0 absolute h-0 pointer-events-none overflow-hidden'}`}>
            {item}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
