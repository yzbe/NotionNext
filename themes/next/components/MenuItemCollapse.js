import Collapse from '@/components/Collapse'
import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

export const MenuItemCollapse = ({ link, onHeightChange }) => {
  const [isOpen, changeIsOpen] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen)
    if (onHeightChange) {
      onHeightChange()
    }
  }

  if (!link || !link.show) {
    return null
  }

  return (
    <div className='w-full text-left font-light dark:text-gray-200'>
      {/* ⭐️ 核心修改：无子菜单的独立链接，增加胶囊圆角、留白和加深版 Hover */}
      {!hasSubMenu && (
        <SmartLink
          href={link?.href}
          className='flex items-center justify-between px-3 py-2 mx-2 my-1 rounded-lg duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white'
        >
          <div>
            <div className={`${link.icon} text-center w-4 mr-4`} />
            {link.name}
          </div>
          {link.slot}
        </SmartLink>
      )}

      {/* ⭐️ 核心修改：带子菜单的父级按钮，采用相同的胶囊 UI */}
      {hasSubMenu && (
        <div
          onClick={toggleOpenSubMenu}
          className='flex items-center justify-between px-3 py-2 mx-2 my-1 rounded-lg duration-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white'
        >
          <div>
            <div className={`${link.icon} text-center w-4 mr-4`} />
            {link.name}
          </div>
          <div className='text-right'>
            <i
              className={`px-2 fas fa-chevron-right duration-500 transition-all ${
                isOpen ? ' rotate-90' : ''
              }`}
            />
          </div>
        </div>
      )}

      {/* 折叠子菜单 */}
      {hasSubMenu && (
        <Collapse isOpen={isOpen} onHeightChange={onHeightChange}>
          <div className='pl-6 py-1'>
            {link.subMenus.map((sLink, index) => {
              return (
                <SmartLink
                  key={index}
                  href={sLink.href}
                  // ⭐️ 核心修改：子菜单项也同步应用胶囊 UI 风格
                  className='flex items-center px-3 py-2 mx-2 my-1 rounded-lg duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white dark:text-gray-200'
                >
                  {sLink.icon && (
                    <div className={`${sLink.icon} text-center w-4 mr-4`} />
                  )}
                  {sLink.name}
                  {sLink.slot}
                </SmartLink>
              )
            })}
          </div>
        </Collapse>
      )}
    </div>
  )
}
