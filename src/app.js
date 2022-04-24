import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_PIC_PAGE_LINK,
  LOGIN_PAGE_LINK,
  LINK_TO_HOME_PAGE,
  LINK_TO_CREATE_PIC_PAGE,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
  SUBMIT_CREATE_PIC_BTN,
  CANCELֹ_BTN,
  URL_CREATE_PIC_FIELD,
  ALT_CREATE_PIC_FIELD,
  CREDIT_CREATE_PIC_FIELD,
  URL_CREATE_PIC_ERROR,
  ALT_CREATE_PIC_ERROR,
  CREDIT_CREATE_PIC_ERROR,
  TABLE_ICON,
  SLIDER_ICON,
  CARDS_ICON,
  TABLE_BODY,
  PRICE_CREATE_PIC_FIELD,
  PRICE_CREATE_PIC_ERROR,
  URL_EDIT_PIC_FIELD,
  ALT_EDIT_PIC_FIELD,
  CREDIT_EDIT_PIC_FIELD,
  PRICE_EDIT_PIC_FIELD,
  SUBMIT_EDIT_PIC_BTN,
  URL_EDIT_PIC_ERROR,
  ALT_EDIT_PIC_ERROR,
  CREDIT_EDIT_PIC_ERROR,
  PRICE_EDIT_PIC_ERROR,
  CANCELֹ_EDIT_BTN,
  EDIT_IMAGE_DISPLAY,
  CARDS_CONTAINER,
} from "./services/domService.js";
import DISPLAY from "./models/displayModel.js";
import PAGES from "./models/pageModel.js";
import { onChangePage, onChangeDisplayMode } from "./routes/router.js";
import { setCounter } from "./services/picService.js";
import { renderSlider } from "./components/renderSlider.js";
import initialData from "./initialData/initialData.js";
import {
  onClearCreatePicFields,
  onValidateField,
  onCheckErrors,
  onCreateNewPic,
  mapToModel,
  onClearEditPicFields,
  onEditPic,
} from "./services/formService.js";
import renderTable from "./components/renderTable.js";
import renderCards from "./components/renderCards.js";

/********** יצירת משתנים גלובלים **********/
let counter = 0;
// let pictures = [];
let pictures = initialData().pictures;

/********** הלוגיקה **********/
// Slider
const onChangeSliderPic = controller => {
  counter = setCounter(pictures, counter, controller);
  renderSlider(pictures, counter);
};

// Form
const onChangeInputField = (element, btn) => {
  const { input, errorSpan, validation } = element;
  onValidateField(input, errorSpan, validation);
  onCheckErrors(btn);
};

const onCancelCreatePic = btn => {
  onClearCreatePicFields(btn);
  onChangePage(PAGES.HOME);
  renderSlider(pictures);
};

const onSubmitPic = () => {
  pictures = onCreateNewPic(pictures);
  onClearCreatePicFields(SUBMIT_CREATE_PIC_BTN);
  onChangePage(PAGES.HOME);
  handleDisplayMode(pictures, DISPLAY.TABLE);
};

const onCancelEditPic = btn => {
  onClearEditPicFields(btn);
  onChangePage(PAGES.HOME);
  renderSlider(pictures);
};

const onSubmitEditPic = () => {
  pictures = onEditPic(pictures);
  onClearEditPicFields(SUBMIT_EDIT_PIC_BTN);
  onChangePage(PAGES.HOME);
  handleDisplayMode(pictures, DISPLAY.TABLE);
};

// Display Mode
const handleDisplayMode = (arrayOfPic, display) => {
  onChangeDisplayMode(arrayOfPic, display);
  if (display === DISPLAY.TABLE) {
    TABLE_BODY.innerHTML = "";
    renderTable(arrayOfPic);
    arrayOfPic.forEach(item => {
      addOnDelete(item._id);
      addOnEditPic(item._id);
    });
  }
  if (display === DISPLAY.CARDS) {
    CARDS_CONTAINER.innerHTML = "";
    renderCards(arrayOfPic);
    arrayOfPic.forEach(item => {
      addOnLikePic(item._id);
    });
  }
};

// Delete Picture
const handleDeletePic = id => {
  pictures = pictures.filter(pic => pic._id !== id);
  handleDisplayMode(pictures, DISPLAY.TABLE);
};

const handleEditPic = (page, array, id) => {
  onChangePage(page);
  mapToModel(array, id);
};

const handleLikePic = id => {
  console.log("you liked pic num: " + id);
};

/********** האזנה לאירועים ***********/
// ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
CREATE_PIC_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.CREATE_PIC)
);
LOGIN_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.LOGIN));

// לינקים לדפים
LINK_TO_CREATE_PIC_PAGE.addEventListener("click", () =>
  onChangePage(PAGES.CREATE_PIC)
);
LINK_TO_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

