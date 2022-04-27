import DISPLAY from "../models/displayModel.js";
import PAGES from "../models/pageModel.js";
import {
  HOME_PAGE,
  ABOUT_PAGE,
  CREATE_PIC_PAGE,
  LOGIN_PAGE,
  ERROR_PAGE,
  NO_DATA_CONTAINER,
  DATA_CONTAINER,
  TABLE_DISPLAY_MODE,
  SLIDER_DISPLAY_MODE,
  CARDS_DISPLAY_MODE,
  EDIT_PIC_PAGE,
  SEARCH_BAR_CONTAINER,
} from "../services/domService.js";

export const onChangePage = page => {
  HOME_PAGE.className = "d-none";
  ABOUT_PAGE.className = "d-none";
  CREATE_PIC_PAGE.className = "d-none";
  EDIT_PIC_PAGE.className = "d-none";
  LOGIN_PAGE.className = "d-none";
  ERROR_PAGE.className = "d-none";

  if (page === PAGES.HOME) return (HOME_PAGE.className = "d-block");
  if (page === PAGES.ABOUT) return (ABOUT_PAGE.className = "d-block");
  if (page === PAGES.CREATE_PIC) return (CREATE_PIC_PAGE.className = "d-block");
  if (page === PAGES.LOGIN) return (LOGIN_PAGE.className = "d-block");
  if (page === PAGES.EDIT_PIC) return (EDIT_PIC_PAGE.className = "d-block");

  ERROR_PAGE.className = "d-block";
};

// Display Modes
export const onChangeDisplayMode = (pictures, display) => {
  NO_DATA_CONTAINER.className = "d-none";
  DATA_CONTAINER.className = "d-none";
  TABLE_DISPLAY_MODE.className = "d-none";
  SLIDER_DISPLAY_MODE.className = "d-none";
  CARDS_DISPLAY_MODE.className = "d-none";
  SEARCH_BAR_CONTAINER.className = "d-none";

  if (!pictures.length) {
    NO_DATA_CONTAINER.className = "d-block";
    return;
  }
  DATA_CONTAINER.className = "d-block";
  if (display === DISPLAY.SLIDER) {
    SLIDER_DISPLAY_MODE.className = "d-block";
    return;
  }
  if (display === DISPLAY.TABLE) {
    SEARCH_BAR_CONTAINER.className = "d-block";
    TABLE_DISPLAY_MODE.className = "d-block";
    return;
  }
  if (display === DISPLAY.CARDS) {
    SEARCH_BAR_CONTAINER.className = "d-block";
    CARDS_DISPLAY_MODE.className = "d-block";
    return;
  }
};

export const handleNoPictures = () => {
  TABLE_DISPLAY_MODE.className = "d-none";
  CARDS_DISPLAY_MODE.className = "d-none";
  SEARCH_BAR_CONTAINER.className = "d-block";
  NO_DATA_CONTAINER.className = "d-block";
};
