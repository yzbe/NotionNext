import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'

const Logo = props => {
  const { className, siteInfo } = props 
  
  const avatar = siteInfo?.icon || siteConfig('AUTHOR_IMAGE') || '/avatar.svg'

  return (
    <SmartLink href='/' passHref legacyBehavior>
      {/* 最外层容器 */}
      <div className={'w-full cursor-pointer ' + className}>
        
        {/* ⭐️ 修改点1：文字专属区域
            去除了边框属性。使用 py-6（上下等距的内边距），
            在数学和视觉上保证了里面的文字绝对垂直居中！ */}
        <div className='flex flex-col justify-center items-center w-full py-6 space-y-3 font-bold'>
          
          <div className='block lg:hidden'>
              <div className="p-[0px] rounded-full bg-white/10 border border-white/20">
                  <LazyImage 
                    src={avatar} 
                    className='h-8 w-8 rounded-full object-cover' 
                    alt={siteConfig('TITLE')} 
                  />
              </div>
          </div>

          <div className='hidden lg:block w-full'>
              <div
                data-aos='fade-down'
                data-aos-duration='500'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
                className='font-sans font-extrabold text-xl text-gray-900 dark:text-white logo text-center w-full'>
                {siteConfig('TITLE')}
              </div>
              
              {siteConfig('DESCRIPTION') && (
              <div
                  data-aos='fade-down'
                  data-aos-duration='500'
                  data-aos-delay='300'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                  className='text-sm text-gray-700 dark:text-gray-300 font-light text-center mt-3 w-full px-2 break-words'>
                  {siteConfig('DESCRIPTION')}
              </div>
              )}
          </div>

        </div>

        {/* ⭐️ 修改点2：独立的悬浮短线
            w-[80%] 表示占据80%的宽度；
            mx-auto 表示水平居中（这样左右刚好各空出10%）；
            h-[1px] 定义线的高度为 1 像素；
            bg-black/10 dark:bg-white/10 保证它和日/夜间模式完美融合！ */}
        <div className='w-[80%] mx-auto h-[1px] bg-black/10 dark:bg-white/10'></div>

      </div>
    </SmartLink>
  )
}
export default Logo