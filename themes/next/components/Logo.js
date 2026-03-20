import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

const Logo = props => {
  const { className } = props
  return (
    <SmartLink href='/' passHref legacyBehavior>
      <div
        className={
          'flex flex-col justify-center items-center cursor-pointer bg-[#1F2937] dark:bg-[#1F2937] w-full space-y-3 font-bold ' +
          className
        }>
        <div
          data-aos='fade-down'
          data-aos-duration='500'
          data-aos-once='true'
          data-aos-anchor-placement='top-bottom'
          className='font-serif text-xl text-white logo'>
          {/* 去掉了这里多余的空格符，让居中更绝对 */}
          {siteConfig('TITLE')}
        </div>
        
        {/* 修改点：加入条件判断，只有当 DESCRIPTION 存在时才渲染这块 div */}
        {siteConfig('DESCRIPTION') && (
          <div
            data-aos='fade-down'
            data-aos-duration='500'
            data-aos-delay='300'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
            className='text-sm text-gray-500 dark:text-gray-300 font-light text-center'>
            {siteConfig('DESCRIPTION')}
          </div>
        )}

      </div>
    </SmartLink>
  )
}
export default Logo
