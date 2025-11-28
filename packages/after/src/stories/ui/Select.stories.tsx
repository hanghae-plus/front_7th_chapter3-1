import type { Meta } from '@storybook/react-vite';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FlexCol } from '@/stories/utils';

const meta = {
  title: 'UI/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

export const Default = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select your role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>관리자</SelectLabel>
          <SelectItem value="admin">시스템 관리자</SelectItem>
          <SelectItem value="moderator">운영자</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>일반 사용자</SelectLabel>
          <SelectItem value="user">사용자</SelectItem>
          <SelectItem value="guest">게스트</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Disabled = {
  render: () => (
    <FlexCol>
      <Select disabled>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="item1">Item 1</SelectItem>
          <SelectItem value="item2">Item 2</SelectItem>
        </SelectContent>
      </Select>
      
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select with disabled items" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="item1">Available Item</SelectItem>
          <SelectItem value="item2" disabled>Disabled Item</SelectItem>
          <SelectItem value="item3">Another Available Item</SelectItem>
        </SelectContent>
      </Select>
    </FlexCol>
  ),
};

export const WithLabel = {
  render: () => (
    <div className="w-full max-w-sm">
      <label htmlFor="status" style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
        Status
      </label>
      <Select>
        <SelectTrigger id="status">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="published">게시됨</SelectItem>
          <SelectItem value="draft">임시저장</SelectItem>
          <SelectItem value="archived">보관됨</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const LongList = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {[
          'South Korea',
          'United States',
          'United Kingdom',
          'Japan',
          'China',
          'Germany',
          'France',
          'Canada',
          'Australia',
          'Brazil',
          'India',
          'Russia',
          'Mexico',
          'Spain',
          'Italy',
        ].map((country) => (
          <SelectItem key={country} value={country.toLowerCase().replace(/\s+/g, '-')}>
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

