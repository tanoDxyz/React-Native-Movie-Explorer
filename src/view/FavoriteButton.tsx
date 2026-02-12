import { HugeiconsIcon } from "@hugeicons/react-native";
import { HeartAddIcon, HeartCheckIcon } from "@hugeicons/core-free-icons";
import { TouchableOpacity } from "react-native";

type Props = {
  isFavorite: boolean;
  onToggle: () => void;
};

export function FavoriteButton({ isFavorite, onToggle }: Props) {
  return (
    <TouchableOpacity onPress={onToggle} hitSlop={10} style={{alignSelf:"center"}}>
      <HugeiconsIcon
        icon={isFavorite ? HeartCheckIcon : HeartAddIcon}
        size={22}
        color={isFavorite ? "#E50914" : "#999"}
      />
    </TouchableOpacity>
  );
}
