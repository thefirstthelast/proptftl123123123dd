export interface StrapiImage {
  data: {
    id: number
    attributes: {
      formats: {
        thumbnail: {
          name: string
          hash: string
          ext: string
          mime: string
          path: any
          width: number
          height: number
          size: number
          sizeInBytes: number
          url: string
        }
        small?: {
          name: string
          hash: string
          ext: string
          mime: string
          path: any
          width: number
          height: number
          size: number
          sizeInBytes: number
          url: string
        }
        medium?: {
          name: string
          hash: string
          ext: string
          mime: string
          path: any
          width: number
          height: number
          size: number
          sizeInBytes: number
          url: string
        }
        large?: {
          name: string
          hash: string
          ext: string
          mime: string
          path: any
          width: number
          height: number
          size: number
          sizeInBytes: number
          url: string
        }
      }
      width?: number
      height?: number
      url: string
    }
  }
}

export interface StrapiMeta {
  id: number
  Title: string
  Description: string
  Keywords: string
  Open_Graph_Photo: StrapiImage
}

type TwitterCard =
  | "summary"
  | "summary_large_image"
  | "app"
  | "player"
  | null
  | undefined

export interface Meta {
  title: string
  description: string
  keywords: string

  ogImage: string
  ogImageUrl: string
  ogImageAlt: string
  ogTitle: string
  ogDescription: string

  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  twitterImageAlt: string
  twitterCard: TwitterCard
}

export interface Image {
  normal: string
  thumbnail: string
  medium: string
}

export type DirectionSlide = "next" | "prev"
