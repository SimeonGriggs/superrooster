import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'

import resolveProductionUrl from '../lib/resolveProductionUrl'

export default () => {
  return S.list()
    .id('__root__')
    .title('Content')
    .items([
      S.listItem()
        .title(`Menu Items`)
        .id(`menuItem`)
        .child(
          S.documentTypeList(`menuItem`)
            .title('Menu Items')
            .child((id) =>
              S.document()
                .schemaType(`menuItem`)
                .documentId(id)
                .views([
                  S.view.form(),
                  S.view
                    .component(Iframe)
                    .options({
                      url: (doc) => resolveProductionUrl(doc),
                    })
                    .title('Preview'),
                ])
            )
        ),
      S.documentTypeListItem('location').title('Location'),
      S.documentTypeListItem('page').title('Page'),
    ])
}
