import { MouseEventHandler } from "react";
import styles from "./Header.module.scss";
import CurrentTemp from "./current-temp";
import { SearchForm } from "./search-form";
import { FavouritesBtn } from "./favorites-btn";
import { ToggleBtn } from "./toggle-button";

export const Header = ({
  toggleActive,
}: {
  toggleActive: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <header className={styles.header}>
      <CurrentTemp />
      <SearchForm />
      <div className={styles.toggle_button_group}>
        <FavouritesBtn toggleActive={toggleActive} />
        <ToggleBtn />
      </div>
    </header>
  );
};
