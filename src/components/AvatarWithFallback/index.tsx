import { useEffect, useState } from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import fallbackAvatar from '../../assets/images/product-icon.png';

interface AvatarWithFallbackProps extends AvatarProps {}

const AvatarWithFallback = ({ src, ...rest }: AvatarWithFallbackProps) => {
  const [validSrc, setValidSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!src) {
      setValidSrc(fallbackAvatar);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setValidSrc(src);
    img.onerror = () => setValidSrc(fallbackAvatar);
  }, [src]);

  return <Avatar src={validSrc} {...rest} />;
};

export default AvatarWithFallback;
