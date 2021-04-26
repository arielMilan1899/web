import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CHeaderNavLink,
  CPagination,
  CRow
} from '@coreui/react'
import DeleteConfirmation from "../../helpers/deleteConfirmation";
import Offers from "../../offers/list/List";
import {itemsPerPage} from "../../../config";
import ImageContainer from "../../../images/ImageContainer";
import {
  CATEGORY_UPDATE, OFFER_CREATE,
  SUBCATEGORY_CREATE,
  SUBCATEGORY_DETAIL,
  SUBCATEGORY_UPDATE
} from "../../../routes";
import {formatRoute} from "react-router-named-routes";

const CategoryDetails = ({data: {category}, deleteCategory,}) => {
  const [subcategoriesPage, setSubcategoriesPage] = useState(1)
  const [offersPage, setOffersPage] = useState(1)

  const subcategoriesPageChange = newPage => {
    subcategoriesPage !== newPage && setSubcategoriesPage(newPage)
  }

  const offersPageChange = newPage => {
    offersPage !== newPage && setOffersPage(newPage)
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            {
              category.parentCategory &&
              <p>
                Categoría: <b> {category.parentCategory.title.es}</b>
              </p>
            }
            {category.parentCategory ? "Subcategoría" : "Categoría"}: <b>{category.title.es}</b>

            <div className="card-header-actions">
              <CButton color="secondary" to={category.parentCategory
                ? formatRoute(SUBCATEGORY_UPDATE, {
                  category: category.slug.en.split('_')[0],
                  subcategory: category.slug.en.split('_')[1]
                })
                : formatRoute(CATEGORY_UPDATE, {category: category.slug.en})}>
                Editar {category.parentCategory && 'sub'}categoría
              </CButton>
              <DeleteConfirmation mutation={deleteCategory}
                                  variables={{ids: [category.id]}}
                                  label={category.title.es}/>
            </div>
          </CCardHeader>
          <CCardBody>
            {
              !category.parentCategory &&
              <ImageContainer images={[{url: category.posterUrl, publicId: category.posterPublicId}]}
                              onlyImage={true}/>
            }
            {
              category.parentCategory
                ? <CCard>
                  <CCardHeader>
                    <b>
                      Ofertas
                    </b>
                    <div className="card-header-actions">
                      <CButton color='success' to={formatRoute(OFFER_CREATE, {
                        category: category.slug.en.split('_')[0],
                        subcategory: category.slug.en.split('_')[1]
                      })}>
                        Crear oferta
                      </CButton>
                    </div>
                  </CCardHeader>
                  <Offers offers={category.offers} page={offersPage} pageChange={offersPageChange}/>
                </CCard>
                : <CCard>
                  <CCardHeader>
                    <b>
                      Subcategorías
                    </b>
                    <div className="card-header-actions">
                      <CButton color='success' to={formatRoute(SUBCATEGORY_CREATE, {category: category.slug.en})}>
                        Crear subcategoría
                      </CButton>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={category.subcategories}
                      fields={[
                        {key: 'Título', _classes: 'font-weight-bold'},
                        'Descripción', "Acciones"
                      ]}
                      hover
                      striped
                      itemsPerPage={itemsPerPage}
                      activePage={subcategoriesPage}
                      scopedSlots={{
                        'Título':
                          ({title, slug}) => (
                            <td>
                              <CHeaderNavLink color='primary'
                                              to={formatRoute(SUBCATEGORY_DETAIL, {
                                                category: category.slug.en,
                                                subcategory: slug.en.split('_')[1]
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
                          ({description}) => (
                            <td>
                              <p>{`${description.es || ''}`}</p>
                              <p>{`${description.en || ''}`}</p>
                            </td>
                          ),
                        'Acciones':
                          ({id, title, slug}) => (
                            <td>
                              <CButton color='secondary' to={formatRoute(SUBCATEGORY_UPDATE, {
                                category: category.slug.en,
                                subcategory: slug.en.split('_')[1]
                              })}>Editar</CButton>
                              <DeleteConfirmation mutation={deleteCategory} variables={{ids: [id]}} label={title.es}/>
                            </td>
                          )
                      }}
                    />
                    <CPagination
                      activePage={subcategoriesPage}
                      onActivePageChange={subcategoriesPageChange}
                      pages={Math.ceil(category.subcategories.length / itemsPerPage)}
                      doubleArrows={false}
                      arrows={Math.ceil(category.subcategories.length / itemsPerPage) > 1}
                      align="center"
                    />
                  </CCardBody>
                </CCard>
            }
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default CategoryDetails;
