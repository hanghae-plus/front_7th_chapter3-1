import React, { useState } from 'react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table/table';
import { type User, USER_ROLES_MAP } from '@/entities/user';
import { cn } from '@/shared/lib/utils';
import { USER_ROLE_BADGE_MAP, USER_STATUS_BADGE_MAP } from '../config/constants.config';

interface TableProps {
  users: User[];
  variant?: 'default' | 'bordered' | 'striped' | 'hover';
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onEdit: (item: User) => void;
  onDelete: (id: number) => void;
}

const USER_TABLE_COLUMNS = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'username', header: '사용자명', width: '150px' },
  { key: 'email', header: '이메일' },
  { key: 'role', header: '역할', width: '120px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'createdAt', header: '생성일', width: '120px' },
  { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
  { key: 'actions', header: '관리', width: '200px' },
];

export const UserManagementTable: React.FC<TableProps> = ({
  users = [],
  pageSize = 10,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(users.length / pageSize);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {USER_TABLE_COLUMNS.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => {
            const userStatus =
              USER_STATUS_BADGE_MAP[row.status as keyof typeof USER_STATUS_BADGE_MAP];
            const userRole = USER_ROLE_BADGE_MAP[row.role as keyof typeof USER_ROLE_BADGE_MAP];
            const isAdmin = row.role === USER_ROLES_MAP.ADMIN;
            return (
              <TableRow key={rowIndex}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Badge variant={userRole.variant}>{userRole.content}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={userStatus.variant}>{userStatus.content}</Badge>
                </TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.lastLogin || '-'}</TableCell>
                <TableCell>
                  <div className="gap-xs flex">
                    <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
                      수정
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      disabled={isAdmin}
                      onClick={() => onDelete?.(row.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="mt-pxr-16 gap-pxr-8 flex justify-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              'bg-background border-border text-foreground px-pxr-12 py-pxr-6 cursor-pointer rounded-sm disabled:cursor-not-allowed disabled:opacity-60',
              currentPage === 1 && 'cursor-not-allowed opacity-60'
            )}
          >
            이전
          </button>
          <span className="px-[12px] py-[6px]">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              'bg-background border-border text-foreground px-pxr-12 py-pxr-6 cursor-pointer rounded-sm disabled:cursor-not-allowed disabled:opacity-60',
              currentPage === totalPages && 'cursor-not-allowed opacity-60'
            )}
          >
            다음
          </button>
        </div>
      )}
    </>
  );
};
