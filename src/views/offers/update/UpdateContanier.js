import React, {useState} from 'react'
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useHistory} from 'react-router-dom'
import gql from 'graphql-tag';
import {CATEGORIES_QUERY} from "../../categories/list/List";
import OfferForm from "../form/Form";
import {OFFER_QUERY} from "../details/DetailsContainer";
import {MATERIALS_QUERY} from "../../materials/list/List";

/**
 * Mutation to update an offer
 */
export const EDIT_OFFER_MUTATION = gql`
  mutation(
    $id: ID
    $title: LanguageInput!
    $description: LanguageInput
    $subcategory: ID
    $price: Float
    $images: [ImageInput]
    $materials: [ID]
    $recommended: Boolean
  ) {
    updateOffer(
      input: {
        id: $id
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

const OfferUpdateContainer = (props) => {
  const {category: categorySlug, subcategory: subcategorySlug, offer: offerSlug} = props.match.params;
  const history = useHistory()
  const [errors, setErrors] = useState()
  const {loading: loadingCategories, error: categoriesError, data: categoriesData} = useQuery(CATEGORIES_QUERY);
  const {loading: loadingMaterials, error: materialsError, data: materialsData} = useQuery(MATERIALS_QUERY);
  const offersSlugs = offerSlug.split('-')
  const offerId = offersSlugs[offersSlugs.length - 1]
  const {
    loading: loadingOffer,
    error: offerError,
    data: offerData
  } = useQuery(OFFER_QUERY, {variables: {id: offerId}});

  const [updateOffer] = useMutation(
    EDIT_OFFER_MUTATION,
    {
      onError(error) {
        setErrors({errors: [error]})
      },
      onCompleted({updateOffer: {errors}}) {
        if (!errors) {
          history.goBack();
        } else {
          setErrors({errors});
        }
      }
    }
  );

  if (categoriesError || materialsError || offerError)
    return <p>Oops, algo salio mal!</p>

  if (loadingCategories || loadingMaterials || loadingOffer)
    return <p>Cargando...</p>

  const {categories} = categoriesData
  const category = categories.find((item) => item.slug.en === categorySlug)
  const subcategory = category &&
    category.subcategories.find((item) => item.slug.en === `${categorySlug}_${subcategorySlug}`)

  return (
    <OfferForm
      updateMode={true}
      offer={offerData.offer}
      offerSave={offer => updateOffer({variables: offer})}
      categories={categoriesData.categories}
      materials={materialsData.materials}
      categoryId={category && category.id}
      subcategoryId={subcategory && subcategory.id}
      errors={errors}
    />
  );
}

export default OfferUpdateContainer;
