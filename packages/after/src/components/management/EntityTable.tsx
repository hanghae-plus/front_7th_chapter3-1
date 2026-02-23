import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";
import type { EntityType, TableColumn } from "@/type/management";
import { EntityTableCell } from "./EntityTableCell";

interface EntityTableProps {
  entityType: EntityType;
  columns: TableColumn[];
  data: Array<User | Post>;
  onEdit: (item: User | Post) => void;
  onDelete: (id: number) => void;
  onStatusAction?: (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => void;
}

export const EntityTable: React.FC<EntityTableProps> = ({
  entityType,
  columns,
  data,
  onEdit,
  onDelete,
  onStatusAction,
}) => {
  return (
    <div className="overflow-hidden rounded-xs bg-app-card shadow-sm">
      <Table>
        <TableHeader className="bg-table-row text-app-muted-foreground">
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                style={{ width: column.width }}
                className="text-xs font-semibold uppercase tracking-wide"
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <EntityTableCell
                    columnKey={column.key}
                    item={item}
                    entityType={entityType}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusAction={onStatusAction}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!data.length && (
        <div className="flex items-center justify-center px-6 py-10 text-sm text-app-muted-foreground">
          데이터가 없습니다.
        </div>
      )}
    </div>
  );
};
