import { siteConfig } from '@/lib/config'
import { useRef, useState } from 'react' // ⭐️ 引入 useState
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'

/**
 * 社交联系方式按钮组
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  const emailIcon = useRef(null)
  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
  
  // ⭐️ 新增控制微信弹窗显示/隐藏的状态
  const [showWeChat, setShowWeChat] = useState(false)

  return (
    <>
      <div className='w-52 justify-center flex-wrap flex'>
        <div className='space-x-3 text-xl text-gray-600 dark:text-gray-400 text-center'>
          
          {siteConfig('CONTACT_GITHUB') && (
            <a
              target='_blank'
              rel='noreferrer'
              title={'github'}
              href={siteConfig('CONTACT_GITHUB')}>
              <i className='fab fa-github transform hover:scale-125 duration-150' />
            </a>
          )}
          {siteConfig('CONTACT_TWITTER') && (
            <a
              target='_blank'
              rel='noreferrer'
              title={'twitter'}
              href={siteConfig('CONTACT_TWITTER')}>
              <i className='fab fa-twitter transform hover:scale-125 duration-150' />
            </a>
          )}
          {siteConfig('CONTACT_TELEGRAM') && (
            <a
              target='_blank'
              rel='noreferrer'
              href={siteConfig('CONTACT_TELEGRAM')}
              title={'telegram'}>
              <i className='fab fa-telegram transform hover:scale-125 duration-150' />
            </a>
          )}
          {siteConfig('CONTACT_LINKEDIN') && (
            <a
              target='_blank'
              rel='noreferrer'
              href={siteConfig('CONTACT_LINKEDIN')}
              title={'linkedIn'}>
              <i className='transform hover:scale-125 duration-150 fab fa-linkedin dark:hover:text-indigo-400 hover:text-indigo-600' />
            </a>
          )}
          {siteConfig('CONTACT_ORCID') && (
            <a
              target='_blank'
              rel='noreferrer'
              href={siteConfig('CONTACT_ORCID')}
              title={'ORCID'}>
              <i className='fab fa-orcid transform hover:scale-125 duration-150' />
            </a>
          )}
          {siteConfig('CONTACT_WEIBO') && (
            <a
              target='_blank'
              rel='noreferrer'
              title={'weibo'}
              href={siteConfig('CONTACT_WEIBO')}>
              <i className='fab fa-weibo transform hover:scale-125 duration-150' />
            </a>
          )}
          {siteConfig('CONTACT_INSTAGRAM') && (
            <a
              target='_blank'
              rel='noreferrer'
              title={'instagram'}
              href={siteConfig('CONTACT_INSTAGRAM')}>
              <i className='fab fa-instagram transform hover:scale-125 duration-150' />
            </a>
          )}
          
          {CONTACT_EMAIL && (
            <a
              onClick={e => handleEmailClick(e, emailIcon, CONTACT_EMAIL)}
              title='email'
              className='cursor-pointer'
              ref={emailIcon}>
              <i className='fas fa-envelope transform hover:scale-125 duration-150' />
            </a>
          )}

          {/* ⭐️ 新增微信图标按钮：点击触发 setShowWeChat(true) */}
          <a
            onClick={() => setShowWeChat(true)}
            title='WeChat'
            className='cursor-pointer'>
            <i className='fab fa-weixin transform hover:scale-125 duration-150' />
          </a>

          {JSON.parse(siteConfig('ENABLE_RSS')) && (
            <a
              target='_blank'
              rel='noreferrer'
              title={'RSS'}
              href={'/rss/feed.xml'}>
              <i className='fas fa-rss transform hover:scale-125 duration-150' />
            </a>
          )}
          {siteConfig('CONTACT_BILIBILI') && (
            <a
              target='_blank'
              rel='noreferrer'
              title={'bilibili'}
              href={siteConfig('CONTACT_BILIBILI')}>
              <i className='fab fa-bilibili transform hover:scale-125 duration-150' />
            </a>
          )}
          {siteConfig('CONTACT_YOUTUBE') && (
            <a
              target='_blank'
              rel='noreferrer'
              title={'youtube'}
              href={siteConfig('CONTACT_YOUTUBE')}>
              <i className='fab fa-youtube transform hover:scale-125 duration-150' />
            </a>
          )}
        </div>
      </div>

      {/* ⭐️ 新增微信二维码弹窗结构 */}
      {showWeChat && (
        <div
          // 外层遮罩层：高斯模糊 + 半透明黑底，点击任意空白处关闭弹窗
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300'
          onClick={() => setShowWeChat(false)}
        >
          <div
            // 内层卡片：白/黑灰底色，圆角阴影
            className='relative bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-2xl mx-4 transform transition-all duration-300 scale-100'
            onClick={(e) => e.stopPropagation()} // 阻止事件冒泡：点击卡片内部不会触发外层的关闭
          >
            {/* 右上角关闭按钮 (X) */}
            <button
              onClick={() => setShowWeChat(false)}
              className='absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'
            >
              <i className='fas fa-times text-xl' />
            </button>
            
            <h3 className='text-center text-lg font-medium text-gray-700 dark:text-gray-200 mb-4'>
              微信
            </h3>
            
            <div className='w-64 h-64 md:w-72 md:h-72 flex items-center justify-center bg-gray-50 dark:bg-black rounded-lg overflow-hidden'>
              <img 
                // ⭐️ 直接把这里的 src 替换成你的网络链接即可
                src='https://img.yuanzibin.com/image/Wechat.png' 
                alt='WeChat QR Code' 
                className='w-full h-full object-contain'
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default SocialButton