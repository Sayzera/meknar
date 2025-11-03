import categories from './categories'
import productFeatures from './productFeatures'
import products from './products'
import settings from './settings'
import homePage from './homePage'
import services from './services'
import sss from './sss'
import about from './about'
import galleri from './galleri'
import contact from './contact'

import settingsLocation from './objects/project/settingsLocation'
import {
  bannerSlogan,
  hala_sorulariniz_mi_var,
  hizmetlerimiz,
  home_paletlerimiz,
  sikca_sorulan_sorular,
} from './objects/project/homePageObjects'
import {about_description, about_video} from './objects/project/aboutPageObject'
import {productRating} from './objects/project/productPageObject'
import {
  contact_geo_location,
  contact_adress,
  contact_phone,
  contact_mail,
  contact_work_hours,
} from './objects/project/contactPageObject'

export const schemaTypes = [
  settings,
  categories,
  products,
  productFeatures,
  homePage,
  services,
  sss,
  about,
  galleri,
  contact,

  // Objects
  settingsLocation,
  bannerSlogan,
  hizmetlerimiz,
  sikca_sorulan_sorular,
  hala_sorulariniz_mi_var,
  home_paletlerimiz,
  about_description,
  about_video,
  contact_geo_location,
  contact_adress,
  contact_phone,
  contact_mail,
  contact_work_hours,
  productRating,
]

