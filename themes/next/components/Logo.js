import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage' // 引入 NotionNext 自带的图片懒加载组件

const Logo = props => {
  const { className } = props
  
  // 获取配置中的头像地址，默认 fallback 到一个相对路径
  const authorImage = siteConfig('AUTHOR_IMAGE') || '/avatar.svg' 

  return (
    <SmartLink href='/' passHref legacyBehavior>
      <div
        className={
          'flex flex-col justify-center items-center cursor-pointer bg-[#1F2937] dark:bg-[#1F2937] w-full space-y-3 font-bold ' +
          className
        }>
        
        {/* 新增：移动端专属的圆形头像，点击跳转主页（包含在 SmartLink 内部） */}
        <div className='block lg:hidden'>
            {/* 使用 h-10 w-10 控制头像大小，rounded-full 切成正圆形 */}
            <LazyImage 
              src={authorImage} 
              className='h-10 w-10 rounded-full object-cover shadow-sm' 
              alt={siteConfig('AUTHOR')} 
            />
        </div>

        {/* 原有的文字 Logo 和描述，现在全部加上 hidden lg:block，只在电脑端显示 */}
        <div className='hidden lg:block'>
            <div
            data-aos='fade-down'
            data-aos-duration='500'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
            className='font-serif text-xl text-white logo text-center'>
            {siteConfig('TITLE')}
            </div>
            
            {siteConfig('DESCRIPTION') && (
            <div
                data-aos='fade-down'
                data-aos-duration='500'
                data-aos-delay='300'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
                className='text-sm text-gray-500 dark:text-gray-300 font-light text-center mt-3'>
                {siteConfig('DESCRIPTION')}
            </div>
            )}
        </div>

      </div>
    </SmartLink>
  )
}
export default Logo
