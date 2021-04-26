import React from 'react'
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CHeader,
  CHeaderNav,
  CLink,
} from '@coreui/react'
import {useLocation} from 'react-router-dom';
import {
  TheHeaderDropdown,
} from './index'
import {CATEGORIES, CATEGORY_DETAIL, OFFER_DETAIL, OFFERS_CREATE, SUBCATEGORY_DETAIL} from "../routes";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {formatRoute} from "react-router-named-routes";
import {OFFER_QUERY} from "../views/offers/details/DetailsContainer";

const CATEGORY_QUERY = gql`
    query Category($slugEn: String) {
        category(slugEn: $slugEn) {
            title{
                es
            }
            slug{
                en
            }
            parentCategory{
                title{
                    es
                }
                slug {
                    en
                }
            }
            subcategories{
                title{
                    es
                }
                slug {
                    en
                }
            }
        }
    }
`;


const map = {
  '/categories': 'Categorías',
  '/offers': 'Ofertas',
  '/materials': 'Materiales',
  '/messages': 'Mensajes',
  '/contacts': 'Contactos',
  '/manufacturers': 'Fabricantes',
}


const TheHeader = () => {

  const {pathname} = useLocation();
  const slugs = pathname.split('/');
  let slugEn = slugs[slugs.length - 1];
  let id;
  let useCategory = false;

  if (slugs.length === 4) {
    useCategory = true
    slugEn = `${slugs[2]}_${slugs[3]}`
  } else if (slugs.length === 5) {
    useCategory = false
    const slugsEn = slugEn.split('-');
    id = slugsEn[slugsEn.length - 1]
  } else {
    useCategory = true
  }
  const query = useCategory ? CATEGORY_QUERY : OFFER_QUERY
  const variables = useCategory ? {slugEn} : {id}

  const {data, loading, error} = useQuery(query, {variables});

  if (loading)
    return <></>;

  let offer;
  let category;
  let subcategory;

  if (!error) {
    if (useCategory) {
      const categoryData = data.category
      if (categoryData.parentCategory) {
        const subcategorySlugs = categoryData.slug.en.split('_')
        subcategory = {
          label: categoryData.title.es,
          url: formatRoute(SUBCATEGORY_DETAIL, {
            category: subcategorySlugs[0],
            subcategory: subcategorySlugs[1]
          })
        }
        category = {
          label: categoryData.parentCategory.title.es,
          url: formatRoute(CATEGORY_DETAIL, {
            category: subcategorySlugs[0],
          })
        }
      } else {
        category = {
          label: categoryData.title.es,
          url: formatRoute(CATEGORY_DETAIL, {
            category: categoryData.slug.en,
          })
        }
      }
    } else {
      const offerData = data.offer
      offer = {
        label: offerData.title.es,
        url: formatRoute(OFFER_DETAIL, {
          category: offerData.subcategory.slug.en.split('_')[0],
          subcategory: offerData.subcategory.slug.en.split('_')[1]
        })
      }
      subcategory = {
        label: offerData.subcategory.title.es,
        url: formatRoute(SUBCATEGORY_DETAIL, {
          category: offerData.subcategory.slug.en.split('_')[0],
          subcategory: offerData.subcategory.slug.en.split('_')[1]
        })
      }
      category = {
        label: offerData.subcategory.parentCategory.title.es,
        url: formatRoute(CATEGORY_DETAIL, {
          category: offerData.subcategory.slug.en.split('_')[0],
        })
      }
    }
  }

  const breadcrumbs = [
    {label: 'Inicio', url: '/'}
  ];

  if (slugs.length === 2 || slugs[1] === 'offers') {
    const url = `/${slugs[1]}`
    breadcrumbs.push({
      label: map[url],
      url: url,
    });
    if (slugs[2] === 'create') {
      breadcrumbs.push({
        label: 'Crear oferta',
        url: OFFERS_CREATE
      })
    }
  } else {
    breadcrumbs.push({
      label: 'Categorías',
      url: CATEGORIES
    })

    if (category) {
      breadcrumbs.push(category)
    }
    if (subcategory) {
      breadcrumbs.push(subcategory)
    }
    if (offer) {
      breadcrumbs.push(offer)
    }
  }


  return <CHeader withSubheader>
    <CHeaderNav className="d-md-down-none mr-auto">
      {(
        <CBreadcrumb style={{marginBottom: 0, borderBottom: 0}}>
          {breadcrumbs.map(({label, url}, inx) =>
            inx === breadcrumbs.length - 1
              ? <CBreadcrumbItem key={inx} active>{label}</CBreadcrumbItem>
              : (
                <CBreadcrumbItem key={inx}>
                  <CLink to={url}>{label}</CLink>
                </CBreadcrumbItem>
              )
          )}
        </CBreadcrumb>
      )}
    </CHeaderNav>

    <CHeaderNav className="px-3">
      <TheHeaderDropdown/>
    </CHeaderNav>
  </CHeader>
}

export default TheHeader
