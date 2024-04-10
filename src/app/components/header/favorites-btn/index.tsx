import { MouseEventHandler } from "react";
import classes from "./FavouritesBtn.module.scss";
import { StarButton } from "@/assets/svgIcons/StarButton";

export const FavouritesBtn = ({
  toggleActive,
}: {
  toggleActive: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button className={classes.btn_reset} onClick={toggleActive}>
      <StarButton />
    </button>
  );
};
