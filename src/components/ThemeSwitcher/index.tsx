import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface Styles {
  primary: string;
  secondary: string;
  text: string;
  textHover: string;
}

function changeTheme(dark: boolean) {
  const documentStyles = window.getComputedStyle(document.documentElement);
  const darkStyles: Styles = {
    primary: documentStyles.getPropertyValue("--primary-dark-background"),
    secondary: documentStyles.getPropertyValue("--secondary-dark-background"),
    text: documentStyles.getPropertyValue("--secondary-light-background"),
    textHover: documentStyles.getPropertyValue("--primary-light-background"),
  };

  const lightStyles: Styles = {
    primary: documentStyles.getPropertyValue("--primary-light-background"),
    secondary: documentStyles.getPropertyValue("--secondary-light-background"),
    text: documentStyles.getPropertyValue("--secondary-dark-background"),
    textHover: documentStyles.getPropertyValue("--primary-dark-background"),
  };
  const theme: Styles = dark ? darkStyles : lightStyles;
  document.documentElement.style.setProperty(
    "--primary-background",
    theme.primary
  );
  document.documentElement.style.setProperty(
    "--secondary-background",
    theme.secondary
  );
  document.documentElement.style.setProperty("--text-color", theme.text);
  document.documentElement.style.setProperty(
    "--text-color-hover",
    theme.textHover
  );
}
export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);
  function toggleTheme() {
    changeTheme(!darkMode);
    setDarkMode((prev) => !prev);
  }
  return (
    <div className="items-center ml-4 mt-1" onClick={toggleTheme}>
      {darkMode ? (
        <Icon icon="clarity:moon-line" width="24" height="24" />
      ) : (
        <Icon icon="carbon:sun" width="24" height="24" />
      )}
    </div>
  );
};
