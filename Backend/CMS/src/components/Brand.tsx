import clsx from 'clsx';
import Image from './Image';
import type { ReactNode } from 'react';
export default function Brand ({direction, imgStyles, children}: {direction:string; imgStyles: string, children?: ReactNode}) {
    return (
        <div className={clsx("flex gap-2 items-center justify-center mb-5 md:mb-0 md:border-b-2 h-full border-zinc-500/20", direction)} >
            <Image props={{src:"/public/favicon.png", className: imgStyles, alt: "brand-logo"}}/>
            <BrandText/>
            {children}
        </div>
    )
}

const BrandText = () => {
    return (
        <p className='font-bold flex items-center'>
            <span className='text-zinc-500'>Zinc</span><span className='text-zinc-400'>Blogs</span>
        </p>
    )
} 