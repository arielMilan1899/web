import React from 'react'
import {CButton, CCard, CCardBody, CCardHeader, CCol, CHeaderNavLink, CRow} from '@coreui/react'
import DeleteConfirmation from "../../helpers/deleteConfirmation";
import ImageContainer from "../../../images/ImageContainer";
import {formatRoute} from "react-router-named-routes";
import {CATEGORY_DETAIL, OFFER_UPDATE, SUBCATEGORY_DETAIL} from "../../../routes";

const OfferDetails = (props) => {
  const {
    data,
    deleteOffer,
    activateOffer,
    deactivateOffer,
  } = props;

  const {
    offer: {
      id,
      title,
      description,
      materials,
      images,
      onSale,
      slug: {en: slug},
      subcategory: {
        slug: {en: subcategorySlug},
        title: subcategoryTitle,
        parentCategory: {
          slug: {en: categorySlug},
          title: categoryTitle
        }
      }
    }
  } = data
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <b>
              Oferta id: {id}
            </b>
            <div className="card-header-actions">
              <CButton color='secondary' to={formatRoute(OFFER_UPDATE, {
                category: categorySlug,
                subcategory: subcategorySlug.split('_')[1],
                offer: slug
              })}>Editar</CButton>
              {onSale ?
                <CButton color='secondary' onClick={() => deactivateOffer([id])}>Ocultar</CButton> :
                <CButton color='secondary' onClick={() => activateOffer([id])}>Mostrar</CButton>
              }
              <DeleteConfirmation mutation={deleteOffer}
                                  variables={{ids: [id]}}
                                  label={title.es}/>
            </div>
          </CCardHeader>
          <CCardBody>
            <p>
              Categoría:
              <CHeaderNavLink to={formatRoute(CATEGORY_DETAIL, {
                category: categorySlug
              })}>
                <b> {categoryTitle.es}</b>
              </CHeaderNavLink>
            </p>
            <p>
              Subcategoría:
              <CHeaderNavLink to={formatRoute(SUBCATEGORY_DETAIL, {
                category: categorySlug,
                subcategory: subcategorySlug.split('_')[1]
              })}>
                <b> {subcategoryTitle.es}</b>
              </CHeaderNavLink>
            </p>
            <p>
              Materiales: {
              materials.length > 0
                ? materials.map((material) => material.title.es).toString()
                : "No se han agregado materiales."
            }
            </p>
            <CCard>
              <CCardHeader>
                <b>
                  Título:
                </b>
              </CCardHeader>
              <CCardBody>
                <div>
                  <p>Es: {title.es}</p>
                  <p>En: {title.en}</p>
                </div>
              </CCardBody>
            </CCard>
            <CCard>
              <CCardHeader>
                <b>
                  Descripción:
                </b>
              </CCardHeader>
              <CCardBody>
                <div>
                  <p>Es: {description.es}</p>
                  <p>En: {description.en}</p>
                </div>
              </CCardBody>
            </CCard>
            <CCol>
              <ImageContainer images={images} onlyImage={true}/>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default OfferDetails;
