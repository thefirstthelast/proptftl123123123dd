import type { Meta, StrapiMeta } from "#shared"

export default function formattingMeta(data: StrapiMeta): Meta {
  const apiUrl = useRuntimeConfig().public.apiUrl

  const title = data?.Title || ""
  const description = data?.Description || ""
  const keywords = data?.Keywords || ""
  const image = apiUrl + (data?.Open_Graph_Photo?.data?.attributes?.url || "")

  return {
    title,
    description,
    keywords,

    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: title,
    ogImageUrl: image,

    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: title,
    twitterCard: "summary_large_image",
  }
}
