import React from 'react'
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useHistory, useParams} from 'react-router-dom'
import gql from 'graphql-tag';
import CategoryDetails from "./Details";

export const CATEGORY_QUERY = gql`
    query Category($slugEn: String) {
        category(slugEn: $slugEn) {
            id
            posterPublicId
            posterUrl
            title{
                es
                en
            }
            description{
                es
                en
            }
            slug{
                es
                en
            }
            parentCategory{
                id
                posterPublicId
                posterUrl
                title{
                    es
                    en
                }
                slug {
                    en
                }
            }
            subcategories{
                id
                posterPublicId
                posterUrl
                title{
                    es
                    en
                }
                description{
                    es
                    en
                }
                slug {
                    en
                }
            }
            offers {
                edges {
                    node {
                        id
                        price
                        onSale
                        recommended
                        slug{
                          en
                        }
                        title{
                            es
                            en
                        }
                        shortDescription{
                            es
                            en
                        }
                        materials{
                            id
                            title{
                                es
                                en
                            }
                        }
                        subcategory {
                            id
                            posterPublicId
                            posterUrl
                            slug{
                              en
                            }
                            title{
                                es
                                en
                            }
                            parentCategory {
                                id
                                posterPublicId
                                posterUrl
                                slug{
                                  en
                                }
                                title{
                                    es
                                    en
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * Mutation to delete an category
 */
export const DELETE_CATEGORY_MUTATION = gql`
    mutation($ids: [ID]!) {
        deleteCategory(input: { ids: $ids }) {
            successIds
            errors {
                field
                messages
            }
        }
    }
`;

const CategoryDetailsContainer = () => {
  const {category, subcategory} = useParams();
  const slugEn = subcategory ? `${category}_${subcategory}` : category;
  const history = useHistory();
  const {loading, error, data} = useQuery(CATEGORY_QUERY, {variables: {slugEn}});
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION,
    {
      onCompleted({deleteCategory: {errors}}) {
        if (!errors && slugEn !== category) {
          history.goBack()
        }
      }
    });

  if (error)
    return <p>Oops, algo salio mal!</p>

  if (loading)
    return <p>Cargando...</p>

  return (
    <CategoryDetails
      data={{...data}}
      deleteCategory={deleteCategory}
    />
  );
}

export default CategoryDetailsContainer;
