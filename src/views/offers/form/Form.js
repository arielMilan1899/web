import React, {useState} from 'react'
import {Prompt, useHistory} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody, CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CInvalidFeedback,
  CLabel,
  CRow,
  CTextarea,
} from "@coreui/react";
import {uploadImageWithCloudinary} from "../../../images/utils/CloudinaryService";
import SelectCategory from "../../categories/SelectCategory";
import ImageContainer, {DELETE_IMAGE} from "../../../images/ImageContainer";
import SelectMaterial from "../../materials/SelectMaterial";
import {useMutation} from "@apollo/react-hooks";

/**
 * Initial values to AdForm
 */
const initialValues = ({offer, updateMode, categoryId, subcategoryId}) => {
  const initial = {
    title: {es: '', en: ''},
    price: '',
    description: {es: '', en: ''},
    category: categoryId || 0,
    subcategory: subcategoryId || 0,
    images: [],
    materials: [],
    recommended: false
  };

  if (updateMode) {
    return {
      ...initial,
      ...offer,
      category: offer.subcategory.parentCategory.id,
      subcategory: offer.subcategory.id,
      price: offer.price ? offer.price : '',
      description: offer.description || initial.description,
      images: offer.images ? offer.images.map((image) => ({
        publicId: image.publicId,
        url: image.url
      })) : [],
      materials: offer.materials ? offer.materials.map((material) => (material.id)) : []
    }
  } else {
    return initial
  }
};

const OfferForm = (props) => {
  const {offerSave, updateMode, offer, categories, materials, categoryId, subcategoryId, errors} = props;
  const history = useHistory()
  const values = initialValues(props)
  const [fields, setFields] = useState(values);
  const {price, images, title, description, materials: currentMaterials, recommended} = fields;
  const [emptyTitle, setEmptyTitle] = useState(false)
  const [originalImages, setOriginalImages] = useState(images)
  const [unSavedImages, setUnSavedImages] = useState([])
  const [onSave, setOnSave] = useState(false)
  const [deletePoster] = useMutation(DELETE_IMAGE);

  const handleOnSave = () => {
    const {__typename: typename, ...description} = fields.description
    const {__typename: typename1, ...title} = fields.title

    if (!title.es || !title.en) {
      setEmptyTitle(true)
      return
    }

    setEmptyTitle(false)

    const toSend = {
      ...fields,
      category: undefined,
      price: price || undefined,
      description: description,
      title: title
    };

    offerSave(toSend);
    setOnSave(true)
  };

  const setImages = (photos) => {
    setFields(
      {
        ...fields, ...{
          images: images.concat(photos.map((photo) => ({
            url: photo.url,
            publicId: photo.public_id
          })))
        }
      }
    );
    setUnSavedImages(unSavedImages.concat(photos.map((photo) => ({
        url: photo.url,
        publicId: photo.public_id
      })))
    );
  };

  const onDeleteImage = (props) => {
    const publicId = props.variables ? props.variables.publicId : props.deleteImage.publicId
    setFields({...fields, ...{images: images.filter(item => item.publicId !== publicId)}})
    setOriginalImages(originalImages.filter(item => item.publicId !== publicId))
    setUnSavedImages(unSavedImages.filter(item => item.publicId !== publicId))
  }

  return (
    <React.Fragment>
      <Prompt
        message={() => {
          if (!onSave && unSavedImages.length > 0)
            unSavedImages.map((image) => deletePoster({variables: {publicId: image.publicId}}))
          return true
        }}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              {updateMode ? "Actualizar oferta" : "Crear oferta"}
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Recomendado</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup key='recommended'
                                variant="custom-checkbox" inline>
                      <CInputCheckbox custom
                                      id='recommended'
                                      name='recommended'
                                      value={recommended}
                                      checked={recommended}
                                      onChange={(event) => (
                                        setFields({...fields, ...{recommended: event.target.checked}}))}
                      />
                      <CLabel variant="custom-checkbox" htmlFor='recommended'/>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <SelectCategory
                    categories={categories}
                    onCategorySelect={
                      (category, subcategory) => {
                        setFields({...fields, ...{subcategory: subcategory.id || 0, category: category.id}})
                      }
                    }
                    preSelectedCategoryId={categoryId || (updateMode && offer.subcategory.parentCategory.id)}
                    preSelectedSubcategoryId={subcategoryId || (updateMode && offer.subcategory.id)}
                    errors={errors}
                    defaultCategoryTitle={'Seleccione una categoría'}
                    defaultSubcategoryTitle={'Seleccione una subcategoría'}
                  />
                </CFormGroup>
                {/*<CFormGroup row>*/}
                {/*  <CCol md="3">*/}
                {/*    <CLabel htmlFor="text-input">Precio</CLabel>*/}
                {/*  </CCol>*/}
                {/*  <CCol xs="12" md="9">*/}
                {/*    <CInput*/}
                {/*      type="number"*/}
                {/*      id="number-input"*/}
                {/*      name="text-input"*/}
                {/*      value={price}*/}
                {/*      onChange={(event) => setFields({...fields, ...{price: event.target.value}})}*/}
                {/*    />*/}
                {/*  </CCol>*/}
                {/*</CFormGroup>*/}
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
                      invalid={emptyTitle}
                    />
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder={'inglés'}
                      value={title.en}
                      onChange={(event) =>
                        setFields({...fields, ...{title: {...title, ...{en: event.target.value}}}})}
                      invalid={emptyTitle}
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
                <SelectMaterial
                  materials={materials}
                  onMaterialSelected={
                    (selectedMaterials) => {
                      setFields({...fields, ...{materials: selectedMaterials}})
                    }
                  }
                  preSelectedMaterials={currentMaterials}
                />
                <CFormGroup row>
                  <CCol>
                    <CButton color="primary" className="px-4"
                             onClick={() => uploadImageWithCloudinary(setImages)}>
                      Agregar imágenes
                    </CButton>
                    {images.length === 0
                      ? (<p>No se han agregado imágenes.</p>)
                      : <>
                        <ImageContainer images={originalImages}
                                        onDeleteImage={onDeleteImage}
                                        customDeleteMutation={onDeleteImage}/>
                        <ImageContainer images={unSavedImages}
                                        onDeleteImage={onDeleteImage}/>
                      </>
                    }
                  </CCol>
                </CFormGroup>
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

OfferForm.defaultProps = {
  offer: {},
  updateMode: false,
};


export default OfferForm;
