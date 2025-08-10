"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MuscleGroup } from "@/app/generated/prisma";
import { Popover } from "@radix-ui/react-popover";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Plus } from "lucide-react";
import { Command, CommandInput, CommandItem, CommandList } from "../ui/command";

// TODO: 1. Pass muscle group data to component for muscle group selection
export function CreateSplitItem({
  muscleGroups,
}: {
  muscleGroups: MuscleGroup[];
}) {
  const [open, setOpen] = useState(false);
  const [m_groups, setMgroups] = useState<MuscleGroup[]>([]);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>+ Create Split</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create Split</DialogTitle>
            <DialogDescription>
              Give your split a name and add related muscle groups
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='split-name'>Split Name</Label>
              <Input
                id='split-name'
                name='split-name'
                defaultValue='Pedro Duarte'
              />
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <div className='flex flex-row gap-4'>
                <div className='flex flex-row wrap-anywhere border-solid rounded-md p-10'>
                  {m_groups.map((group) => (
                    <Badge
                      key={group.id}
                      className='m-2'
                      onClick={() => {
                        const newMGroups = m_groups.filter(
                          (mg) => mg.id !== group.id
                        );
                        setMgroups(newMGroups);
                      }}>
                      {group.name}
                    </Badge>
                  ))}
                </div>
                <PopoverTrigger asChild>
                  <Button
                    role='combobox'
                    aria-expanded={open}
                    className='max-w-md border-solid'>
                    <Badge>
                      <Plus />
                    </Badge>
                  </Button>
                </PopoverTrigger>
              </div>
              <PopoverContent className='pointer-events-auto'>
                <Command>
                  <CommandInput placeholder='Search muscle group' />
                  <CommandList>
                    {muscleGroups.map(
                      (group: MuscleGroup) =>
                        !m_groups.includes(group) && (
                          <CommandItem
                            key={group.id}
                            value={group.name}
                            onSelect={() => {
                              setMgroups([...m_groups, group]);
                            }}>
                            {group.name}
                          </CommandItem>
                        )
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' onSubmit={() => {}}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
