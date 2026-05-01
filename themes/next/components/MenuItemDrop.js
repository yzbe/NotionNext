import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  return (
    <li
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}
      // ⭐️ 核心修改 1：增加 mx-2 让出左右边距，增加 rounded-lg 变成胶囊，颜色改为更轻盈的 hover:bg-gray-100
      className='relative py-1.5 px-3 mx-2 my-1 rounded-lg duration-300 text-base justify-between hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white cursor-pointer font-light flex flex-nowrap items-center '
    >
      {!hasSubMenu && (
        <SmartLink
          href={link?.href}
          target={link?.target}
          className='w-full my-auto items-center justify-between flex '>
          <div>
            <div className={`${link.icon} text-center w-4 mr-4`} />
            {link.name}
          </div>
          {link.slot}
        </SmartLink>
      )}

      {hasSubMenu && (
        <div className='w-full my-auto items-center justify-between flex '>
          <div>
            <div className={`${link.icon} text-center w-4 mr-4`} />
            {link.name}
          </div>
          {link.slot}
          {hasSubMenu && (
            <div className='text-right'>
              <i
                className={`px-2 fas fa-chevron-right duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
            </div>
          )}
        </div>
      )}

      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          // ⭐️ 核心修改 2：给弹出的子菜单外框加上 rounded-xl 和边框，视觉更精致
          className={`${show ? 'visible opacity-100 left-56' : 'invisible opacity-0 left-40'} ml-3 whitespace-nowrap absolute right-0 top-0 w-full rounded-xl border border-gray-100 bg-white dark:bg-[#1e1e1e] dark:border-gray-800 transition-all duration-300 drop-shadow-xl z-20 `}
        >
          {link?.subMenus?.map(sLink => {
            return (
              <li key={sLink.id}>
                <SmartLink
                  href={sLink.href}
                  target={link?.target}
                  // ⭐️ 核心修改 3：子菜单项去掉横线(border-b)，也改成带间距的胶囊悬停
                  className='my-1 mx-2 h-9 pl-3 items-center justify-start flex rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white tracking-widest transition-all duration-200 '>
                  {sLink.icon && (
                    <i className={`${sLink.icon} w-4 mr-2 text-center`} />
                  )}
                  {sLink.name}
                  {sLink.slot}
                </SmartLink>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}
