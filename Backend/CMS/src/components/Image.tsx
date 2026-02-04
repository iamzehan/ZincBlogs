import { Suspense } from "react";
import clsx from 'clsx';

interface ImageType{
    className: string;
    src : string;
    alt: string;
}
export default function Image({props}: {props: ImageType}){
    const {className, src, alt} = props;

    return (
        <Suspense fallback={<ImageSekeleton className={className}/>}> 
        <img src={src} alt={alt} className={className} loading="lazy"/>
        </Suspense>
    );
}

const ImageSekeleton = ( className: {className: string;}) => {
    return (
        <div className={clsx({className}, 'animate-pulse')}>

        </div>
    )
}