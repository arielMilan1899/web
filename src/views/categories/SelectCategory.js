import React, {useState} from 'react';
import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormText,
  CLabel
} from "@coreui/react";

const SelectCategory = (props) => {
  const {
    categories,
    onCategorySelect,
    onlyCategories,
    preSelectedCategoryId,
    preSelectedSubcategoryId,
    defaultCategoryTitle,
    defaultSubcategoryTitle,
    onlyRealCategories,
    errors,
  } = props

  const defaultCategory = {id: null, title: {es: defaultCategoryTitle}}
  const defaultSubcategory = {id: null, title: {es: defaultSubcategoryTitle}}

  const initialCategory = categories.find(value => value.id === preSelectedCategoryId)
    || defaultCategory
  const initialSubcategory = (initialCategory.subcategories &&
    initialCategory.subcategories.find(value => value.id === preSelectedSubcategoryId))
    || defaultSubcategory

  const [currentCategory, setCategory] = useState(initialCategory);
  const [currentSubcategory, setSubcategory] = useState(initialSubcategory);

  const handleSelectCategory = (category) => {
    if (currentCategory !== category) {
      setCategory(category)
      setSubcategory(defaultCategory)
      onCategorySelect(category, defaultSubcategory)
    }
  }

  const handleSelectSubcategory = (subcategory) => {
    if (currentSubcategory !== subcategory) {
      setSubcategory(subcategory)
      onCategorySelect(currentCategory, subcategory)
    }
  }

  return (
    <React.Fragment>
      <CCol md="3">
        <CLabel>Categoría</CLabel>
      </CCol>
      <div>
        <CDropdown disabled={false} color="secondary">
          <CDropdownToggle caret color="secondary">
            {currentCategory.title.es}
          </CDropdownToggle>
          <CDropdownMenu>
            {!onlyRealCategories &&
            <CDropdownItem
              onClick={() => handleSelectCategory(defaultCategory)}>{defaultCategoryTitle}
            </CDropdownItem>}
            {
              categories.map((category) => (
                <CDropdownItem key={category.id}
                               onClick={() => handleSelectCategory(category)}>
                  {category.title.es}
                </CDropdownItem>)
              )
            }
          </CDropdownMenu>
        </CDropdown>
      </div>
      <div>
        {!onlyCategories && currentCategory.subcategories &&
        <CDropdown disabled={true} color="secondary">
          <CDropdownToggle caret color="secondary">
            {currentSubcategory.title.es}
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              onClick={() => handleSelectSubcategory(defaultSubcategory)}>{defaultSubcategoryTitle}
            </CDropdownItem>
            {
              currentCategory.subcategories.map((subcategory) =>
                (<CDropdownItem
                  key={subcategory.id}
                  onClick={() => handleSelectSubcategory(subcategory)}>
                  {subcategory.title.es}
                </CDropdownItem>))
            }
          </CDropdownMenu>
        </CDropdown>}
        {errors && errors.errors.find((error) => (error.field === 'subcategory')) &&
        <CFormText className="help-block" color="danger">Seleccione una categoría y subcategoría</CFormText>}
      </div>
    </React.Fragment>
  );
}

SelectCategory.defaultProps = {
  subcategory: {},
  updateMode: false,
};

export default SelectCategory;

