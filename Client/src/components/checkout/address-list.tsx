'use client';

import { useState } from 'react';
import {
  Check,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  Star,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddressDialog } from '@/components/checkout/address-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  deleteAddress,
  selectAddress,
  setDefaultAddress,
} from '@/store/slices/address-slice';
import type { Address } from '@/types';
import { cn } from '@/lib/utils';

export function AddressList({
  selectable = false,
  title,
  emptyTitle = 'No saved addresses yet',
  emptyDescription = 'Add a shipping address to get started.',
}: {
  selectable?: boolean;
  title?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((s) => s.address.items);
  const selectedId = useAppSelector((s) => s.address.selectedId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);

  const openAdd = () => {
    setEditing(null);
    setDialogOpen(true);
  };
  const openEdit = (a: Address) => {
    setEditing(a);
    setDialogOpen(true);
  };
  const handleDelete = (a: Address) => {
    dispatch(deleteAddress(a.id));
    toast.success(`Removed ${a.label}`);
  };
  const handleDefault = (a: Address) => {
    dispatch(setDefaultAddress(a.id));
    toast.success(`${a.label} set as default`);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">{title}</div>
        <Button variant="outline" size="sm" onClick={openAdd} className="shrink-0 gap-1">
          <Plus className="size-4" />
          Add new
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed bg-card p-8 text-center">
          <MapPin className="mx-auto size-7 text-muted-foreground" aria-hidden />
          <p className="mt-3 font-medium">{emptyTitle}</p>
          <p className="text-sm text-muted-foreground">{emptyDescription}</p>
          <Button className="mt-4" onClick={openAdd}>
            <Plus className="size-4" />
            Add address
          </Button>
        </div>
      ) : (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {addresses.map((a) => {
            const selected = selectable && a.id === selectedId;
            return (
              <li key={a.id}>
                <div
                  className={cn(
                    'relative flex h-full w-full flex-col gap-1 rounded-3xl border bg-card p-5 text-left transition-all',
                    selected ? 'border-primary ring-2 ring-primary/30' : 'hover:shadow-soft',
                  )}
                >
                  {selectable && (
                    <button
                      type="button"
                      onClick={() => dispatch(selectAddress(a.id))}
                      className="absolute inset-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Use ${a.label} address`}
                    />
                  )}
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="soft" className="rounded-full">
                        {a.label}
                      </Badge>
                      {a.isDefault && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                          <Star className="size-3 fill-current" />
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {selected && (
                        <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Check className="size-3" />
                        </span>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="relative grid size-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label="Address options"
                          >
                            <MoreVertical className="size-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem onClick={() => openEdit(a)}>
                            <Pencil className="size-4" />
                            Edit
                          </DropdownMenuItem>
                          {!a.isDefault && (
                            <DropdownMenuItem onClick={() => handleDefault(a)}>
                              <Star className="size-4" />
                              Set as default
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(a)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="relative mt-2 font-medium">{a.fullName}</p>
                  <p className="relative text-sm text-muted-foreground">
                    {[a.line1, a.line2].filter(Boolean).join(', ')}
                  </p>
                  <p className="relative text-sm text-muted-foreground">
                    {a.city}, {a.state} {a.zip}
                  </p>
                  <p className="relative text-sm text-muted-foreground">{a.country}</p>
                  <p className="relative mt-1 text-sm text-muted-foreground">{a.phone}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AddressDialog open={dialogOpen} onOpenChange={setDialogOpen} initial={editing} />
    </div>
  );
}
