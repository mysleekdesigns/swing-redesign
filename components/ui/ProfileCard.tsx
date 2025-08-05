import { User } from "@/lib/types";
import { isCouple } from "@/lib/types";
import { UserCard } from "./UserCard";
import { CoupleCard } from "./CoupleCard";

interface ProfileCardProps extends User {
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export function ProfileCard(props: ProfileCardProps) {
  if (isCouple(props)) {
    return <CoupleCard {...props} />;
  }
  
  // For singles, we need to ensure isCouple is explicitly false for UserCard
  const singleProps = {
    ...props,
    isCouple: false as const,
    relationshipType: 'single' as const,
    lookingFor: props.lookingFor || 'both' as const,
  };
  
  return <UserCard {...singleProps} />;
}