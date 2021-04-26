import React, {useState} from 'react'
import {Prompt, useHistory} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
  CTextarea,
} from "@coreui/react";
import SelectCategory from "../SelectCategory";
import ImageContainer, {DELETE_IMAGE} from "../../../images/ImageContainer";
import {uploadImageWithCloudinary} from "../../../images/utils/CloudinaryService";
import {useMutation} from "@apollo/react-hooks";

/**
 * Initial values to AdForm
 */
const initialValues = ({category, updateMode}, parentCategory) => {
  const initial = {
    title: {es: '', en: ''},
    description: {es: '', en: ''},
    parentCategory: parentCategory ? parentCategory.id : 0,
    order: 0,
  }

  if (updateMode) {
    return {
      ...initial,
      ...category,
      parentCategory: category.parentCategory ? category.parentCategory.id : 0,
      description: category.description || initial.description,
    }
  } else {
    return initial
  }
};

const CategoryForm = (props) => {
  const history = useHistory()
  const {
    categories,
    category,
    parentCategorySlug,
    updateMode,
    categorySave,
    errors
  } = props
  const parentCategory = categories.find((category) => category.slug.en === parentCategorySlug)
  const [fields, setFields] = useState(initialValues(props, parentCategory))
  const [emptyTitle, setEmptyTitle] = useState(false)
  const [poster, setPoster] = useState(
    {
      posterPublicId: category.posterPublicId,
      posterUrl: category.posterUrl
    })
  const [isOriginalPoster, setIsOriginalPoster] = useState(true)
  const [unSavedPoster, setUnSavedPoster] = useState(null)
  const [onSave, setOnSave] = useState(false)
  const [deletePoster] = useMutation(DELETE_IMAGE);

  /**
   * @description
   * Updating before send to parent.
   * @returns {*} No returns.
   */
  const handleOnSave = () => {
    const {__typename: typename, ...description} = fields.description
    const {__typename: typename1, ...title} = fields.title

    if (!title.es || !title.en) {
      setEmptyTitle(true)
      return
    }

    setEmptyTitle(false)

    const toSend = {...fields, ...poster, ...{description: description, title: title}};

    categorySave(toSend);
    setOnSave(true)
  };

  const {title, description, order} = fields

  const onUploadPoster = (photos) => {
    setPoster({posterUrl: photos[0].url, posterPublicId: photos[0].public_id});
    setUnSavedPoster(photos[0].public_id)
    setIsOriginalPoster(false)
  }

  const onDeletePoster = () => {
    setPoster({posterUrl: null, posterPublicId: null});
    setIsOriginalPoster(false)
  }

  return (
    <React.Fragment>
      <Prompt
        message={() => {
          if (!onSave && unSavedPoster)
            deletePoster({variables: {publicId: unSavedPoster}})
          return true
        }}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              {(updateMode ? "Actualizar" : "Crear") + ' ' + (parentCategory ? 'subcategoría' : 'categoría')}
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                {parentCategory &&
                <CFormGroup row>
                  <SelectCategory
                    categories={categories}
                    onCategorySelect={
                      (category) => {
                        setFields({...fields, ...{parentCategory: category.id}})
                      }
                    }
                    preSelectedCategoryId={parentCategory && parentCategory.id}
                    errors={errors}
                    onlyRealCategories={parentCategory}
                    onlyCategories={true}
                  />
                </CFormGroup>}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Orden</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="number"
                      id="number-input"
                      name="text-input"
                      value={order}
                      onChange={(event) => setFields({...fields, ...{order: event.target.value}})}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Título</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder={'español'}
                      value={title.es}
                      onChange={(event) =>
                        setFields({...fields, ...{title: {...title, ...{es: event.target.value}}}})}
                      invalid={emptyTitle || errors}
                    />
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder={'inglés'}
                      value={title.en}
                      onChange={(event) =>
                        setFields({...fields, ...{title: {...title, ...{en: event.target.value}}}})}
                      invalid={emptyTitle || errors}
                    />
                    <CInvalidFeedback>Ingrese un título válido</CInvalidFeedback>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Descripción</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder={'español'}
                      value={description.es}
                      onChange={(event) =>
                        setFields({...fields, ...{description: {...description, ...{es: event.target.value}}}})}
                    />
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder={'inglés'}
                      value={description.en}
                      onChange={(event) =>
                        setFields({...fields, ...{description: {...description, ...{en: event.target.value}}}})}
                    />
                  </CCol>
                </CFormGroup>
                {
                  !parentCategory &&
                  <CFormGroup row>
                    <CCol>
                      {
                        !poster.posterUrl
                          ? <CButton color="primary" className="px-4"
                                     onClick={() => uploadImageWithCloudinary(onUploadPoster)}>
                            Agregar poster
                          </CButton>
                          : <ImageContainer images={[{publicId: poster.posterPublicId, url: poster.posterUrl}]}
                                            onDeleteImage={onDeletePoster}
                                            customDeleteMutation={isOriginalPoster && onDeletePoster}
                          />
                      }
                    </CCol>
                  </CFormGroup>
                }
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton color="success" className="px-4"
                       onClick={handleOnSave}>{updateMode ? "Actualizar" : "Crear"}</CButton>
              <CButton color="danger" className="px-4"
                       onClick={history.goBack}>Cancelar</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
}

CategoryForm.defaultProps = {
  category: {},
  updateMode: false,
};


export default CategoryForm;
