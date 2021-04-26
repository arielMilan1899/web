import React from 'react'
import {
  CBadge,
  CCardBody,
  CDataTable,
  CPagination, CHeaderNavLink, CButton
} from '@coreui/react'
import {useMutation} from "@apollo/react-hooks";
import DeleteConfirmation from "../../helpers/deleteConfirmation";
import {
  ACTIVATE_OFFERS_MUTATION,
  ADD_RECOMMEND_OFFERS_MUTATION,
  DEACTIVATE_OFFERS_MUTATION,
  DELETE_OFFERS_MUTATION,
  DELETE_RECOMMEND_OFFERS_MUTATION
} from "../details/DetailsContainer";
import {itemsPerPage} from "../../../config";
import {formatRoute} from "react-router-named-routes";
import {OFFER_DETAIL, OFFER_UPDATE} from "../../../routes";

const Offers = ({offers, page, pageChange}) => {
  const [deleteOffer] = useMutation(DELETE_OFFERS_MUTATION);
  const [activateOffer] = useMutation(ACTIVATE_OFFERS_MUTATION,);
  const [deactivateOffer] = useMutation(DEACTIVATE_OFFERS_MUTATION,);
  const [addRecommend] = useMutation(ADD_RECOMMEND_OFFERS_MUTATION,);
  const [deleteRecommend] = useMutation(DELETE_RECOMMEND_OFFERS_MUTATION,);

  return (
    <CCardBody>
      <CDataTable
        items={offers.edges}
        fields={[
          {key: 'Título', _classes: 'font-weight-bold'},
          'Descripción', 'Categoría/Subcategoría', 'Materiales', 'En venta', 'Recomendado', 'Acciones'
        ]}
        hover
        striped
        itemsPerPage={itemsPerPage}
        activePage={page}
        scopedSlots={{
          'Título':
            ({node: {slug, title, subcategory: {slug: subcategorySlug, parentCategory: {slug: categorySlug}}}}) => (
              <td>
                <CHeaderNavLink color='primary' to={formatRoute(OFFER_DETAIL,
                  {
                    category: categorySlug.en,
                    subcategory: subcategorySlug.en.split('_')[1],
                    offer: slug.en
                  })}>
                  <div>
                    {`${title.es}`}
                  </div>
                  <div>
                    {`${title.en}`}
                  </div>
                </CHeaderNavLink>
              </td>
            ),
          'Descripción':
            ({node: {shortDescription}}) => (
              <td>
                <p>{`${shortDescription.es || ''}`}</p>
                <p>{`${shortDescription.en || ''}`}</p>
              </td>
            ),
          'Materiales':
            ({node: {materials}}) => (
              <td>
                <p>{materials.map((material) => material.title.es).toString()}</p>
                <p>{materials.map((material) => material.title.en).toString()}</p>
              </td>
            ),
          'Categoría/Subcategoría':
            ({node: {subcategory: {title, parentCategory: {title: parentTitle}}}}) => (
              <td>
                <p>{`${parentTitle.es}/${title.es}`}</p>
                <p>{`${parentTitle.en}/${title.en}`}</p>
              </td>
            ),
          'En venta':
            ({node: {onSale}}) => (
              <td>
                <CBadge color={onSale ? 'success' : 'danger'}>
                  {onSale ? 'si' : 'no'}
                </CBadge>
              </td>
            ),
          'Recomendado':
            ({node: {recommended}}) => (
              <td>
                <CBadge color={recommended ? 'success' : 'danger'}>
                  {recommended ? 'si' : 'no'}
                </CBadge>
              </td>
            ),
          'Acciones':
            ({
               node: {
                 id, slug, onSale, title, recommended,
                 subcategory: {slug: subcategorySlug, parentCategory: {slug: categorySlug}}
               }
             }) => (
              <td>
                <CButton color='secondary' to={formatRoute(OFFER_UPDATE,
                  {
                    category: categorySlug.en,
                    subcategory: subcategorySlug.en.split('_')[1],
                    offer: slug.en
                  })}>
                  Editar
                </CButton>
                {onSale
                  ? <CButton color='secondary'
                             onClick={() => deactivateOffer({variables: {ids: [id]}})}>
                    Ocultar
                  </CButton>
                  : <CButton color='secondary'
                             onClick={() => activateOffer({variables: {ids: [id]}})}>
                    Mostrar
                  </CButton>
                }
                {recommended
                  ? <CButton color='secondary'
                             onClick={() => deleteRecommend({variables: {ids: [id]}})}>
                    Quitar de recomendads
                  </CButton>
                  : <CButton color='secondary'
                             onClick={() => addRecommend({variables: {ids: [id]}})}>
                    Agregar a recomendados
                  </CButton>
                }
                <DeleteConfirmation mutation={deleteOffer} variables={{ids: [id]}} label={title.es}/>
              </td>
            )
        }}
      />
      <CPagination
        activePage={page}
        onActivePageChange={pageChange}
        pages={Math.ceil(offers.edges.length / itemsPerPage)}
        doubleArrows={false}
        arrows={Math.ceil(offers.edges.length / itemsPerPage) > 1}
        align="center"
      />
    </CCardBody>
  )
}

export default Offers
