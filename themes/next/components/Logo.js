import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

const Logo = props => {
  const { className } = props
  return (
    <SmartLink href='/' passHref legacyBehavior>
      {/* 移除 style，背景设为 bg-transparent，去掉补丁感 */}
      <div
        className={
          'flex flex-col justify-center items-center cursor-pointer bg-transparent ' +
          className
        }>
        <div
          data-aos='fade-down'
          data-aos-duration='500'
          data-aos-once='true'
          data-aos-anchor-placement='top-bottom'
          className='font-serif text-xl text-white text-center'>
          {siteConfig('TITLE')}
        </div>
      </div>
    </SmartLink>
  )
}
export default Logo
