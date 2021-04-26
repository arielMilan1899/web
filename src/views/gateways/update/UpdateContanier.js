import React, {useState} from 'react'
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useHistory} from 'react-router-dom'
import gql from 'graphql-tag';
import CategoryForm from "../form/Form";
import {CATEGORY_QUERY} from "../details/DetailsContainer";

/**
 * Mutation to update an category
 */
export const EDIT_CATEGORY_MUTATION = gql`
  mutation(
    $id: ID
    $title: LanguageInput!
    $description: LanguageInput
    $order: Int
    $parentCategory: ID!
    $posterUrl: String
    $posterPublicId: String
  ) {
    updateCategory(
      input: {
        id: $id
        title: $title
        description: $description
        order: $order
        parentCategory: $parentCategory
        posterUrl: $posterUrl
        posterPublicId: $posterPublicId
      }
    ) {
      category {
        id
      }
      errors {
        field
        messages
      }
      clientMutationId
    }
  }
`;

const CategoryUpdateContainer = (props) => {
  const {category, subcategory} = props.match.params;
  const slugEn = subcategory ? `${category}_${subcategory}` : category;
  const history = useHistory()
  const [errors, setErrors] = useState()
  const {loading, error, data} = useQuery(CATEGORY_QUERY, {variables: {slugEn}});

  const [updateCategory] = useMutation(
    EDIT_CATEGORY_MUTATION,
    {
      onError(error) {
        setErrors({errors: [error]})
      },
      onCompleted({updateCategory: {errors}}) {
        if (!errors) {
          history.goBack();
        } else {
          setErrors({errors});
        }
      },
    }
  );
  if (error)
    return <p>Oops, algo salio mal!</p>

  if (loading)
    return <p>Cargando...</p>

  return (
    <CategoryForm
      updateMode={true}
      category={data.category}
      categorySave={category => updateCategory({variables: category})}
      categories={subcategory ? [data.category.parentCategory] : []}
      parentCategorySlug={category}
      errors={errors}
    />
  );
}

export default CategoryUpdateContainer;
