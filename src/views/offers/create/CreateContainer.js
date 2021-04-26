import React, {useState} from 'react'
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useHistory} from 'react-router-dom'
import gql from 'graphql-tag';
import {CATEGORIES_QUERY} from "../../categories/list/List";
import OfferForm from "../form/Form";
import {MATERIALS_QUERY} from "../../materials/list/List";

/**
 * Mutation to create an offer
 */
export const CREATE_OFFER_MUTATION = gql`
  mutation(
    $title: LanguageInput!
    $description: LanguageInput
    $subcategory: ID!
    $price: Float
    $images: [ImageInput]
    $materials: [ID]
    $recommended: Boolean
  ) {
    createOffer(
      input: {
        title: $title
        description: $description
        subcategory: $subcategory
        price: $price
        images: $images
        materials: $materials
        recommended: $recommended
      }
    ) {
      offer {
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

const OfferCreateContainer = (props) => {
  const {category: categorySlug, subcategory: subcategorySlug} = props.match.params;
  const history = useHistory()
  const [errors, setErrors] = useState()
  const {loading: loadingCategories, error: categoriesError, data: categoriesData} = useQuery(CATEGORIES_QUERY);
  const {loading: loadingMaterials, error: materialsError, data: materialsData} = useQuery(MATERIALS_QUERY);
  const [createOffer] = useMutation(
    CREATE_OFFER_MUTATION,
    {
      onError(error) {
        setErrors({errors: [error]})
      },
      onCompleted({createOffer: {errors, offer}}) {
        if (!errors) {
          history.goBack();
        } else {
          setErrors({errors});
        }
      },
    }
  );

  if (categoriesError || materialsError)
    return <p>Oops, algo salio mal!</p>

  if (loadingCategories || loadingMaterials)
    return <p>Cargando...</p>

  const {categories} = categoriesData
  const category = categories.find((item) => item.slug.en === categorySlug)
  const subcategory = category &&
    category.subcategories.find((item) => item.slug.en === `${categorySlug}_${subcategorySlug}`)

  return (<OfferForm
      offerSave={offer => createOffer({variables: offer})}
      categories={categories}
      materials={materialsData.materials}
      categoryId={category && category.id}
      subcategoryId={subcategory && subcategory.id}
      errors={errors}
    />
  );
}

export default OfferCreateContainer;
