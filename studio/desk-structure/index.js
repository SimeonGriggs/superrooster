import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'

import resolveProductionUrl from '../lib/resolveProductionUrl'

export default () => {
  return S.list()
    .id('__root__')
    .title('Content')
    .items([
      S.listItem()
        .title(`Pages`)
        .id(`page`)
        .child(
          S.documentTypeList(`page`)
            .title('Pages')
            .child((id) =>
              S.document()
                .schemaType(`page`)
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
      S.documentTypeListItem('menuItem').title('Menu Items'),
    ])
}
