import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CForm,
  CFormGroup,
  CInput,
  CInputRadio,
  CLabel,
  CRow,
} from "@coreui/react";
import SelectCategory from "../../categories/SelectCategory";
import SelectMaterial from "../../materials/SelectMaterial";

/**
 * Initial values to AdForm
 */
export const initialValues = (params) => {
  return {
    id: params.get('id') || '',
    titleDescription: params.get('titleDescription') || '',
    subcategory: params.get('subcategory'),
    parentCategory: params.get('parentCategory'),
    materials: params.get('materials') ? params.get('materials').split(',') : [],
    recommended: params.get('recommended') && params.get('recommended') === 'true'
  }
};

const OfferFilters = ({params, categories, materials, handleFiltersChange}) => {
  const [collapse, setCollapse] = useState(false);
  const [fields, setFields] = useState(initialValues(params));
  const {id, titleDescription, materials: currentMaterials, recommended: currentRecommended} = fields;
  const [recommended, setRecommended] = useState(
    currentRecommended === null
      ? 'all'
      : currentRecommended
      ? 'recommended'
      : 'no recommended')

  const toggle = () => {
    setCollapse(!collapse);

    const map = {
      'all': null,
      'recommended': true,
      'no recommended': false
    }

    collapse && handleFiltersChange({...fields, ...{recommended: map[recommended]}});
  };

  const handleSelectSubcategory = (category, subcategory) => {
    setFields({...fields, ...{subcategory: subcategory.id, parentCategory: category.id}})
  };

  return (
    <React.Fragment>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <b>
                Filtros
              </b>
            </CCardHeader>
            <CCollapse show={collapse}>
              <CCardBody>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="9">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio custom id="inline-radio1"
                                     name="inline-radios"
                                     checked={recommended === 'all'}
                                     onChange={({target: {value}}) => (
                                       value && setRecommended('all')
                                     )}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Todos</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio custom id="inline-radio2"
                                     name="inline-radios"
                                     checked={recommended === 'recommended'}
                                     onChange={({target: {value}}) => (
                                       value && setRecommended('recommended')
                                     )}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Recomendados</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio custom id="inline-radio3"
                                     name="inline-radios"
                                     checked={recommended === 'no recommended'}
                                     onChange={({target: {value}}) => (
                                       value && setRecommended('no recommended')
                                     )}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio3">No recomendados</CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <SelectCategory
                      categories={categories}
                      onCategorySelect={handleSelectSubcategory}
                      defaultCategoryTitle={'Todas'}
                      defaultSubcategoryTitle={'Todas'}
                    >
                    </SelectCategory>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Id</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="number"
                        id="number-input"
                        name="text-input"
                        value={id}
                        onChange={(event) => setFields({...fields, ...{id: event.target.value}})}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Título o descripción</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="text-input"
                        name="text-input"
                        value={titleDescription}
                        onChange={(event) => setFields({...fields, ...{titleDescription: event.target.value}})}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="9">
                      <SelectMaterial
                        materials={materials}
                        onMaterialSelected={
                          (selectedMaterials) => {
                            setFields({...fields, ...{materials: selectedMaterials}})
                          }
                        }
                        preSelectedMaterials={currentMaterials}
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCollapse>
            <CCardFooter>
              <CButton
                color="secondary"
                onClick={toggle}
                className={'mb-1'}>
                {collapse ? "Filtrar" : "Cambiar filtros"}
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
}

export default OfferFilters;
