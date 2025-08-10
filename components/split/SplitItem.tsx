import {
  Card,
  CardAction,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { SplitWithRelations } from "@/types/primsa";

export default function SplitItem({
  split,
}: {
  split: typeof SplitWithRelations;
}) {
  console.info("This is the split: ", split);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{split.name}</CardTitle>
          <CardAction>Edit</CardAction>
        </CardHeader>
        <CardContent className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <h4>Muscle Groups</h4>
            <ul>
              {split.muscleGroups.map((group: typeof split.muscleGroups) => (
                <li key={group.id}>{group.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Sessions</h4>
            <ul>
              {split.gymSessions.map((session: typeof split.gymSessions) => (
                <li key={session.id}>{session.name}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
