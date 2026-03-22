import LazyImage from '@/components/LazyImage'
import Router from 'next/router'
import SocialButton from './SocialButton'
import { siteConfig } from '@/lib/config'

const InfoCard = (props) => {
  const { siteInfo } = props
  
  return <>
    <div className='flex flex-col items-center justify-center'>
        {/* 头像部分 */}
        <div className='hover:rotate-45 hover:scale-125 transform duration-200 cursor-pointer' onClick={() => { Router.push('/') }}>
          <LazyImage src={siteInfo?.icon} className='rounded-full' width={120} alt={siteConfig('AUTHOR')} />
        </div>

        {/* 名字部分：使用了方案 A 的微调版 */}
        <div className='text-2xl font-sans font-medium dark:text-white pt-4 pb-2 hover:scale-105 transform duration-200'>
          {siteConfig('AUTHOR')}
        </div>

        {/* BIO 部分：支持换行且行间距更舒适 */}
        <div className='font-light leading-relaxed dark:text-white py-2 hover:scale-105 transform duration-200 text-center'>
          {siteConfig('BIO')?.split(/\\n|\n/).map((line, index, array) => (
            <span key={index}>
              {line}
              {/* 如果不是最后一行，就加个换行符 */}
              {index !== array.length - 1 && <br />}
            </span>
          ))}
        </div>

        {/* 社交按钮 */}
        <SocialButton />
    </div>
  </>
}

export default InfoCard
