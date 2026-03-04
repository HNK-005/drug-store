import React, { ComponentProps } from 'react';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { SearchIcon } from './ui/icon';

type SearchBarProps = ComponentProps<typeof Input> & ComponentProps<typeof InputField>;

export function SearchBar({ placeholder, value, ...props }: SearchBarProps) {
  return (
    <Input {...props}>
      <InputSlot className="pl-3">
        <InputIcon as={SearchIcon} />
      </InputSlot>
      <InputField placeholder={placeholder || 'Search...'} value={value} />
    </Input>
  );
}
