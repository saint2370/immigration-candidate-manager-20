
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CustomButtonVariant = ButtonProps['variant'] | 'success';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: CustomButtonVariant;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  className, 
  variant = 'default', 
  ...props 
}) => {
  const getButtonClasses = () => {
    if (variant === 'success') {
      return 'bg-green-600 text-white hover:bg-green-700';
    }
    return '';
  };

  return (
    <Button
      className={cn(variant === 'success' ? getButtonClasses() : '', className)}
      variant={variant === 'success' ? 'default' : variant}
      {...props}
    />
  );
};

export default CustomButton;
