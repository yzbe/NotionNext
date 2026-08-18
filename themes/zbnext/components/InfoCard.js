import LazyImage from '@/components/LazyImage'
import Router from 'next/router'
import SocialButton from './SocialButton'
import { siteConfig } from '@/lib/config'

const InfoCard = (props) => {
  const { siteInfo } = props
  
  return <>
    <div className='flex flex-col items-center justify-center'>
        <div className='hover:scale-110 transform duration-500 cursor-pointer' onClick={ () => { Router.push('/') }}>
          <LazyImage src={siteInfo?.icon} className='rounded-full' width={120} alt={siteConfig('AUTHOR')}/>
        </div>
        
        {/* ⭐️ 新增：作者名字 */}
        <div className='text-xl font-bold mt-4 text-black dark:text-white'>
            {siteConfig('AUTHOR')}
        </div>
        
        {/* ⭐️ 新增：个人简介 (BIO) */}
        <div className='text-sm mt-2 text-gray-500 dark:text-gray-400 font-light text-center px-4'>
            {siteConfig('BIO')}
        </div>

        {/* 社交按钮 */}
        <SocialButton />
    </div>
  </>
}

export default InfoCard