// מצגת תמונות
SLIDER_PREV_BTN.addEventListener("click", () => onChangeSliderPic("prev"));
SLIDER_NEXT_BTN.addEventListener("click", () => onChangeSliderPic("next"));

// וולידציות על שדות של טפסים
// יצירת תמונה
URL_CREATE_PIC_FIELD.addEventListener("input", e =>
  onChangeInputField(
    {
      input: e.target,
      errorSpan: URL_CREATE_PIC_ERROR,
      validation: {
        min: 10,
        max: 256,
        lowerCase: true,
        regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/g,
      },
    },
    SUBMIT_CREATE_PIC_BTN
  )
);

ALT_CREATE_PIC_FIELD.addEventListener("input", e =>
  onChangeInputField(
    {
      input: e.target,
      errorSpan: ALT_CREATE_PIC_ERROR,
      validation: { min: 2 },
    },
    SUBMIT_CREATE_PIC_BTN
  )
);

CREDIT_CREATE_PIC_FIELD.addEventListener("input", e =>
  onChangeInputField(
    {
      input: e.target,
      errorSpan: CREDIT_CREATE_PIC_ERROR,
      validation: { min: 2 },
    },
    SUBMIT_CREATE_PIC_BTN
  )
);

PRICE_CREATE_PIC_FIELD.addEventListener("input", e =>
  onChangeInputField(
    {
      input: e.target,
      errorSpan: PRICE_CREATE_PIC_ERROR,
      validation: { min: 1 },
    },
    SUBMIT_CREATE_PIC_BTN
  )
);

SUBMIT_CREATE_PIC_BTN.addEventListener("click", onSubmitPic);
CANCELֹ_BTN.addEventListener("click", () =>
  onCancelCreatePic(SUBMIT_CREATE_PIC_BTN)
);

const handleUrlEditChange = e => {
  onChangeInputField(
    {
      input: e.target,
      errorSpan: URL_EDIT_PIC_ERROR,
      validation: {
        min: 10,
        max: 256,
        lowerCase: true,
        regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/g,
      },
    },
    SUBMIT_EDIT_PIC_BTN
  );
  EDIT_IMAGE_DISPLAY.src = e.target.value;
};

// עריכת תמונה
URL_EDIT_PIC_FIELD.addEventListener("input", e => handleUrlEditChange(e));

ALT_EDIT_PIC_FIELD.addEventListener("input", e =>
  onChangeInputField(
    {
      input: e.target,
      errorSpan: ALT_EDIT_PIC_ERROR,
      validation: { min: 2 },
    },
    SUBMIT_EDIT_PIC_BTN
  )
);

CREDIT_EDIT_PIC_FIELD.addEventListener("input", e =>
  onChangeInputField(
    {
      input: e.target,
      errorSpan: CREDIT_EDIT_PIC_ERROR,
      validation: { min: 2 },
    },
    SUBMIT_EDIT_PIC_BTN
  )
);

PRICE_EDIT_PIC_FIELD.addEventListener("input", e =>
  onChangeInputField(
    {
      input: e.target,
      errorSpan: PRICE_EDIT_PIC_ERROR,
      validation: { min: 1 },
    },
    SUBMIT_EDIT_PIC_BTN
  )
);

// עריכת תמונה חדשה
SUBMIT_EDIT_PIC_BTN.addEventListener("click", onSubmitEditPic);
CANCELֹ_EDIT_BTN.addEventListener("click", () =>
  onCancelEditPic(SUBMIT_EDIT_PIC_BTN)
);

// בקרי תצוגה
TABLE_ICON.addEventListener("click", () =>
  handleDisplayMode(pictures, DISPLAY.TABLE)
);
SLIDER_ICON.addEventListener("click", () =>
  handleDisplayMode(pictures, DISPLAY.SLIDER)
);
CARDS_ICON.addEventListener("click", () =>
  handleDisplayMode(pictures, DISPLAY.CARDS)
);

// הוספת מאזין למחיקת תמונה
const addOnDelete = id => {
  const root = document.getElementById("delete" + id);
  root.addEventListener("click", () => handleDeletePic(id));
};

// הוספת מאזין לעריכת תמונה
const addOnEditPic = id => {
  const root = document.getElementById(`edit${id}`);
  root.addEventListener("click", () =>
    handleEditPic(PAGES.EDIT_PIC, pictures, id)
  );
};

// הוספת מאזין לעריכת תמונה
const addOnLikePic = id => {
  const root = document.getElementById(`like${id}`);
  root.addEventListener("click", () => handleLikePic(id));
};

/********** אתחול התצוגה הראשונית **********/
onChangePage(PAGES.HOME);
onChangeDisplayMode(pictures, DISPLAY.SLIDER);
onChangeSliderPic();