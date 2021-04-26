import React, {useState} from 'react'
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useHistory, useParams} from 'react-router-dom'
import gql from 'graphql-tag';
import CategoryForm from "../form/Form";
import {CATEGORIES_QUERY} from "../list/List";

/**
 * Mutation to create a category
 */
export const CREATE_CATEGORY_MUTATION = gql`
    mutation(
        $title: LanguageInput!
        $description: LanguageInput
        $order: Int!
        $parentCategory: ID!
        $posterUrl: String
        $posterPublicId: String
    ) {
        createCategory(
            input: {
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

const CategoryCreateContainer = () => {
  const params = useParams();
  const history = useHistory()
  const [errors, setErrors] = useState()
  const {loading, error, data} = useQuery(CATEGORIES_QUERY);

  const [createCategory] = useMutation(
    CREATE_CATEGORY_MUTATION,
    {
      onError(error) {
        setErrors({errors: [error]})
      },
      onCompleted({createCategory: {errors}}) {
        if (!errors) {
          history.goBack();
        } else {
          setErrors({errors});
        }
      },
    }
  );

  if (error)
    return <p>Oops, algo salió mal!</p>

  if (loading)
    return <p>Cargando...</p>

  return (
    <CategoryForm
      categorySave={category => createCategory({variables: category})}
      categories={data.categories}
      parentCategorySlug={params.category}
      errors={errors}
    />
  );
}

export default CategoryCreateContainer;
